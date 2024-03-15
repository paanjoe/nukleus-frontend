"use client";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import UserRoleCheckBoxComponent from "./UserRoleCheckBoxComponent";
import axios from "axios";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const UserRoleComponent = ({ jwt }) => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(undefined);
  const apiBaseUrl =
    process.env.API_BASE_URL || "https://nukleus-backend.onrender.com/api";

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${apiBaseUrl}/entityuser`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const userResponse = await response.json();
      setUserData(userResponse.data);
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCheckboxChange = async (userId, roleId) => {
    setUserData((prevUsers) =>
      prevUsers.map((user) =>
        user.Id === userId
          ? {
              ...user,
              entity_role: user.entity_role.map((role) =>
                role.Id === roleId
                  ? { ...role, IsActive: !role.IsActive }
                  : role
              ),
            }
          : user
      )
    );

    const role = userData
      .find((user) => user.Id === userId)
      ?.entity_role.find((role) => role.Id === roleId);

    if (role) {
      await updateUserRoles(userId, roleId, !role.IsActive);
      await fetchData(); // Fetch data again after updating roles
    }
  };

  const updateUserRoles = async (userId, roleId, isActive) => {
    try {
      // Send PUT request to update the IsActive property of the role
      await axios.put(
        `${apiBaseUrl}/entityrole/${userId}`,
        {
          Id: roleId,
          IsActive: isActive,
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      console.log("User roles updated successfully");
    } catch (error) {
      console.error("Error updating user roles:", error);
    }
  };

  return (
    <>
      {loading === true ? (
        <Spinner />
      ) : (
        <>
          <div className="flex-1 w-full flex flex-col gap-20 items-center">
            <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3">
              <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                      <table className="min-w-full text-left text-sm font-light">
                        <thead className="border-b font-medium dark:border-neutral-500">
                          <tr>
                            <th scope="col" className="px-6 py-4">
                              #UUID
                            </th>
                            <th scope="col" className="px-6 py-4">
                              Email
                            </th>
                            <th scope="col" className="px-6 py-4">
                              Roles (CRUD)
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {userData.map((user) => (
                            <tr
                              key={user.Id}
                              className="border-b dark:border-neutral-500"
                            >
                              <>
                                <td className="whitespace-nowrap px-6 py-4 font-medium">
                                  {user.Id}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 font-medium">
                                  {user.Email}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 font-medium">
                                  {user.entity_role.map((role) => (
                                    <div key={role.Id}>
                                      <UserRoleCheckBoxComponent
                                        label={role.Role}
                                        isActive={role.IsActive}
                                        onChange={() =>
                                          handleCheckboxChange(user.Id, role.Id)
                                        }
                                      />{" "}
                                      <br />
                                    </div>
                                  ))}
                                </td>
                              </>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <>
              <p className="mt-12 text-2xl font-medium text-gray-900 dark:text-yellow-400">
                Here is your JSON Data from Database:
                <br />
                <br />
              </p>
              <div className="flex items-center gap-4">
                <span className="block p-6 bg-white border border-gray-200 rounded-lg shadow  dark:bg-gray-800 dark:border-gray-700">
                  <pre className="font-normal text-yellow-400 dark:text-green-400">
                    {JSON.stringify(userData, null, 2)}
                  </pre>
                </span>

                <p className="py-2 px-4 rounded-md no-underline"></p>
              </div>
            </>
          </div>
        </>
      )}
    </>
  );
};

export default UserRoleComponent;
