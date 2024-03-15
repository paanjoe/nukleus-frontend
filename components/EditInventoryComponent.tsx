// components/InventoryDetails.tsx
"use client";
import {
  faArrowLeft,
  faExclamation,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Link from "next/link";
import Spinner from "./Spinner";

const EditInventoryComponent = ({ Id, jwt }) => {
  const [loading, setLoading] = useState(true);
  const [inventoryData, setInventoryData] = useState(undefined);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [failureMessage, setFailureMessage] = useState("");
  const router = useRouter();
  const apiBaseUrl =
    process.env.API_BASE_URL || "https://nukleus-backend.onrender.com/api";

  const [formData, setFormData] = useState({
    Price: 0,
    QuantityAvailable: 0,
    ProductName: "",
    ProductDescription: "",
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${apiBaseUrl}/inventory/${Id}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      const data = await response.json();
      setInventoryData(data);
      setFormData({
        Price: data.Price,
        QuantityAvailable: data.QuantityAvailable,
        ProductName: data.product.ProductName,
        ProductDescription: data.product.ProductDescription,
      });
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === "Price" || name === "QuantityAvailable") {
      newValue = Number(value);
    }

    if (name) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: newValue,
      }));
    }
  };

  const confirmEdit = async () => {
    try {
      const response = await fetch(
        `${apiBaseUrl}/inventory/update-inventory/${Id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        setFailureMessage("Failed to add inventory");
        setTimeout(() => {
          setFailureMessage("");
        }, 5000);
        throw new Error("Failed to update inventory");
      }

      setSuccessMessage("Inventory updated successfully");
      setTimeout(() => {
        setSuccessMessage("");
      }, 5000);

      setShowConfirmation(false);
    } catch (error) {
      setFailureMessage("Failed to add inventory");
      setTimeout(() => {
        setFailureMessage("");
      }, 5000);
      console.error("Error updating inventory:", error);
    }
  };

  return (
    <>
      {loading === true ? (
        <div className="flex items-center justify-center h-96">
          <Spinner />
        </div>
      ) : (
        <div className="bg-transparent">
          {successMessage && (
            <div
              className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
              role="alert"
            >
              <span className="font-medium">{successMessage}</span>
            </div>
          )}

          {failureMessage && (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <span className="font-medium">{failureMessage}</span>
            </div>
          )}
          <Link
            type="button"
            href={`/inventory`}
            className="px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <FontAwesomeIcon icon={faArrowLeft} /> &nbsp; Go Back
          </Link>
          <br />
          <br />
          <br />

          <form className="w-full mx-auto">
            <div className="mx-auto mt-6 w-full sm:px-6 lg:px-8 mb-12">
              <div className="overflow-hidden rounded-lg">
                <img
                  src={inventoryData?.product?.product_media[0]?.MediaUrl}
                  width={inventoryData?.product?.product_media[0]?.Width}
                  height={inventoryData?.product?.product_media[0]?.Height}
                  alt="Product image"
                  className="w-full"
                />
              </div>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="input"
                name="QuantityAvailable"
                id="QuantityAvailable"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                onChange={handleChange}
                value={formData.QuantityAvailable}
              />
              <label
                htmlFor="QuantityAvailable"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Quantity
              </label>
            </div>

            <div className="relative z-0 w-full mb-5 group">
              <input
                type="input"
                name="Price"
                id="Price"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                onChange={handleChange}
                value={formData.Price}
              />
              <label
                htmlFor="Price"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Price (RM)
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="input"
                name="ProductName"
                id="ProductName"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                onChange={handleChange}
                value={formData.ProductName}
              />
              <label
                htmlFor="ProductName"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Product Name
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <textarea
                name="ProductDescription"
                id="ProductDescription"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                onChange={handleChange}
                value={formData.ProductDescription}
              />
              <label
                htmlFor="ProductDescription"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Product Description
              </label>
            </div>

            <button
              type="button"
              onClick={() => setShowConfirmation(true)}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit
            </button>
          </form>
        </div>
      )}

      {showConfirmation && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
              aria-hidden="true"
            ></div>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100 sm:mx-0 sm:h-10 sm:w-10">
                    <FontAwesomeIcon
                      className="h-6 w-6 text-yellow-600"
                      icon={faExclamationTriangle}
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900"
                      id="modal-title"
                    >
                      Update Inventory
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to update this inventory item?
                        This action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={confirmEdit}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-yellow-600 text-base font-medium text-white hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Update
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
          <p className="mt-12 text-2xl font-medium text-gray-900 dark:text-yellow-400">
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

export default EditInventoryComponent;
