import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { List,CookingPot , ChartBar , PlusCircle, Warehouse, UserCircle, DotsThreeOutlineVertical, XCircle, Info,Truck , ClockCounterClockwise } from "@phosphor-icons/react";
import { useAuth } from "../../../context/authcontext";
import { useState, useEffect } from "react";

const DashboardLayout = () => {
  const location = useLocation();
  const { role, user, token } = useAuth();
  console.log("user user iser",user)
  console.log("token token token",token)
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const adminLinks = [
    {
      to: "/dashboard/chart",
      label: "Overview",
      icon: <ChartBar  size={24} weight={isActive("/dashboard/cities") ? "fill" : "light"} color={isActive("/dashboard/chart") ? "#ffffff" : "#512f2f"} />,
    },
    {
      to: "/dashboard/orders",
      label: "Orders",
      icon: <List size={24} weight={isActive("/dashboard/cities") ? "fill" : "light"} color={isActive("/dashboard/orders") ? "#ffffff" : "#512f2f"} />,
    },
    {
      to: "/dashboard/catogeryadd",
      label: "catoegry",
      icon: <Warehouse size={24}
      weight={isActive("/dashboard/catogeryadd") ? "fill" : "light"} color={isActive("/dashboard/storage") ? "#ffffff" : "#512f2f"} />,
    },
    {
      to: "/dashboard/storage",
      label: "Warehouse",
      icon: <Warehouse size={24}
      weight={isActive("/dashboard/cities") ? "fill" : "light"} color={isActive("/dashboard/storage") ? "#ffffff" : "#512f2f"} />,
    },
    {
      to: "/dashboard/addproduct",
      label: "Add Product",
      icon: <PlusCircle size={24} weight={isActive("/dashboard/cities") ? "fill" : "light"} color={isActive("/dashboard/addproduct") ? "#ffffff" : "#512f2f"} />,
    },
    {
      to: "/dashboard/addrecipe",
      label: " recipies",
      icon: <CookingPot  size={24} weight={isActive("/dashboard/cities") ? "fill" : "light"} color={isActive("/dashboard/addrecipe") ? "#ffffff" : "#512f2f"} />,
    },
    {
      to: "/dashboard/brands  ",
      label: " brand",
      icon: <PlusCircle size={24}  weight={isActive("/dashboard/cities") ? "fill" : "light"} color={isActive("/dashboard/brands") ? "#ffffff" : "#512f2f"} />,
    },
    {
      to: "/dashboard/cities",
      label: " city",
      icon: <Truck  size={24} weight={isActive("/dashboard/cities") ? "fill" : "light"} color={isActive("/dashboard/cities") ? "#ffffff" : "#214C4F"} />,
    },

  ];

  const userLinks = [
    {
      to: "/dashboard/uprofile",
      label: "Personal Information",
      icon: <Info size={32} weight="fill" />,
    },
    {
      to: "/dashboard/uorders",
      label: "Orders History",
      icon: <ClockCounterClockwise size={32} weight="fill" />,
    },
  ];

  const links = role === "admin" ? adminLinks : userLinks;

  return (
    <div className="bg-white min-h-full my-20 mx-20">
      <div className="flex flex-col md:flex-row">
        
        <aside
          className={`sticky top-0 left-0 h-screen bg-white shadow-lg z-50 transition-transform duration-300 ease-in-out transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 md:w-64 md:flex md:flex-shrink-0`}
        >
          <div className="flex flex-col items-center p-6 mb-6">
          

            <div className="flex gap-4 items-center mb-6">
              <UserCircle size={32} weight="fill" color="#027384" />
              <div>

              <h2 className="text-lg font-semibold">{user?.name}</h2>
              <p className="text-primary">{user?.email || "user@example.com"}</p>
              </div>
            </div>

            <ul className="w-full space-y-4 my-8">
              {links.map(({ to, label, icon }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className={`block w-full px-4 py-2 rounded-lg ${
                      isActive(to) ? "bg-primary text-white" : "hover:bg-gray-200 text-gray-700"
                    }`}
                    onClick={() => setSidebarOpen(false)}
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

        <main className="flex-1 p-4">
          <button
            className="md:hidden fixed top-4 left-4 z-50 p-2 bg-primary text-white rounded-full shadow-md"
            onClick={() => setSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? <XCircle size={32} weight="fill" /> : <DotsThreeOutlineVertical size={32} weight="fill" />}
          </button>

          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
