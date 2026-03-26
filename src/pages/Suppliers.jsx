import { useEffect, useState } from "react";
import API from "../api/axios";

const Suppliers = () => {

  const [data, setData] = useState([]);
  const [name, setName] = useState("");

  const fetch = async () => {
    const res = await API.get("/suppliers/");
    setData(res.data);
  };

  const add = async () => {
    await API.post("/suppliers/", { name });
    setName("");
    fetch();
  };

  const del = async (id) => {
    await API.delete(`/suppliers/${id}/`);
    fetch();
  };

  useEffect(()=>{ fetch(); },[]);

  return (
    <div className="container mt-4">
      <div className="card p-3">

        <h3>Suppliers</h3>

        <div className="d-flex gap-2 my-3">
          <input className="form-control"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            placeholder="Supplier name"
          />
          <button className="btn btn-primary" onClick={add}>Add</button>
        </div>

        <ul className="list-group">
          {data.map(s=>(
            <li key={s.id} className="list-group-item d-flex justify-content-between">
              {s.name}
              <button className="btn btn-danger btn-sm" onClick={()=>del(s.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>

      </div>
    </div>
  );
};

export default Suppliers;