import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <h2>☕ Coffee</h2>
      <div>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/products">Products</Link>
        <Link to="/inventory">Inventory</Link>
        <Link to="/suppliers">Suppliers</Link>
        <Link to="/purchases">Purchases</Link>
        <Link to="/expenses">Expenses</Link>
      </div>
    </nav>
  );
}