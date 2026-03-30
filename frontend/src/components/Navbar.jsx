import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ padding: "10px", background: "#333" }}>
      <Link to="/" style={{ color: "#fff", marginRight: "10px" }}>
       
      </Link>

      <Link to="/products" style={{ color: "#fff", marginRight: "10px" }}>
        
      </Link>

      <Link to="/suppliers" style={{ color: "#fff", marginRight: "10px" }}>
        Suppliers
      </Link>

      <Link to="/purchases" style={{ color: "#fff", marginRight: "10px" }}>
        Purchases
      </Link>

      <Link to="/inventory" style={{ color: "#fff", marginRight: "10px" }}>
        Inventory
      </Link>

      <Link to="/expenses" style={{ color: "#fff" }}>
        Expenses
      </Link>
    </nav>
  );
}

export default Navbar;
