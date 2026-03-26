import { useEffect, useState } from "react";
import API from "../api/axios";

const Expenses = () => {

  const [data, setData] = useState([]);
  const [form, setForm] = useState({
    amount: "",
    category: ""
  });

  const fetch = async () => {
    const res = await API.get("/expenses/");
    setData(res.data);
  };

  const add = async () => {
    await API.post("/expenses/", form);
    fetch();
  };

  useEffect(()=>{ fetch(); },[]);

  return (
    <div className="container mt-4">
      <div className="card p-3">

        <h3>Expenses</h3>

        <input className="form-control my-2"
          placeholder="Amount"
          onChange={(e)=>setForm({...form, amount:e.target.value})}
        />

        <input className="form-control my-2"
          placeholder="Category"
          onChange={(e)=>setForm({...form, category:e.target.value})}
        />

        <button className="btn btn-primary mb-3" onClick={add}>
          Add Expense
        </button>

        <ul className="list-group">
          {data.map(e=>(
            <li key={e.id} className="list-group-item">
              ${e.amount} - {e.category}
            </li>
          ))}
        </ul>

      </div>
    </div>
  );
};

export default Expenses;