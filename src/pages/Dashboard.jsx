import { useEffect, useState } from "react";
import API from "../api/axios";

const Dashboard = () => {

  const [stats, setStats] = useState({
    products: 0,
    inventory: 0,
    expenses: 0
  });

  useEffect(() => {
    API.get("/reports/dashboard/")
      .then(res => setStats(res.data))
      .catch(()=>{});
  }, []);

  return (
    <div className="container mt-4">

      <div className="row">
        <div className="col-md-4">
          <div className="stat-card bg-coffee">
            Products: {stats.products}
          </div>
        </div>

        <div className="col-md-4">
          <div className="stat-card bg-latte">
            Stock: {stats.inventory}
          </div>
        </div>

        <div className="col-md-4">
          <div className="stat-card bg-coffee">
            Expenses: ${stats.expenses}
          </div>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;