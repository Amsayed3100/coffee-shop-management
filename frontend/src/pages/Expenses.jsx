import React, { useEffect, useState } from "react";
import api from "../api/axios";

function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    title: "",
    category: "Other",
    amount: "",
    expense_date: "",
    note: "",
  });

  const fetchExpenses = async () => {
    try {
      const response = await api.get("/expenses/");
      setExpenses(response.data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/expenses/", {
        ...formData,
        amount: parseFloat(formData.amount),
      });

      setFormData({
        title: "",
        category: "Other",
        amount: "",
        expense_date: "",
        note: "",
      });

      fetchExpenses();
    } catch (error) {
      console.error("Error adding expense:", error);
      alert("Failed to add expense");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Expenses</h1>

      <h2>Add Expense</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: "30px" }}>
        <div style={{ marginBottom: "10px" }}>
          <input
            type="text"
            name="title"
            placeholder="Expense Title"
            value={formData.title}
            onChange={handleChange}
            required
            style={{ padding: "8px", width: "300px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            style={{ padding: "8px", width: "300px" }}
          >
            <option value="Rent">Rent</option>
            <option value="Electricity">Electricity</option>
            <option value="Salary">Salary</option>
            <option value="Maintenance">Maintenance</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={formData.amount}
            onChange={handleChange}
            required
            style={{ padding: "8px", width: "300px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <input
            type="date"
            name="expense_date"
            value={formData.expense_date}
            onChange={handleChange}
            required
            style={{ padding: "8px", width: "300px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <textarea
            name="note"
            placeholder="Note"
            value={formData.note}
            onChange={handleChange}
            style={{ padding: "8px", width: "300px", height: "80px" }}
          />
        </div>

        <button type="submit" style={{ padding: "10px 20px" }}>
          Add Expense
        </button>
      </form>

      <h2>Expense List</h2>

      {loading ? (
        <p>Loading expenses...</p>
      ) : expenses.length === 0 ? (
        <p>No expenses found.</p>
      ) : (
        <table border="1" cellPadding="10" style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Expense Date</th>
              <th>Note</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.id}>
                <td>{expense.id}</td>
                <td>{expense.title}</td>
                <td>{expense.category}</td>
                <td>{expense.amount}</td>
                <td>{expense.expense_date}</td>
                <td>{expense.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Expenses;