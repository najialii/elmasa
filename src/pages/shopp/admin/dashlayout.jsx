import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { List,CookingPot, Files , ChartBar, SignOut  , PlusCircle, Warehouse, UserCircle, XCircle, Info,Truck , ClockCounterClockwise } from "@phosphor-icons/react";
import { useAuth } from "../../../context/authcontext";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const DashboardLayout = () => {
  const location = useLocation();
  const { role, user, token, logout } = useAuth();
  // console.log("user user iser",user)
  // console.log("token token token",token)
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  


    
      // useEffect(() => {
      //     const grtUserInfo = async () => {
  
  
  
  
      //         try {
      //           const response = await axios.post(`${API_BASE_URL}/order/${newStatus}/${orderId}`, {
      //             _id: orderId,
      //             status: newStatus,
      //           }, {
      //             headers: {
      //               'Content-Type': 'application/json',
      //               'Authorization': `Bearer ${token}`,
      //             },
      //           });
      //             const data = await response.json();
      //             console.log("Fetched categories:", data);
      //         } catch (error) {
      //             console.error("Error fetching categories:", error);
      //         }
      //     };
      //     grtUserInfo();
      // }, []); 

  const adminLinks = [
    // {
    //   to: "/dashboard/chart",
    //   label: "Overview",
    //   icon: <ChartBar  size={24} weight={isActive("/dashboard/cities") ? "fill" : "fill"} color={isActive("/dashboard/chart") ? "#023C48" : "#a9a9a9"} />,
    // },
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
    // {
    //   to: "/dashboard/storage",
    //   label: "Warehouse",
    //   icon: <Warehouse size={24}
    //   weight={isActive("/dashboard/storage") ? "fill" : "fill"} color={isActive("/dashboard/storage") ? "#023C48" : "#a9a9a9"} />,
    // },
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
      label: "Logout",
      icon: <SignOut size={24} />,
      onClick: () => logout(), 
    },

    

  ];

  const userLinks = [
    {
      to: "/dashboard/uprofile",
      label: "حسابي",
      icon: <Info size={32} weight={isActive("/dashboard/uprofile") ? "fill" : "fill"} color={isActive("/dashboard/uprofile") ? "#023C48" : "#a9a9a9"}  />,
    },
    {
      to: "/dashboard/uorders",
      label: "Orders ",
      icon: <ClockCounterClockwise size={32} weight={isActive("/dashboard/uorders") ? "fill" : "fill"} color={isActive("/dashboard/uorders") ? "#023C48" : "#a9a9a9"}  />,
    },
    {
    
      label: " logout",
      icon: <SignOut   size={24}  />,
      onClick: () => logout()
    },
    
    
  ];

  const links = role === "admin" ? adminLinks : userLinks;

  return (
    <div dir="" className="bg-white min-h-full">
      <div className="flex sm:flex sm:w-full sm:justify-center md:flex-row min-h-screen">

   
     

      
        <div className={`md:hidden fixed top-0 left-0 w-64 h-full bg-gray-50 shadow z-50 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300`}>
          <div className="flex justify-end">

        <button
          onClick={() => setSidebarOpen(!isSidebarOpen)}
          className="md:hidden  top-4 left-4 z-50 p-2  text-white mt-2"
          >
          { <XCircle size={32} weight="bold" color="#000" /> }
        </button>
          </div>
          <div className="p-6">
            <div className="flex gap-4 items-center mb-6">
              <UserCircle size={40} weight="fill" color="#000" />
              <div>
                <h2 className="text-lg font-semibold text-gray-800">{user?.name || "Admin"}</h2>
                <p className="text-sm text-gray-500">{user?.email || "user@example.com"}</p>
              </div>
            </div>
            <ul className="space-y-4">
              {links.map(({ to, label, icon, onClick }) =>
                onClick ? (
                  <li key={label}>
                    <button
                      className="flex gap-2 items-center px-4 py-2 rounded-lg w-full text-left bg-red-50 hover:bg-red-100 text-red-600"
                      onClick={onClick}
                    >
                      {icon}
                      {label}
                    </button>
                  </li>
                ) : (
                  <li key={to}>
                    <Link
                      to={to}
                      className={`block px-4 py-2 rounded-lg ${isActive(to) ? "bg-secondaryLight text-gray-800" : "hover:bg-gray-200 text-gray-700"}`}
                    >
                      <span className="flex gap-2 items-center">
                        {icon}
                        {label}
                      </span>
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        <aside className="hidden  lg:flex flex-col w-56 bg-gray-50 shadow h-screen">
          <div className="p-6">
            <div className="flex gap-4 items-center mb-6">
              <UserCircle size={40} weight="fill" color="#000" />
              <div>
                <h2 className="text-lg font-semibold text-gray-800">{user?.name || "Admin"}</h2>
                <p className="text-sm text-gray-500">{user?.email || "user@example.com"}</p>
              </div>
            </div>
            <ul className="space-y-4">
              {links.map(({ to, label, icon, onClick }) =>
                onClick ? (
                  <li key={label}>
                    <button
                      className="flex gap-2 items-center px-4 py-2 rounded-lg w-full text-left bg-red-50 hover:bg-red-100 text-red-600"
                      onClick={onClick}
                    >
                      {icon}
                      {label}
                    </button>
                  </li>
                ) : (
                  <li key={to}>
                    <Link
                      to={to}
                      className={`flex px-4 py-2 rounded-lg ${isActive(to) ? "bg-secondaryLight text-gray-800" : "hover:bg-gray-200 text-gray-700"}`}
                    >
                      <span className="flex gap-2 items-center">
                        {icon}
                        {label}
                      </span>
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>
        </aside>
        <nav className="fixed lg:hidden overflow-x-scroll bottom-0 left-0 w-full bg-white shadow-lg">
          <ul className="flex justify-around divide-x-2 mx-auto  items-center py-2">
            {links.map(({ to, label, icon, onClick }) =>
              onClick ? (
                <li key={label} className="text-center">
                  <button
                    className="flex flex-col w-32  items-center bg-red-400 pt-2s text-gray-600 hover:text-primary"
                    onClick={onClick}
                  >
                    {icon}
                    <span className="text-sm">{label}</span>
                  </button>
                </li>
              ) : (
                <li key={to} className="text-center w-32 ">
                  <Link
                    to={to}
                    className={`flex flex-col items-center ${
                      isActive(to) ? "text-primary" : "text-gray-600 hover:text-primary"
                    }`}
                  >
                    {icon}
                    <span className="text-sm">{label}</span>
                  </Link>
                </li>
              )
            )}
          </ul>
        </nav>
 
        <main className="flex-1 flex flex-col w-full p-4">
          <div className="mt-0 my-6">
          <button
          onClick={() => setSidebarOpen(!isSidebarOpen)}
          className="hidden  top-4 left-4 z-50 p-2 bg-primary text-white rounded-md shadow-md"
        >
          { <List size={28} weight="bold" /> }
        </button>
          </div>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
