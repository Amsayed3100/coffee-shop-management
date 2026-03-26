import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Login = () => {

  const { login } = useContext(AuthContext);

  const [form, setForm] = useState({
    username: "",
    password: ""
  });

  const submit = async (e) => {
    e.preventDefault();
    await login(form);
    window.location.href = "/";
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 col-md-4 mx-auto">
        <h3 className="text-center">☕ Login</h3>

        <input className="form-control my-2"
          placeholder="Username"
          onChange={(e)=>setForm({...form, username:e.target.value})}
        />

        <input type="password" className="form-control my-2"
          placeholder="Password"
          onChange={(e)=>setForm({...form, password:e.target.value})}
        />

        <button className="btn btn-primary w-100 mt-2" onClick={submit}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;