import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [form, setForm] = useState({ name:"", contact:"", email:"" });
  const [editingId, setEditingId] = useState(null);

  const fetchSuppliers = async () => {
    const res = await api.get("/suppliers/");
    setSuppliers(res.data);
  };

  useEffect(()=>{ fetchSuppliers(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(editingId){
      await api.put(`/suppliers/${editingId}/`, form);
    } else {
      const res = await api.post("/suppliers/", form);
      setSuppliers([...suppliers, res.data]);
    }
    setForm({ name:"", contact:"", email:"" });
    setEditingId(null);
  };

  const handleEdit = (s) => {
    setForm({ name:s.name, contact:s.contact, email:s.email });
    setEditingId(s.id);
  };

  const handleDelete = async (id) => {
    await api.delete(`/suppliers/${id}/`);
    setSuppliers(suppliers.filter(s=>s.id!==id));
  };

  return (
    <div className="page">
      <h1>Suppliers</h1>
      <form onSubmit={handleSubmit}>
        <input placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required/>
        <input placeholder="Contact" value={form.contact} onChange={e=>setForm({...form,contact:e.target.value})} required/>
        <input placeholder="Email" type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} required/>
        <button>{editingId ? "Update":"Add"}</button>
      </form>

      <table>
        <thead>
          <tr><th>Name</th><th>Contact</th><th>Email</th><th>Action</th></tr>
        </thead>
        <tbody>
          {suppliers.map(s=>(
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{s.contact}</td>
              <td>{s.email}</td>
              <td>
                <button onClick={()=>handleEdit(s)}>Edit</button>
                <button onClick={()=>handleDelete(s.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}