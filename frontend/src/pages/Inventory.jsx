import React, { useEffect, useState } from "react";
import api from "../api/axios";

function Inventory() {
  const [inventoryItems, setInventoryItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchInventory = async () => {
    try {
      const response = await api.get("/inventory/");
      setInventoryItems(response.data);
    } catch (error) {
      console.error("Error fetching inventory:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Inventory</h1>

      {loading ? (
        <p>Loading inventory...</p>
      ) : inventoryItems.length === 0 ? (
        <p>No inventory data found.</p>
      ) : (
        <table
          border="1"
          cellPadding="10"
          style={{ borderCollapse: "collapse", width: "100%" }}
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Product Name</th>
              <th>Category</th>
              <th>Stock Quantity</th>
              <th>Available</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {inventoryItems.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>{item.stock_quantity}</td>
                <td>{item.is_available ? "Yes" : "No"}</td>
                <td>{item.stock_status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Inventory;