"use client";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAdd,
  faCaretDown,
  faCaretUp,
} from "@fortawesome/free-solid-svg-icons";

import Spinner from "./Spinner";
import Link from "next/link";

const Inventory = () => {
  const [inventoryData, setInventoryData] = useState([]);
  const [totalInventory, setTotalInventory] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("productName");
  const [sortDirection, setSortDirection] = useState("asc");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [inventoryToDelete, setInventoryToDelete] = useState("");
  const apiBaseUrl =
    process.env.API_BASE_URL || "https://nukleus-backend.onrender.com/api";

  // Get Inventory Data..
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${apiBaseUrl}/inventory?sortBy=${sortBy}&sortDirection=${sortDirection}&take=${pageSize}&skip=${
          (page - 1) * pageSize
        }`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setInventoryData(data.data);
      setTotalInventory(data.total);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle error
    } finally {
      setLoading(false);
    }
  };

  // Apply the fetch data function when the component mounts
  useEffect(() => {
    fetchData();
  }, [sortBy, sortDirection, page, pageSize]);

  // Handle sort parameters
  const handleSort = (column) => {
    if (sortBy === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortDirection("asc");
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = inventoryData.filter((item) =>
    item.product.ProductName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(totalInventory / pageSize);

  const confirmDelete = async () => {
    try {
      const response = await fetch(
        `${apiBaseUrl}/inventory/delete-inventory/${inventoryToDelete}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete inventory");
      }
      fetchData();
      setShowConfirmation(false);
    } catch (error) {
      console.error("Error deleting inventory:", error);
    }
  };

  const handleDeleteConfirmation = (productId) => {
    setInventoryToDelete(productId);
    setShowConfirmation(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {loading === true ? (
        <Spinner />
      ) : (
        <>
          <Link
            href={"/inventory/add"}
            type="button"
            className="text-center w-full mb-6 focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
          >
            <FontAwesomeIcon icon={faAdd} /> &nbsp; Add Inventory
          </Link>

          <p className="mb-4 text-lg font-semibold">
            Total Inventory: {totalInventory}
          </p>

          {/* Header area */}
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              value={searchTerm}
              onChange={handleSearch}
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search by Product Name"
              required
            />
            <button
              type="submit"
              className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>

          <br />

          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th
                    onClick={() => handleSort("productName")}
                    scope="col"
                    className="px-6 py-3 cursor-pointer"
                  >
                    Product Name &nbsp;
                    {sortBy === "productName" && (
                      <FontAwesomeIcon
                        icon={sortDirection === "asc" ? faCaretUp : faCaretDown}
                      />
                    )}
                  </th>
                  <th
                    onClick={() => handleSort("price")}
                    scope="col"
                    className="px-6 py-3 cursor-pointer"
                  >
                    Price &nbsp;
                    {sortBy === "price" && (
                      <FontAwesomeIcon
                        icon={sortDirection === "asc" ? faCaretUp : faCaretDown}
                      />
                    )}
                  </th>
                  <th
                    onClick={() => handleSort("productCategory")}
                    scope="col"
                    className="px-6 py-3 cursor-pointer"
                  >
                    Category &nbsp;
                    {sortBy === "productCategory" && (
                      <FontAwesomeIcon
                        icon={sortDirection === "asc" ? faCaretUp : faCaretDown}
                      />
                    )}
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item) => (
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      <Link key={item.Id} href={`/inventory/${item.Id}`}>
                        {item.product.ProductName}
                      </Link>
                    </th>
                    <td className="px-6 py-4">{`${item.Currency} ${item.Price} `}</td>
                    <td className="px-6 py-4">
                      {item.product.product_category.CategoryName}
                    </td>
                    <td className="flex items-center px-6 py-4">
                      <Link
                        href={`/inventory/edit/${item.Id}`}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDeleteConfirmation(item.Id)}
                        className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Area */}
          <div className="mt-4 flex justify-between items-center">
            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className={`px-4 py-2 bg-gray-200 text-gray-800 rounded ${
                page === 1
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-300"
              }`}
            >
              Previous
            </button>
            <span>{`Page ${page} of ${totalPages}`}</span>
            <button
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
              className={`px-4 py-2 bg-gray-200 text-gray-800 rounded ${
                page === totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-300"
              }`}
            >
              Next
            </button>
          </div>

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
        </>
      )}
    </div>
  );
};

export default Inventory;
