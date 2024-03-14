"use client";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

export default function AddInventoryComponent() {
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [failureMessage, setFailureMessage] = useState("");
  const [formData, setFormData] = useState({
    productId: "",
    entityUserId: "7a9b66f2-0859-4ff3-857c-80963d3b8443", // Default entityUserId
    Price: 0,
    QuantityAvailable: 0,
    Currency: "RM", // Default currency
    isDeleted: false, // Default isDeleted
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    // Check if the input should be a number
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

  const handleSubmit = async (e) => {
    // Ensure selectedProduct is updated
    if (!selectedProduct) {
      console.error("No product selected");
      return;
    }

    e.preventDefault();
    try {
      const response = await fetch(
        "https://nukleus-backend.onrender.com/api/inventory/add-inventory",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            inventoryData: {
              ...formData,
              QuantityAvailable: formData.QuantityAvailable, // Convert quantity to integer
            },
          }),
        }
      );

      if (response.ok) {
        // Handle success
        setSuccessMessage("Inventory added successfully");
        setTimeout(() => {
          setSuccessMessage("");
        }, 5000);
      } else {
        // Handle errors
        setFailureMessage("Failed to add inventory");
        setTimeout(() => {
          setFailureMessage("");
        }, 5000);
      }
    } catch (error) {
      setFailureMessage("Failed to add inventory");
      setTimeout(() => {
        setFailureMessage("");
      }, 5000);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://nukleus-backend.onrender.com/api/product?sortBy=productName&sortDirection=asc&take=100"
        );
        const data = await response.json();
        setProducts(data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const product = products.find(
      (product) => product.Id === selectedProductId
    );
    setSelectedProduct(product);
  }, [selectedProductId, products]);

  useEffect(() => {
    // Update productId in formData whenever selectedProduct changes
    if (selectedProduct) {
      setFormData((prevData) => ({
        ...prevData,
        productId: selectedProduct.Id,
      }));
    }
  }, [selectedProduct]);

  const handleProductChange = (e) => {
    setSelectedProductId(e.target.value);
    handleChange(e);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB");
  };

  return (
    <>
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

      <div className="container mx-auto px-4 py-8">
        <Link
          type="button"
          href={`/inventory`}
          className="px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <FontAwesomeIcon icon={faArrowLeft} /> &nbsp; Go Back
        </Link>
        <br />
        <br />
        <form className="w-full mx-auto">
          <label
            htmlFor="productId"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Select list of Product
          </label>
          <select
            id="productId"
            onChange={handleProductChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="">Select a product</option>
            {products.map((product) => (
              <option key={product.Id} value={product.Id}>
                {product.ProductName}
              </option>
            ))}
          </select>
          <br />
          <br />

          {selectedProduct && (
            <div className="block max-w-lg p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              {/* <pre>{JSON.stringify(selectedProduct, null, 2)}</pre> */}
              <div className="relative z-0 w-full mb-5 group">
                <img
                  className="h-auto max-w-full"
                  src={selectedProduct.product_media[0]?.MediaUrl}
                  alt="The image of this product la..."
                />
              </div>

              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="input"
                  name="productName"
                  id="productName"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  value={selectedProduct.ProductName}
                  disabled
                />
                <label
                  htmlFor="productName"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Product Name
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="input"
                  name="createdDate"
                  id="createdDate"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  value={formatDate(selectedProduct.CreatedDate)}
                  disabled
                />
                <label
                  htmlFor="createdDate"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Date Created
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="input"
                  name="productDescription"
                  id="productDescription"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  value={selectedProduct.ProductDescription}
                  disabled
                />
                <label
                  htmlFor="productDescription"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Product Description
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="input"
                  name="productCategory"
                  id="productCategory"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  value={selectedProduct.product_category.CategoryName}
                  disabled
                />
                <label
                  htmlFor="productCategory"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Product Category
                </label>
              </div>
            </div>
          )}
          <br />
          <br />
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="number"
              name="Price"
              id="Price"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              min="1" // Ensure only positive numbers are accepted
              pattern="^[1-9]\d*$"
              title="Please enter a positive number"
              // value={formData.Price}
              onChange={handleChange}
            />
            <label
              htmlFor="price"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Price (RM)
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="number"
              name="QuantityAvailable"
              id="QuantityAvailable"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              min="1" // Ensure only positive numbers are accepted
              pattern="^[1-9]\d*$"
              title="Please enter a positive number" // Error message if the input is not a positive number
              // value={formData.QuantityAvailable}
              onChange={handleChange}
            />
            <label
              htmlFor="QuantityAvailable"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Quantity
            </label>
          </div>

          <button
            type="submit"
            onClick={handleSubmit}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
