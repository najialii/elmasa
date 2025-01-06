import axios from "axios";
import { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [role, setRole] = useState(localStorage.getItem("role") || "user"); 
  const navigate = useNavigate();



  
  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/user/login`, {
        email,
        password,
      }, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      const data = response.data;
      console.log(data);
  
      if (data.token) {
        setUser(data.user);
        setToken(data.token);
        setRole(data.user.role);
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.user.role);
  

        switch (data.user.role) {
          case "admin":
            navigate("/dashboard/chart");
            break;
          case "user":
            navigate("/home");
            break;
          default:
            navigate("/home");
            break;
        }
      }
    } catch (error) {
      console.error("Error during login:", error.response?.data || error.message);
    }
  };
  
  const register = async (username, email, password, address, phone) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/user/register`, {
        name: username,
        email,
        password,
        address,
        phone,
      }, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      const data = response.data; 
      console.log("Registration Successful:", data);
  
      if (data.token) {
        setUser(data.user);
        setToken(data.token);
        setRole(data.user.role);
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.user.role);
        navigate("/");
      }
    } catch (error) {
      console.error("Error during registration:", error.response?.data || error.message);
    }
  };
  


  
  const logout = async () => {
    try {
      if (token) {
        await axios.post(
          `${API_BASE_URL}/user/logout`, // Ensure this matches your backend endpoint
          {}, // Pass an empty body if required
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }
      console.log("Logout successful");
    } catch (error) {
      console.error("Error during logout:", error.response?.data || error.message);
    } finally {
      // Clear client-side data and navigate to login page
      setUser(null);
      setToken(null);
      setRole("user");
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      navigate("/login");
    }
  };
  
  

  return (
    <AuthContext.Provider value={{ user, token, role, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
