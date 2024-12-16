import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Ordersadmin = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [view, setView] = useState("viewOrders"); 
  const [selectedOrder, setSelectedOrder] = useState(null); 
  const [statusUpdateLoading, setStatusUpdateLoading] = useState(false);


  const isManagingStatus = view === "manageOrders";
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost/masa/api/content/items/orders?populate=*", {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setOrders(data);
        } else {
          throw new Error("Failed to fetch orders");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const updateOrderStatus = async (orderId, newStatus) => {
    setStatusUpdateLoading(true);
    try {
      const response = await fetch("http://localhost/masa/api/content/item/orders", {
        method: "POST",
        headers: {
          "api-key": "API-98177dc3e1ce2220c4228e1011caf2517191a287",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            _id: orderId,
            status: newStatus, 
          },
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.error || `Error: ${response.status}`);
      }
  
      const updatedOrder = await response.json();
  
      // Update local state
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
  
      toast.success("Order status updated successfully!");
    } catch (err) {
      console.error("Error updating order status:", err);
      toast.error(err.message || "Failed to update status");
    } finally {
      setStatusUpdateLoading(false);
    }
  };
  

  const closeModal = () => {
    setSelectedOrder(null);
  };

  return (
    <div className="admin-container p-6 max-w-7xl mx-auto ">
      <div className="flex justify-start">
      <h1 className="text-4xl font-semibold text-center mb-6 text-primary">
         Orders
      </h1>
      </div>

      <div className="flex justify-between mb-6">
        <button
          onClick={() => setView("viewOrders")}
          className={`px-4 py-2 rounded-md ${view === "viewOrders" ? "bg-primary text-white" : "bg-gray-100"}`}
        >
          View Orders
        </button>
        <button
          onClick={() => setView("manageOrders")}
          className={`px-4 py-2 rounded-md ${view === "manageOrders" ? "bg-primary text-white" : "bg-gray-100"}`}
        >
          Manage Orders
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      
      {view === "viewOrders" && (
  <div className="overflow-x-auto rounded-lg shadow-lg">
    <table className="min-w-full table-auto border-collapse border border-gray-300">
      <thead className="bg-primary text-white">
        <tr>
          <th className="border px-6 py-3 text-left font-semibold">Order ID</th>
          <th className="border px-6 py-3 text-left font-semibold">Customer Name</th>
          <th className="border px-6 py-3 text-left font-semibold">Total</th>
          <th className="border px-6 py-3 text-left font-semibold">Items</th>
          <th className="border px-6 py-3 text-left font-semibold">Action</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order, index) => (
          <React.Fragment key={order._id}>
            <tr className="hover:bg-gray-50 transition-colors duration-200">
              <td className="border px-6 py-4 text-sm font-medium text-gray-700">
                {order._id}
              </td>
              <td className="border px-6 py-4 text-sm font-medium text-gray-700">
                {order.customername}
              </td>
              <td className="border px-6 py-4 text-sm font-medium text-gray-700">
                ${order.total}
              </td>
              <td className="border px-6 py-4 text-sm font-medium text-gray-700">
                {order.items && order.items.length > 0 ? (
                  <button
                    onClick={() =>
                      setOrders((prevOrders) =>
                        prevOrders.map((o, i) =>
                          i === index ? { ...o, isExpanded: !o.isExpanded } : o
                        )
                      )
                    }
                    className="text-primary  underline"
                  >
                    {order.isExpanded
                      ? "Hide Items"
                      : `View Items (${order.items.length})`}
                  </button>
                ) : (
                  <span className="text-red-500">No items</span>
                )}
              </td>
              <td className="border px-6 py-4 text-sm font-medium">
                <button
                  className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                  onClick={() => setSelectedOrder(order)}
                >
                  View
                </button>
              </td>
            </tr>
            {order.isExpanded && order.items && order.items.length > 0 && (
              <tr className="bg-gray-50">
                <td colSpan={5} className="px-6 py-4">
                  <ul className="space-y-2">
                    {order.items.map((item) => (
                      <li
                        key={item.id}
                        className="flex justify-between items-center border-b pb-2 last:border-none last:pb-0 text-sm text-gray-700"
                      >
                         <img
                    src={`http://localhost/masa/storage/uploads${item.image}`}
                    alt={item.title}
                    className="h-16 w-16 object-cover rounded-md"
                  />
                        <div className="px-20 items-center flex gap-2
                        flex-col">

                        <p className="font-medium">
                          <span className="text-gray-500"></span> {item.name}
                        </p>
                        <p>
                          <span className="text-gray-500"></span>{" "}
                          EGP {item.price || "N/A"}
                        </p>
                        <p>
                          <span className="text-gray-500"></span>{" "}
                          {item.category?._model || "N/A"}
                        </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            )}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  </div>
)}


      {/* Manage Orders Section */}
      {view === "manageOrders" && (
        <div className="overflow-x-auto rounded-lg shadow-lg">
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead className="bg-primary text-white">
              <tr>
                <th className="border px-6 py-3 text-left font-semibold">Order ID</th>
                <th className="border px-6 py-3 text-left font-semibold">Customer Name</th>
                <th className="border px-6 py-3 text-left font-semibold">Total</th>
                <th className="border px-6 py-3 text-left font-semibold">Status</th>
                <th className="border px-6 py-3 text-left font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="border px-6 py-4 text-sm font-medium text-gray-700">{order._id}</td>
                  <td className="border px-6 py-4 text-sm font-medium text-gray-700">{order.customername}</td>
                  <td className="border px-6 py-4 text-sm font-medium text-gray-700">${order.total}</td>
                  <td className="border px-6 py-4 text-sm font-medium text-gray-700">
                    <select
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                      className="p-2 rounded-md bg-gray-100"
                    >
                      <option value="Paid">Paid</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Return">Return</option>
                    </select>
                  </td>
                  <td className="border px-6 py-4 text-sm text-primary">
                    <button
                      className="bg-primary text-white px-4 py-2 rounded-lg"
                      onClick={() => setSelectedOrder(order)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      
      {selectedOrder && (
  <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
    <div className="bg-gradient-to-b from-blue-100 to-white p-6 rounded-lg max-w-lg w-full shadow-xl overflow-y-auto max-h-[90vh]">
      <h2 className="text-2xl font-semibold mb-6 text-center text-primary">Order Details</h2>

      <div className="space-y-4">
        <div className="flex justify-between">
          <p className="font-medium"><strong>Order ID:</strong></p>
          <p>{selectedOrder._id}</p>
        </div>
        <div className="flex justify-between">
          <p className="font-medium"><strong>Customer Name:</strong></p>
          <p>{selectedOrder.customername}</p>
        </div>
        <div className="flex gap-2 justify-between">
          <p className="font-medium"><strong>Phone number:</strong></p>
          <p className="">{selectedOrder.customernum}</p>
        </div>
        <div className="flex gap-10 justify-between">
          <p className="font-medium"><strong>Adress:</strong></p>
          <p className="text-balance">{selectedOrder.customeraddress}</p>
        </div>
 <div>
  {selectedOrder.items && selectedOrder.items.length > 0 ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-x-auto">
      {selectedOrder.items.map((item) => (
        <div key={item.id} className="p-4 border rounded-lg shadow-sm">
 <img
                    src={`http://localhost/masa/storage/uploads${item.image}`}
                    alt={item.title}
                    className="h-16 w-16 object-cover rounded-md"
                  />
          <h3 className="text-lg font-semibold mt-2">{item.name}</h3>
          <p className="text-sm text-gray-500">EGP{item.price}</p>
        </div>
      ))}
    </div>
  ) : (
    <span className="text-red-500">No items</span>
  )}
</div>

<div className="flex justify-between">
          <p className="font-medium"><strong>Total:</strong></p>
          <p className="text-2xl font-bold text-primary">${selectedOrder.total}</p>
        </div>

        {isManagingStatus && (
          <div className="flex justify-between">
            <p className="font-medium"><strong>Status:</strong></p>
            <p>{selectedOrder.status}</p>
          </div>
        )}
      </div>

      {isManagingStatus && (
        <div className="mt-6">
          <label className="block font-medium mb-2">Update Status:</label>
          <select
            value={selectedOrder.status}
            onChange={(e) => setSelectedOrder({ ...selectedOrder, status: e.target.value })}
            className="p-2 w-full rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="paid">paid</option>
            <option value="delivered">delivered</option>
            <option value="return">return</option>
          </select>
        </div>
      )}

      <div className="mt-6 flex justify-between space-x-4">
        <button
          className="px-4 py-2 bg-red-500 text-white rounded-lg w-full md:w-auto"
          onClick={closeModal}
        >
          Close
        </button>
        {isManagingStatus && (
          <button
            className="px-4 py-2 bg-green-500 text-white rounded-lg w-full md:w-auto"
            onClick={() => updateOrderStatus(selectedOrder._id, selectedOrder.status)}
            disabled={statusUpdateLoading}
          >
            {statusUpdateLoading ? "Updating..." : "Update Status"}
          </button>
        )}
      </div>
    </div>
  </div>
)}

      <ToastContainer />
    </div>
  );
};

export default Ordersadmin;
