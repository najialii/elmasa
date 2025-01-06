import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { List,CookingPot, Files , ChartBar, SignOut  , PlusCircle, Warehouse, UserCircle, DotsThreeOutlineVertical, XCircle, Info,Truck , ClockCounterClockwise } from "@phosphor-icons/react";
import { useAuth } from "../../../context/authcontext";
import { useState, useEffect } from "react";
import axios from "axios";


const DashboardLayout = () => {
  const location = useLocation();
  const { role, user, token, logout } = useAuth();
  console.log("user user iser",user)
  console.log("token token token",token)
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/user/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        logout();
        navigate("/login");
      } else {
        throw new Error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
      alert("Failed to log out. Please try again.");
    }
  };
  
      useEffect(() => {
          const grtUserInfo = async () => {
  
  
  
  
              try {
                const response = await axios.post(`http://localhost:8000/api/order/${newStatus}/${orderId}`, {
                  _id: orderId,
                  status: newStatus,
                }, {
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                  },
                });
                  const data = await response.json();
                  console.log("Fetched categories:", data);
              } catch (error) {
                  console.error("Error fetching categories:", error);
              }
          };
          grtUserInfo();
      }, []); 

  const adminLinks = [
    {
      to: "/dashboard/chart",
      label: "Overview",
      icon: <ChartBar  size={24} weight={isActive("/dashboard/cities") ? "fill" : "fill"} color={isActive("/dashboard/chart") ? "#023C48" : "#a9a9a9"} />,
    },
    {
      to: "/dashboard/orders",
      label: "Orders",
      icon: <List size={24} weight={isActive("/dashboard/cities") ? "fill" : "fill"} color={isActive("/dashboard/orders") ? "#023C48" : "#a9a9a9"} />,
    },
    {
      to: "/dashboard/catogeryadd",
      label: "Category",
      icon: <Warehouse size={24}
      weight={isActive("/dashboard/catogeryadd") ? "fill" : "fill"} color={isActive("/dashboard/catogeryadd") ? "#023C48" : "#a9a9a9"} />,
    },
    {
      to: "/dashboard/storage",
      label: "Warehouse",
      icon: <Warehouse size={24}
      weight={isActive("/dashboard/storage") ? "fill" : "fill"} color={isActive("/dashboard/storage") ? "#023C48" : "#a9a9a9"} />,
    },
    {
      to: "/dashboard/addproduct",
      label: "Add Product",
      icon: <PlusCircle size={24} weight={isActive("/dashboard/cities") ? "fill" : "fill"} color={isActive("/dashboard/addproduct") ? "#023C48" : "#a9a9a9"} />,
    },
    {
      to: "/dashboard/addrecipe",
      label: " recipies",
      icon: <CookingPot  size={24} weight={isActive("/dashboard/cities") ? "fill" : "fill"} color={isActive("/dashboard/addrecipe") ? "#023C48" : "#a9a9a9"} />,
    },
    {
      to: "/dashboard/brands  ",
      label: " brand",
      icon: <PlusCircle size={24}  weight={isActive("/dashboard/cities") ? "fill" : "fill"} color={isActive("/dashboard/brands") ? "#023C48" : "#a9a9a9"} />,
    },
    {
      to: "/dashboard/cities",
      label: " city",
      icon: <Truck  size={24} weight={isActive("/dashboard/cities") ? "fill" : "fill"} color={isActive("/dashboard/cities") ? "#023C48" : "#a9a9a9"} />,
    },
    {
      to: "/dashboard/reports",
      label: " Reports",
      icon: <Files   size={24} weight={isActive("/dashboard/reports") ? "fill" : "fill"} color={isActive("/dashboard/reports ") ? "#023C48" : "#a9a9a9"} />,
    },
    {
       
      label: " logout",
      icon: <SignOut   size={24} weight={isActive("/dashboard/cities") ? "fill" : "fill"} color={isActive("/dashboard/cities") ? "#023C48" : "#a9a9a9"} />,
      onClick: () => {
        handleLogout();
      },
    },

  ];

  const userLinks = [
    {
      to: "/dashboard/uprofile",
      label: "Personal Information",
      icon: <Info size={32} weight={isActive("/dashboard/uprofile") ? "fill" : "fill"} color={isActive("/dashboard/uprofile") ? "#023C48" : "#a9a9a9"}  />,
    },
    {
      to: "/dashboard/uorders",
      label: "Orders ",
      icon: <ClockCounterClockwise size={32} weight={isActive("/dashboard/uorders") ? "fill" : "fill"} color={isActive("/dashboard/uorders") ? "#023C48" : "#a9a9a9"}  />,
    },
    {
    
      label: " logout",
      icon: <SignOut   size={24} weight={isActive("/dashboard/cities") ? "fill" : "fill"} color={isActive("/dashboard/cities") ? "#023C48" : "#a9a9a9"} />,
      onClick: () => {
        handleLogout();
      },
    },
    
    
  ];

  const links = role === "admin" ? adminLinks : userLinks;

  return (
    <div className="bg-white min-h-full ">
      <div className="flex sm:flex sm:w-full sm:justify-center md:flex-row min-h-screen">
      <div className="md:hidden fixed mt-12 top-0 left-0 w-full bg-gray-50 shadow z-50 overflow-x-scroll flex gap-4 px-4 py-2 animate-marquee">
  {links.map(({ to, label, icon }) => (
    <Link
      key={to}
      to={to}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
        isActive(to) ? "bg-secondaryLight text-gray-800" : "hover:bg-gray-200 text-gray-700"
      }`}
    >
      {icon}
      <span className="text-sm">{label}</span>
    </Link>
  ))}
</div>


        <aside className="hidden md:flex flex-col w-56 bg-gray-50 shadow h-screen">
          <div className="p-6">
            <div className="flex gap-4 items-center mb-6">
              <UserCircle size={40} weight="fill" color="#000" />
              <div>
                <h2 className="text-lg font-semibold text-gray-800">{user?.name || "Admin"}</h2>
                <p className="text-sm text-gray-500">{user?.email || "user@example.com"}</p>
              </div>
            </div>
            <ul className="space-y-4">
              {links.map(({ to, label, icon }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className={`block px-4 py-2 rounded-lg ${
                      isActive(to) ? "bg-secondaryLight text-gray-800" : "hover:bg-gray-200 text-gray-700"
                    }`}
                  >
                    <span className="flex gap-2 items-center">
                      {icon}
                      {label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <main className="flex-1 flex flex-col w-full p-4">
          {/* <button
            className="md:hidden fixed top-4 left-4 z-50 p-2 bg-primary text-white rounded-full shadow-md"
            onClick={() => setSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? <XCircle size={32} weight="fill" /> : <DotsThreeOutlineVertical size={32} weight="fill" />}
          </button> */}

          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
