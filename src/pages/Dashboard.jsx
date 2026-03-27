import React, { useEffect, useState } from "react";
import api from "../api/axios"; // Mock API
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    products: 0,
    inventory: 0,
    suppliers: 0,
    purchases: 0,
    expenses: 0,
  });

  // Mock fetch counts
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [productsRes, inventoryRes, suppliersRes, purchasesRes, expensesRes] = await Promise.all([
          api.get("/products/"),
          api.get("/inventory/"),
          api.get("/suppliers/"),
          api.get("/purchases/"),
          api.get("/expenses/"),
        ]);

        setStats({
          products: productsRes.data.length,
          inventory: inventoryRes.data.length,
          suppliers: suppliersRes.data.length,
          purchases: purchasesRes.data.length,
          expenses: expensesRes.data.length,
        });
      } catch (err) {
        console.log("Error fetching dashboard stats", err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="page">
      <h1>Welcome, {user?.username || "User"}!</h1>
      <p>Manage your coffee shop operations efficiently.</p>

      <div className="dashboard-cards">
        <div className="card">
          <h3>Products</h3>
          <p>{stats.products} items</p>
        </div>
        <div className="card">
          <h3>Inventory</h3>
          <p>{stats.inventory} records</p>
        </div>
        <div className="card">
          <h3>Suppliers</h3>
          <p>{stats.suppliers} suppliers</p>
        </div>
        <div className="card">
          <h3>Purchases</h3>
          <p>{stats.purchases} transactions</p>
        </div>
        <div className="card">
          <h3>Expenses</h3>
          <p>{stats.expenses} records</p>
        </div>
      </div>
    </div>
  );
}