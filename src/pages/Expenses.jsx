import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState({ title:"", amount:"", category:"", date:"" });
  const [editingId, setEditingId] = useState(null);

  const fetchExpenses = async () => {
    const res = await api.get("/expenses/");
    setExpenses(res.data);
  };

  useEffect(()=>{ fetchExpenses(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(editingId){
      await api.put(`/expenses/${editingId}/`, form);
    } else {
      const res = await api.post("/expenses/", form);
      setExpenses([...expenses, res.data]);
    }
    setForm({ title:"", amount:"", category:"", date:"" });
    setEditingId(null);
  };

  const handleEdit = (ex) => {
    setForm({ title:ex.title, amount:ex.amount, category:ex.category, date:ex.date });
    setEditingId(ex.id);
  };

  const handleDelete = async (id) => {
    await api.delete(`/expenses/${id}/`);
    setExpenses(expenses.filter(ex=>ex.id!==id));
  };

  return (
    <div className="page">
      <h1>Expenses</h1>
      <form onSubmit={handleSubmit}>
        <input placeholder="Title" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} required/>
        <input placeholder="Amount" type="number" value={form.amount} onChange={e=>setForm({...form,amount:e.target.value})} required/>
        <input placeholder="Category" value={form.category} onChange={e=>setForm({...form,category:e.target.value})} required/>
        <input placeholder="Date" type="date" value={form.date} onChange={e=>setForm({...form,date:e.target.value})} required/>
        <button>{editingId ? "Update":"Add"}</button>
      </form>

      <table>
        <thead>
          <tr><th>Title</th><th>Amount</th><th>Category</th><th>Date</th><th>Action</th></tr>
        </thead>
        <tbody>
          {expenses.map(ex=>(
            <tr key={ex.id}>
              <td>{ex.title}</td>
              <td>${ex.amount}</td>
              <td>{ex.category}</td>
              <td>{ex.date}</td>
              <td>
                <button onClick={()=>handleEdit(ex)}>Edit</button>
                <button onClick={()=>handleDelete(ex.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}