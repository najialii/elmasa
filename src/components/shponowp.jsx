import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { ShoppingBag } from "@phosphor-icons/react";

const ShopNowPanel = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Hide the component on the /shop route
  if (location.pathname === '/shop') {
    return null;
  }

  return (
    <div>
      <button
        onClick={() => navigate('/shop')}
        className="fixed top-1/2 h-16 w-52 right-0 transform -translate-y-1/2 bg-primary text-white py-2 px-4 rounded-tl-xl shadow-lg shadow-primary transition z-50"
      >
        <span className="flex gap-2 items-center">
          <ShoppingBag size={28} /> Shop Now
        </span>
      </button>
    </div>
  );
};

export default ShopNowPanel;
