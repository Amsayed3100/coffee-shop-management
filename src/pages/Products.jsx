import { useEffect, useState } from "react";
import API from "../api/axios";

const Products = () => {

  const [data, setData] = useState([]);
  const [name, setName] = useState("");

  const fetch = async () => {
    const res = await API.get("/products/");
    setData(res.data);
  };

  const add = async () => {
    if(!name) return;
    await API.post("/products/", { name });
    setName("");
    fetch();
  };

  const del = async (id) => {
    await API.delete(`/products/${id}/`);
    fetch();
  };

  useEffect(()=>{ fetch(); },[]);

  return (
    <div className="container mt-4">
      <div className="card p-3">

        <h3>Products</h3>

        <div className="d-flex gap-2 my-3">
          <input className="form-control"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            placeholder="Product name"
          />
          <button className="btn btn-primary" onClick={add}>Add</button>
        </div>

        <table className="table">
          <thead>
            <tr><th>ID</th><th>Name</th><th></th></tr>
          </thead>

          <tbody>
            {data.map(p=>(
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.name}</td>
                <td>
                  <button className="btn btn-danger btn-sm"
                    onClick={()=>del(p.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
};

export default Products;