import React from 'react';
import { useAuth } from '../../context/authcontext';
import { SignOut } from "@phosphor-icons/react";

const Sidebar = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  const isActive = (path) => {
    // ...existing code...
  };

  const menuItems = [
    // ...existing menu items...
    {
      label: "Logout",
      icon: <SignOut size={24} weight={isActive("/dashboard/logout") ? "fill" : "fill"} color={isActive("/dashboard/logout") ? "#023C48" : "#a9a9a9"} />,
      onClick: handleLogout,
    },
  ];

  return (
    <div className="sidebar">
      {menuItems.map((item, index) => (
        <div key={index} className="sidebar-item">
          <a
            href="#"
            onClick={item.onClick}
            className={`flex items-center gap-2 ${isActive("/dashboard/logout") ? "active" : ""}`}
          >
            {item.icon}
            <span>{item.label}</span>
          </a>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
