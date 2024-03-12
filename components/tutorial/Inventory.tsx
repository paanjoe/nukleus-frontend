// // components/inventory/Inventory.tsx
"use client";
// import { useEffect, useState } from "react";

// const Inventory = () => {
//   const [inventoryData, setInventoryData] = useState([]);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const response = await fetch(
//           "https://nukleus-backend.onrender.com/api/inventory?sortBy=productName&sortDirection=asc&take=5&skip=1"
//         );
//         if (!response.ok) {
//           throw new Error("Failed to fetch data");
//         }
//         const data = await response.json();
//         setInventoryData(data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         // Redirect to login page or handle error as needed
//       }
//     }

//     fetchData();
//   }, []);

//   return (
//     <div>
//       {/* <h2>Inventory</h2>
//       <ul>
//         {inventoryData.map((item: any) => (
//           <li key={item.Id}>{item.product.ProductName}</li>
//         ))}
//       </ul> */}

//       <pre>{JSON.stringify(inventoryData, null, 2)}</pre>
//     </div>
//   );
// };

// export default Inventory;

import { useEffect, useState } from "react";
// import { useRouter } from "next/router";

const Inventory = () => {
  // const router = useRouter();
  const [inventoryData, setInventoryData] = useState([]);
  const [totalInventory, setTotalInventory] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("productName");
  const [sortDirection, setSortDirection] = useState("asc");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const apiBaseUrl =
    process.env.API_BASE_URL || "https://nukleus-backend.onrender.com/api";

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

  useEffect(() => {
    fetchData();
  }, [sortBy, sortDirection, page, pageSize]);

  const handleSort = (column: any) => {
    if (sortBy === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortDirection("asc");
    }
  };

  const handleDelete = async (productId: any) => {
    // Implement delete functionality here
    console.log("Delete product with ID:", productId);
  };

  const handleEdit = (productId: any) => {
    // Implement edit functionality here
    console.log("Edit product with ID:", productId);
  };

  const handleSearch = (event: any) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = inventoryData.filter((item: any) =>
    item.product.ProductName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <p className="">Total Inventory: {totalInventory}</p>
      <br />
      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search by Product Name"
          className="border border-gray-300 rounded px-4 py-2 mr-2"
        />
        <button
          onClick={() => handleSort("productName")}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Sort by Name
        </button>
        <button
          onClick={() => handleSort("Price")}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Sort by Price
        </button>
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2">Product Name</th>
            <th className="border px-4 py-2">Description</th>
            <th className="border px-4 py-2">Price</th>
            <th className="border px-4 py-2">Category</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr key={item.Id}>
              <td className="border px-4 py-2">{item.product.ProductName}</td>
              <td className="border px-4 py-2">
                {item.product.ProductDescription}
              </td>
              <td className="border px-4 py-2">{`${item.Price} ${item.Currency}`}</td>
              <td className="border px-4 py-2">
                {item.product.product_category.CategoryName}
              </td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleEdit(item.product.Id)}
                  className="mr-2"
                >
                  Edit
                </button>
                <button onClick={() => handleDelete(item.product.Id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default Inventory;
