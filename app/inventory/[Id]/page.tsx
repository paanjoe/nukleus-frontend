"use client";

import { data } from "autoprefixer";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: { Id: string } }) {
  const [inventoryData, setInventoryData] = useState();
  const [loading, setLoading] = useState(true);

  const apiBaseUrl =
    process.env.API_BASE_URL || "https://nukleus-backend.onrender.com/api";

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${apiBaseUrl}/inventory/${params.Id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setInventoryData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [params.Id]);

  return (
    <>
      <pre>
        <code>{JSON.stringify(inventoryData, null, 2)}</code>
      </pre>
    </>
  );
}
function setInventoryData(data: any) {
  throw new Error("Function not implemented.");
}
