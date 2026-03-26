import { useEffect, useState } from "react";
import API from "../api/axios";

const Inventory = () => {

  const [data, setData] = useState([]);

  const fetch = async () => {
    const res = await API.get("/inventory/");
    setData(res.data);
  };

  useEffect(()=>{ fetch(); },[]);

  return (
    <div className="container mt-4">
      <div className="card p-3">

        <h3>Inventory</h3>

        <table className="table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
            </tr>
          </thead>

          <tbody>
            {data.map(i=>(
              <tr key={i.id}>
                <td>{i.product_name}</td>
                <td>{i.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
};

export default Inventory;