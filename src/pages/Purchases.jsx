import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Purchases() {
  const [purchases, setPurchases] = useState([]);
  const [form, setForm] = useState({ product:"", supplier:"", quantity:"", date:"" });
  const [editingId, setEditingId] = useState(null);

  const fetchPurchases = async () => {
    const res = await api.get("/purchases/");
    setPurchases(res.data);
  };

  useEffect(()=>{ fetchPurchases(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(editingId){
      await api.put(`/purchases/${editingId}/`, form);
    } else {
      const res = await api.post("/purchases/", form);
      setPurchases([...purchases, res.data]);
    }
    setForm({ product:"", supplier:"", quantity:"", date:"" });
    setEditingId(null);
  };

  const handleEdit = (p) => {
    setForm({ product:p.product, supplier:p.supplier, quantity:p.quantity, date:p.date });
    setEditingId(p.id);
  };

  const handleDelete = async (id) => {
    await api.delete(`/purchases/${id}/`);
    setPurchases(purchases.filter(p=>p.id!==id));
  };

  return (
    <div className="page">
      <h1>Purchases</h1>
      <form onSubmit={handleSubmit}>
        <input placeholder="Product" value={form.product} onChange={e=>setForm({...form,product:e.target.value})} required/>
        <input placeholder="Supplier" value={form.supplier} onChange={e=>setForm({...form,supplier:e.target.value})} required/>
        <input placeholder="Quantity" type="number" value={form.quantity} onChange={e=>setForm({...form,quantity:e.target.value})} required/>
        <input placeholder="Date" type="date" value={form.date} onChange={e=>setForm({...form,date:e.target.value})} required/>
        <button>{editingId ? "Update":"Add"}</button>
      </form>

      <table>
        <thead>
          <tr><th>Product</th><th>Supplier</th><th>Quantity</th><th>Date</th><th>Action</th></tr>
        </thead>
        <tbody>
          {purchases.map(p=>(
            <tr key={p.id}>
              <td>{p.product}</td>
              <td>{p.supplier}</td>
              <td>{p.quantity}</td>
              <td>{p.date}</td>
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