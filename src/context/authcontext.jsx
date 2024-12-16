import { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const navigate = useNavigate();

  const login = async (email, password) => {
    try {
      const response = await fetch("http://localhost:8000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();

      if (data.token) {
        setUser(data.user);
        setToken(data.token);
        localStorage.setItem("token", data.token);
        navigate("/");  
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };


  const register = async (username, email, password, address, phone) => {
    try {
      const response = await fetch("http://localhost:8000/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: username, email, password, address, phone }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Backend Error:", errorData);
        throw new Error(errorData.message || "Registration failed");
      }
  
      const data = await response.json();
      console.log("Registration Successful:", data);
  
      if (data.token) {
        setUser(data.user);
        setToken(data.token);
        localStorage.setItem("token", data.token);
        navigate("/");
      }
    } catch (error) {
      console.error("Error during registration:", error.message);
    }
  };
  
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
