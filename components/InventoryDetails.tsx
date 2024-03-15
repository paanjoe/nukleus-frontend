// components/InventoryDetails.tsx
"use client";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Link from "next/link";
import Spinner from "./Spinner";

const InventoryDetails = ({ Id, jwt }) => {
  const [loading, setLoading] = useState(true);
  const [inventoryData, setInventoryData] = useState(undefined);
  // State to manage confirmation dialog visibility
  const [showConfirmation, setShowConfirmation] = useState(false);
  // State to store the ID of the inventory to be deleted
  const [inventoryToDelete, setInventoryToDelete] = useState("");
  const router = useRouter(); // Access the router
  const apiBaseUrl =
    process.env.API_BASE_URL || "https://nukleus-backend.onrender.com/api";

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${apiBaseUrl}/inventory/${Id}`, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      // Handle response data
      const data = await response.json();
      setInventoryData(data);
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (Id) {
      fetchData();
    }
  }, [Id]);

  // Function to handle deletion confirmation
  const confirmDelete = async () => {
    try {
      const response = await fetch(
        `${apiBaseUrl}/inventory/delete-inventory/${inventoryToDelete}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${jwt}` },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete inventory");
      }

      setShowConfirmation(false);
      //   return redirect("/inventory");
      router.push("/inventory");
    } catch (error) {
      console.error("Error deleting inventory:", error);
      // Handle error
    }
  };

  // Function to handle opening confirmation dialog
  const handleDeleteConfirmation = (productId) => {
    // Set the ID of the inventory to be deleted
    setInventoryToDelete(productId);
    // Show the confirmation dialog
    setShowConfirmation(true);
  };

  return (
    <>
      {loading === true ? (
        <div className="flex items-center justify-center h-96">
          <Spinner />
        </div>
      ) : (
        <div className="bg-transparent">
          <Link
            type="button"
            href={`/inventory`}
            className="px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <FontAwesomeIcon icon={faArrowLeft} /> &nbsp; Go Back
          </Link>
          <div className="pt-6">
            <nav aria-label="Breadcrumb">
              <ol
                role="list"
                className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
              >
                <li>
                  <div className="flex items-center">
                    <Link
                      href="/inventory"
                      className="mr-2 text-sm font-medium text-white"
                    >
                      Inventory
                    </Link>
                    <svg
                      width="16"
                      height="20"
                      viewBox="0 0 16 20"
                      fill="currentColor"
                      aria-hidden="true"
                      className="h-5 w-4 text-white"
                    >
                      <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                    </svg>
                  </div>
                </li>
                <li>
                  <div className="flex items-center">
                    <Link
                      href="/inventory"
                      className="mr-2 text-sm font-medium text-white"
                    >
                      {inventoryData?.product?.product_category?.CategoryName}
                    </Link>
                    <svg
                      width="16"
                      height="20"
                      viewBox="0 0 16 20"
                      fill="currentColor"
                      aria-hidden="true"
                      className="h-5 w-4 text-white"
                    >
                      <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                    </svg>
                  </div>
                </li>

                <li className="text-sm">
                  <a
                    href={`/inventory/${inventoryData?.Id}`}
                    aria-current="page"
                    className="font-medium text-white hover:text-white"
                  >
                    {inventoryData?.product?.ProductName}
                  </a>
                </li>
              </ol>
            </nav>

            <div className="mx-auto mt-6 w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden rounded-lg">
                <img
                  src={inventoryData?.product?.product_media[0]?.MediaUrl}
                  width={inventoryData?.product?.product_media[0]?.Width}
                  height={inventoryData?.product?.product_media[0]?.Height}
                  alt="Product image"
                  className="w-full"
                  // style={{ aspectRatio: "16 / 9" }} // Adjust the aspect ratio as needed
                />
              </div>
            </div>
            {/* mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16 */}
            <div className=" mx-auto max-w-2xl px-4 pb-16 pt-10">
              {/* lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8 */}
              <div className="">
                <h1 className="text-2xl font-bold tracking-tight text-yellow-200 sm:text-3xl">
                  Price: &nbsp; {inventoryData?.Currency}
                  {inventoryData?.Price}
                </h1>
                <h1 className="text-xl font-bold tracking-tight text-orange-400 sm:text-xl">
                  Quantity Available: &nbsp; {inventoryData?.QuantityAvailable}
                </h1>

                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-4xl">
                  {inventoryData?.product?.ProductName}
                </h1>
                <h3 className="sr-only">Description</h3>
                <br />
                <br />
                <div className="space-y-6">
                  <p className="text-base text-white">
                    {inventoryData?.product?.ProductDescription}
                  </p>
                </div>
                <div className="space-y-6">
                  <br />
                  <p className="text-base text-white">
                    Inventory Owner:{" "}
                    {inventoryData?.entityUserId ? (
                      <>{inventoryData?.entityUserId}</>
                    ) : (
                      <>No Owner found.</>
                    )}
                  </p>
                </div>
              </div>
              <br />
              <div className="inline-flex rounded-md shadow-sm" role="group">
                <Link
                  type="button"
                  href={`/inventory/edit/${inventoryData?.Id}`}
                  className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-blue-800 dark:border-blue-700 dark:text-white dark:hover:text-white dark:hover:bg-blue-700 dark:focus:ring-blue-500 dark:focus:text-white"
                >
                  Edit Inventory
                </Link>

                <button
                  type="button"
                  onClick={() => handleDeleteConfirmation(inventoryData.Id)}
                  className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-red-800 dark:border-red-700 dark:text-white dark:hover:text-white dark:hover:bg-red-700 dark:focus:ring-blue-500 dark:focus:text-white"
                >
                  Delete Inventory
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showConfirmation && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* Background overlay */}
            <div
              className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
              aria-hidden="true"
            ></div>
            {/* Modal container */}
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                {/* Modal content */}
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    {/* Icon */}
                    <svg
                      className="h-6 w-6 text-red-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900"
                      id="modal-title"
                    >
                      Delete Inventory
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to delete this inventory item?
                        This action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={confirmDelete}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Delete
                </button>
                <button
                  onClick={() => setShowConfirmation(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {loading === true ? (
        <></>
      ) : (
        <>
          <p className="text-2xl font-medium text-gray-900 dark:text-yellow-400">
            Here is your JSON Data from Database:
            <br />
            <br />
          </p>
          <div className="flex items-center gap-4">
            <span className="block p-6 bg-white border border-gray-200 rounded-lg shadow  dark:bg-gray-800 dark:border-gray-700">
              <pre className="font-normal text-yellow-400 dark:text-green-400">
                {JSON.stringify(inventoryData, null, 2)}
              </pre>
            </span>

            <p className="py-2 px-4 rounded-md no-underline"></p>
          </div>
        </>
      )}
    </>
  );
};

export default InventoryDetails;
