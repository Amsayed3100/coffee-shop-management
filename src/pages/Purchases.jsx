import { useEffect, useState } from "react";
import API from "../api/axios";

const Purchases = () => {

  const [data, setData] = useState([]);
  const [form, setForm] = useState({
    product: "",
    quantity: 0
  });

  const fetch = async () => {
    const res = await API.get("/purchases/");
    setData(res.data);
  };

  const add = async () => {
    await API.post("/purchases/", form);
    fetch();
  };

  useEffect(()=>{ fetch(); },[]);

  return (
    <div className="container mt-4">
      <div className="card p-3">

        <h3>Purchases</h3>

        <input className="form-control my-2"
          placeholder="Product ID"
          onChange={(e)=>setForm({...form, product:e.target.value})}
        />

        <input className="form-control my-2"
          placeholder="Quantity"
          type="number"
          onChange={(e)=>setForm({...form, quantity:e.target.value})}
        />

        <button className="btn btn-primary mb-3" onClick={add}>
          Add Purchase
        </button>

        <ul className="list-group">
          {data.map(p=>(
            <li key={p.id} className="list-group-item">
              Product: {p.product} | Qty: {p.quantity}
            </li>
          ))}
        </ul>

      </div>
    </div>
  );
};

export default Purchases;