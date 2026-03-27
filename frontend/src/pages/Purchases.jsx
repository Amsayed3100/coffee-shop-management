import React, { useEffect, useState } from "react";
import api from "../api/axios";

function Purchases() {
  const [purchases, setPurchases] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    supplier_id: "",
    product_id: "",
    quantity: "",
    purchase_price: "",
    purchase_date: "",
    note: "",
  });

  const fetchPurchases = async () => {
    try {
      const response = await api.get("/purchases/");
      setPurchases(response.data);
    } catch (error) {
      console.error("Error fetching purchases:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSuppliers = async () => {
    try {
      const response = await api.get("/suppliers/");
      setSuppliers(response.data);
    } catch (error) {
      console.error("Error fetching suppliers:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await api.get("/products/");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchPurchases();
    fetchSuppliers();
    fetchProducts();
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
      await api.post("/purchases/", {
        ...formData,
        supplier_id: parseInt(formData.supplier_id),
        product_id: parseInt(formData.product_id),
        quantity: parseInt(formData.quantity),
        purchase_price: parseFloat(formData.purchase_price),
      });

      setFormData({
        supplier_id: "",
        product_id: "",
        quantity: "",
        purchase_price: "",
        purchase_date: "",
        note: "",
      });

      fetchPurchases();
    } catch (error) {
      console.error("Error adding purchase:", error);
      alert("Failed to add purchase");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Purchases</h1>

      <h2>Add Purchase</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: "30px" }}>
        <div style={{ marginBottom: "10px" }}>
          <select
            name="supplier_id"
            value={formData.supplier_id}
            onChange={handleChange}
            required
            style={{ padding: "8px", width: "300px" }}
          >
            <option value="">Select Supplier</option>
            {suppliers.map((supplier) => (
              <option key={supplier.id} value={supplier.id}>
                {supplier.name}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <select
            name="product_id"
            value={formData.product_id}
            onChange={handleChange}
            required
            style={{ padding: "8px", width: "300px" }}
          >
            <option value="">Select Product</option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
            style={{ padding: "8px", width: "300px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <input
            type="number"
            name="purchase_price"
            placeholder="Purchase Price"
            value={formData.purchase_price}
            onChange={handleChange}
            required
            style={{ padding: "8px", width: "300px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <input
            type="date"
            name="purchase_date"
            value={formData.purchase_date}
            onChange={handleChange}
            required
            style={{ padding: "8px", width: "300px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <textarea
            name="note"
            placeholder="Note"
            value={formData.note}
            onChange={handleChange}
            style={{ padding: "8px", width: "300px", height: "80px" }}
          />
        </div>

        <button type="submit" style={{ padding: "10px 20px" }}>
          Add Purchase
        </button>
      </form>

      <h2>Purchase List</h2>

      {loading ? (
        <p>Loading purchases...</p>
      ) : purchases.length === 0 ? (
        <p>No purchases found.</p>
      ) : (
        <table border="1" cellPadding="10" style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Supplier</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Purchase Price</th>
              <th>Purchase Date</th>
              <th>Note</th>
            </tr>
          </thead>
          <tbody>
            {purchases.map((purchase) => (
              <tr key={purchase.id}>
                <td>{purchase.id}</td>
                <td>{purchase.supplier_name}</td>
                <td>{purchase.product_name}</td>
                <td>{purchase.quantity}</td>
                <td>{purchase.purchase_price}</td>
                <td>{purchase.purchase_date}</td>
                <td>{purchase.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Purchases;