import { Link } from "react-router-dom";
import { getRole } from "../context/AuthContext";

const Navbar = () => {
  const role = getRole();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark px-3">
      <Link className="navbar-brand" to="/">☕ Coffee Admin</Link>

      <div className="ms-auto">
        <Link className="btn btn-light mx-1" to="/">Dashboard</Link>
        <Link className="btn btn-light mx-1" to="/products">Products</Link>
        <Link className="btn btn-light mx-1" to="/inventory">Inventory</Link>

        {role === "admin" && (
          <>
            <Link className="btn btn-warning mx-1" to="/suppliers">Suppliers</Link>
            <Link className="btn btn-warning mx-1" to="/purchases">Purchases</Link>
            <Link className="btn btn-warning mx-1" to="/expenses">Expenses</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;