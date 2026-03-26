import { createContext, useState } from "react";
import API from "../api/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (data) => {
    const res = await API.post("/auth/login/", data);

    localStorage.setItem("token", res.data.access);
    localStorage.setItem("role", res.data.user.role);

    setUser(res.data.user);
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const getRole = () => localStorage.getItem("role");