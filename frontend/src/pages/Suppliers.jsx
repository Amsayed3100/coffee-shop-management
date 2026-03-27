import React, { useEffect, useState } from "react";
import api from "../api/axios";

function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    company_name: "",
    phone: "",
    email: "",
    address: "",
  });

  const fetchSuppliers = async () => {
    try {
      const response = await api.get("/suppliers/");
      setSuppliers(response.data);
    } catch (error) {
      console.error("Error fetching suppliers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/suppliers/", formData);

      setFormData({
        name: "",
        company_name: "",
        phone: "",
        email: "",
        address: "",
      });

      fetchSuppliers();
    } catch (error) {
      console.error("Error adding supplier:", error);
      alert("Failed to add supplier");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Suppliers</h1>

      <h2>Add Supplier</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: "30px" }}>
        <div style={{ marginBottom: "10px" }}>
          <input
            type="text"
            name="name"
            placeholder="Supplier Name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{ padding: "8px", width: "300px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <input
            type="text"
            name="company_name"
            placeholder="Company Name"
            value={formData.company_name}
            onChange={handleChange}
            style={{ padding: "8px", width: "300px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            required
            style={{ padding: "8px", width: "300px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            style={{ padding: "8px", width: "300px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <textarea
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            style={{ padding: "8px", width: "300px", height: "80px" }}
          />
        </div>

        <button type="submit" style={{ padding: "10px 20px" }}>
          Add Supplier
        </button>
      </form>

      <h2>Supplier List</h2>

      {loading ? (
        <p>Loading suppliers...</p>
      ) : suppliers.length === 0 ? (
        <p>No suppliers found.</p>
      ) : (
        <table
          border="1"
          cellPadding="10"
          style={{ borderCollapse: "collapse", width: "100%" }}
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Company</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((supplier) => (
              <tr key={supplier.id}>
                <td>{supplier.id}</td>
                <td>{supplier.name}</td>
                <td>{supplier.company_name}</td>
                <td>{supplier.phone}</td>
                <td>{supplier.email}</td>
                <td>{supplier.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Suppliers;