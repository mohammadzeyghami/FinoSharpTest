// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  // Function to log in
  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post("/api/login", { email, password });
      const { accessToken } = response.data;
      localStorage.setItem("accessToken", accessToken);
      setUser({ email }); // Set user info
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  // Function to log out
  const logout = () => {
    localStorage.removeItem("accessToken");
    setUser(null);
    delete axios.defaults.headers.common["Authorization"];
  };

  // Function to check if the user is authenticated
  const isAuthenticated = () => !!localStorage.getItem("accessToken");

  // Automatically load the user if the token exists
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setUser({ email: "dummy@example.com" }); // Replace with actual user data
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      // @ts-ignore
      value={{ user, login, logout, isAuthenticated, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
