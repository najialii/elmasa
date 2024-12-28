import React, { useState, useEffect,useContext } from "react";
import axios from "axios";
import { useAuth } from "../../../context/authcontext";
const Userorders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 const {token} = useAuth();
 console.log("token from orders",token)
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        
        const response = await axios.get("http://localhost:8000/api/order/list", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("API Response:", response.data); 

        const ordersData = response.data?.data || response.data;
                if (Array.isArray(ordersData)) {
          setOrders(ordersData);
        } else {
          setOrders([]);
          setError("Invalid response format");
        }
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Failed to fetch orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div className="h-screen flex items-center justify-center">Loading...</div>;
  }

  if (error) {
    return <div className="h-screen flex items-center justify-center text-red-500">{error}</div>;
  }

  return (
    <div className="h-screen p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Your Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="grid gap-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="p-4 border border-gray-300 rounded-lg shadow-sm bg-white"
            >
              <h2 className="text-lg font-semibold">Order ID: {order.id}</h2>
              <p>
                <strong>Status:</strong> {order.status}
              </p>
              <p>
                <strong>Total:</strong> ${order.total}
              </p>
              <p>
                <strong>Date:</strong> {new Date(order.created_at).toLocaleDateString()}
              </p>
              <div>
                <strong>Items:</strong>
                <ul className="list-disc pl-4">
                  {order.items?.map((item) => (
                    <li key={item.id}>
                      {item.name} - {item.quantity} x ${item.price}
                    </li>
                  )) || <li>No items found.</li>}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Userorders;
