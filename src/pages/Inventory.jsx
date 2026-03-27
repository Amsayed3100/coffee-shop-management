import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Inventory() {
  const [items, setItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ product: "", quantity: "", type: "IN" });
  const [editingId, setEditingId] = useState(null);

  const fetchInventory = async () => { const res = await api.get("/inventory/"); setItems(res.data); };
  const fetchProducts = async () => { const res = await api.get("/products/"); setProducts(res.data); };

  useEffect(() => { fetchInventory(); fetchProducts(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) await api.put(`/inventory/${editingId}/`, form);
    else await api.post("/inventory/", form);
    setForm({ product: "", quantity: "", type: "IN" });
    setEditingId(null);
    fetchInventory();
  };

  const handleEdit = (item) => { setForm({ product: item.product, quantity: item.quantity, type: item.type }); setEditingId(item.id); };
  const handleDelete = async (id) => { if (!window.confirm("Delete this record?")) return; await api.delete(`/inventory/${id}/`); fetchInventory(); };

  return (
    <div className="page">
      <h1>Inventory</h1>
      <form onSubmit={handleSubmit}>
        <select value={form.product} onChange={e=>setForm({...form,product:e.target.value})} required>
          <option value="">Select Product</option>
          {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
        <input type="number" placeholder="Quantity" value={form.quantity} onChange={e=>setForm({...form,quantity:e.target.value})} required />
        <select value={form.type} onChange={e=>setForm({...form,type:e.target.value})}>
          <option value="IN">Stock In</option>
          <option value="OUT">Stock Out</option>
        </select>
        <button>{editingId ? "Update" : "Add"}</button>
      </form>

      <table>
        <thead><tr><th>Product</th><th>Quantity</th><th>Type</th><th>Action</th></tr></thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id}>
              <td>{item.product_name || item.product}</td>
              <td>{item.quantity}</td>
              <td>{item.type}</td>
              <td>
                <button onClick={()=>handleEdit(item)}>Edit</button>
                <button onClick={()=>handleDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}