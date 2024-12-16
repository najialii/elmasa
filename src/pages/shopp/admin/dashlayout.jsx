import { Outlet, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { List, Eye,Warehouse } from "@phosphor-icons/react";

const DashboardLayout = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex min-h-screen bg-gray-100 rounded-r-xl">
      
      <aside className="w-64 bg-white shadow-lg">
        <div className="sticky top-0 flex flex-col items-center p-6">
      
          <div className="w-full bg-gradient-to-b pb-4 mb-6 border-b-2 border-gray-200">
            <h1 className="text-2xl font-bold text-primary text-center">
              Dashboard
            </h1>
          </div>

      
    
          <ul className="w-full space-y-4 text-lg">
            <li>
              <Link
                to="/dashboard/chart"
                className={`block w-full px-4 py-2 rounded-lg ${
                  isActive("/dashboard/chart") ? "bg-primary text-white" : "hover:bg-gray-200 text-gray-700"
                }`}
              >
                <span className="flex gap-2">
                <Eye size={32}
      color={isActive("/dashboard/chart") ? "#ffffff" : "#512f2f"} 
      />
                Overview
                </span>
              </Link>
            </li>
            <li>
            <Link
  to="/dashboard/orders"
  className={`block w-full px-4 py-2 rounded-lg ${
    isActive("/dashboard/orders") ? "bg-primary text-white" : "hover:bg-gray-200 text-gray-700"
  }`}
>
  <span className="flex gap-2">
    <List
      size={32}
      color={isActive("/dashboard/orders") ? "#ffffff" : "#512f2f"} 
    />
    Orders
  </span>
</Link>

            </li>
            <li>
              <Link
                to="/dashboard/storage"
                className={`block w-full px-4 py-2 rounded-lg ${
                  isActive("/dashboard/storage") ? "bg-primary text-white" : "hover:bg-gray-200 text-gray-700"
                }`}
              >
                <span className="flex gap-2">
                <Warehouse size={32} 
      color={isActive("/dashboard/storage") ? "#ffffff" : "#512f2f"} 
      />
                Warehouse
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/addproduct"
                className={`block w-full px-4 py-2 rounded-lg ${
                  isActive("/dashboard/addproduct") ? "bg-primary text-white" : "hover:bg-gray-200 text-gray-700"
                }`}
              >
                Settings
              </Link>
            </li>
          </ul>
        </div>
      </aside>

    

      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
