import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", price: "" });
  const [editingId, setEditingId] = useState(null);

  const fetchProducts = async () => {
    const res = await api.get("/products/");
    setProducts(res.data);
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await api.put(`/products/${editingId}/`, form);
    } else {
      await api.post("/products/", form);
    }
    setForm({ name: "", price: "" });
    setEditingId(null);
    fetchProducts();
  };

  const handleEdit = (product) => {
    setForm({ name: product.name, price: product.price });
    setEditingId(product.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    await api.delete(`/products/${id}/`);
    fetchProducts();
  };

  return (
    <div className="page">
      <h1>Products</h1>
      <form onSubmit={handleSubmit}>
        <input placeholder="Name" value={form.name} onChange={e => setForm({...form,name:e.target.value})} required />
        <input type="number" placeholder="Price" value={form.price} onChange={e => setForm({...form,price:e.target.value})} required />
        <button>{editingId ? "Update" : "Add"}</button>
      </form>
      <table>
        <thead>
          <tr><th>Name</th><th>Price</th><th>Action</th></tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.price}</td>
              <td>
                <button onClick={()=>handleEdit(p)}>Edit</button>
                <button onClick={()=>handleDelete(p.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}