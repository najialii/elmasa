import { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [role, setRole] = useState(localStorage.getItem("role") || "user"); 
  const navigate = useNavigate();

  console.log("how to ", user)

  
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
      console.log(data);
  
      if (data.token) {
        setUser(data.user);
        setUser(data.name);
        setUser(data.user.email);
        setToken(data.token);
        setRole(data.user.role);
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.user.role);
  
      
        switch (data.user.role) {
          case "admin":
            navigate("/dashboard/chart");
            break;
  
          case "user":
            navigate("/");
            break;
  
          default:
            navigate("/");
            break;
        }
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
        setRole(data.user.role); 
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.user.role); 
        navigate("/");
      }
    } catch (error) {
      console.error("Error during registration:", error.message);
    }
  };



  
  const logout = () => {
    setUser(null);
    setToken(null);
    setRole("user"); 
    localStorage.removeItem("token");
    localStorage.removeItem("role"); 
    navigate("/login");
  };
  console.log("the user is",user)

  return (
    <AuthContext.Provider value={{ user, token, role, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
