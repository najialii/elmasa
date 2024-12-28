import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useAuth } from "../../../context/authcontext";
import { data } from "react-router-dom";
import { DotsThreeVertical, SealCheck, HourglassMedium, HandCoins   } from "@phosphor-icons/react";
const Ordersadmin = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [view, setView] = useState("viewOrders");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [statusUpdateLoading, setStatusUpdateLoading] = useState(false);
  const [currentpage, setCurrentPage] = useState(1)
  const [links , setLinks] = useState([])
  const {token} = useAuth()
 
  
console.log("the orders", orders)  
  const isManagingStatus = view === "manageOrders";

  const handelNextPage =()=>{
    setCurrentPage((prevPage)=> prevPage + 1) 
  
  }
  const handelprevPage =()=>{
    setCurrentPage((prevPage)=> prevPage - 1) 
    
  }

  useEffect(() => {
    const fetchOrders = async () => {

      try {
        const response = await fetch(`http://localhost:8000/api/orders/list?page=${currentpage}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const result = await response.json();
          console.log(result)
          if (result && result.data && Array.isArray(result.data.data)) {
            setOrders(result.data.data);
          } else {
            setErrorMessage("Failed to fetch orders.");
          }
        } else {
          const errorMessage = await response.text();
          setErrorMessage("Failed to fetch orders");
          toast.error("🦄 " + errorMessage, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
          });
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
        setErrorMessage("An error occurred while fetching the orders.");
      }
    };

    fetchOrders();
  }, [currentpage]);

  if(data.length === 0){  
    console.log("nbasasdajfosh")  
  }

  const updateOrderStatus = async (orderId, newStatus) => {
    setStatusUpdateLoading(true);
    try {
      const response = await axios.post('http://localhost:8000/api/order/update', {
        data: {
          _id: orderId,
          status: newStatus,
        },
      });
      console.log("the response",response)

      if (response.status === 200) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === orderId ? { ...order, status: newStatus } : order
          )
        );
        toast.success("Order status updated successfully!");
      } else {
        throw new Error("Failed to update order status");
      }
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
      {/* <div className="flex justify-start">
        <h1 className="text-4xl font-semibold text-center mb-6 text-primary">
          Orders
        </h1>
      </div> */}

      {/* <div className="flex justify-between mb-6">
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
      </div> */}
      <div>
        <form className=" flex gap-4 items-center my-10" action="">
        
          <input type="text" 
          placeholder="search "
                        className="shadow bg-gray-100 focus:bg-white appearance-none border rounded w-56 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-secondaryLight focus:shadow-xl transition-all duration-300 ease-in-out"
           />

           <div>
            <button className="bg-primary text-white p-2 rounded-md">
            search
            </button>
           </div>
        </form>
      </div>
      {/* {loading && <p>Loading...</p>} */}
      {error && <p className="text-red-500">{error}</p>}

      {view === "viewOrders" && (
        <div className="overflow-x-scroll max-h-[450px] rounded-lg shadow-lg">
          <table className="min-w-full  table-auto border-collapse border border-gray-300">
            <thead className="bg-gray-100 sticky top-0 text-gray-800 text-sm">
              <tr>
                <th className="border px-6 py-3 text-left ">Date</th>
                <th className="border px-6 py-3 text-left "> Name</th>
                <th className="border px-6 py-3 text-left ">Total</th>
                <th className="border px-6 py-3 text-left ">city</th>
                <th className="border px-6 py-3 text-left ">Status</th>
                <th className="border px-6 py-3 text-left ">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders&&orders.map((order) => (
                <React.Fragment key={order.id}>
                  <tr className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="border px-6 py-4 text-sm font-medium text-gray-700">
  {new Date(order.created_at).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true, // Optional, shows 12-hour clock with AM/PM
  })}
</td>                    <td className="border px-6 py-4 text-sm font-medium text-gray-700">{order.user.name}</td>
                    <td className="border px-6 py-4 text-sm font-medium text-gray-700">${order.total_price}</td>
                    <td className="border px-6 py-4 text-sm font-medium text-gray-700">${order.city.name}</td>
                    {/* <td className="border px-6 py-4 text-sm font-medium text-gray-700">
          {order.items && order.items.length > 0 ? (
            <button
              onClick={() =>
                setOrders((prevOrders) =>
                  prevOrders.map((o) =>
                    o.id === order.id ? { ...o, isExpanded: !o.isExpanded } : o
                  )
                )
              }
              className="text-primary underline"
            >
              {order.isExpanded ? "Hide Items" : `View Items (${order.items.length})`}
            </button>
          ) : (
            <span className="text-red-500">No items</span>
          )}
        </td> */}
        <td>
    <select
  value={order.status}
  onChange={(e) => updateOrderStatus(order.id, e.target.value)}
  className={`p-2 rounded-md bg-gray-100 
    ${order.status === "Paid" ? "text-green-500" : ""}
    ${order.status === "delivered" ? "text-orange-500" : ""}`}
>
  <option value="Paid">Paid</option>
  <option value="delivered">Delivered</option>
</select>

                 
        </td>
                    <td className="border px-6 py-4 text-sm font-medium">
                      <button
                        className=" flex justify-center items-center"
                        onClick={() => setSelectedOrder(order)}
                      >
                   <DotsThreeVertical size={18} />
                      </button>
                    </td>
                  </tr>
                  {order.isExpanded && order.items && order.items.length > 0 && (
                    <tr className="bg-gray-50">
                      <td colSpan={5} className="px-6 py-4">
                        <ul className="space-y-2">
                          {order.items.map((item) => (
                            <li key={item.id} className="flex justify-between items-center border-b pb-2 last:border-none last:pb-0 text-sm text-gray-700">
                              <img
                                src={item.image}
                                alt={item.title}
                                className="h-16 w-16 object-cover rounded-md"
                              />
                              <div className="px-20 items-center flex gap-2 flex-col">
                                <p className="font-medium">{item.product.name}</p>
                                <p>EGP {item.price || "N/A"}</p>
                                {/* <p>{city.name || "N/A"}</p> */}
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
            <div className="flex gap-2 justify-center  bg-white-100">
              <div className="my-2">
             
              <button className="bg-gray-200 rounded-l-full p-2" onClick={handelprevPage}>prev</button>
              {/* <div className="flex items-center justify-center space-x-2 mt-4">
      {links.map((link, index) => (
        <button
          key={index}
          onClick={() => link.url && onPageChange(link.url)}
          className={`px-3 py-2 rounded-md ${
            link.active
              ? "bg-primary text-white font-bold"
              : "bg-gray-200 text-gray-700"
          } ${!link.url && "cursor-not-allowed opacity-50"}`}
          dangerouslySetInnerHTML={{ __html: link.label }} // Render HTML labels like "&laquo;"
        ></button>
      ))}
    </div> */}
              <button className="bg-gray-200 rounded-r-full p-2" onClick={handelNextPage}>next</button>
              </div>
            </div>
<div>
  
</div>
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
                <th className="border px-6 py-3 text-left font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="border px-6 py-4 text-sm font-medium text-gray-700">{order.order_number}</td>
                  <td className="border px-6 py-4 text-sm font-medium text-gray-700">{order.customername}</td>
                  <td className="border px-6 py-4 text-sm font-medium text-gray-700">${order.total_price}</td>
                  <td className="border px-6 py-4 text-sm font-medium text-gray-700">
                    <select
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                      className="p-2 rounded-md bg-gray-100"
                    >
                      <option value="Paid">Paid</option>
                      <option value="delivered">Delivered</option>
                      
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
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg">
            <div className="flex justify-between items-center">

            <h2 className="text-xl font-semibold">Order Details</h2>
            <p className="flex flex-col">

            <span
  className={`flex items-center px-2 py-1 rounded-md ${
    selectedOrder.status === "paid"
      ? "bg-orange-500 text-white"
      : selectedOrder.status === "delivered"
      ? "bg-green-500 text-white"
      : "bg-gray-200 text-gray-700"
  }`}
>
  {selectedOrder.status === "delivered" && (
    <SealCheck size={20} className="mr-2" />
  )}
  {selectedOrder.status === "paid" && (
    <HandCoins   size={20} className="mr-2" />
  )}
  {selectedOrder.status === "initiated" && (
    <HourglassMedium size={20} className="mr-2" />
  )}
  <span className="font-black">{selectedOrder.status}</span>
</span>

</p>
      </div>
            <div className="mt-4 flex flex-col justify-center">
              <div className="grid grid-cols-2 justify-center items-center gap-4">

              <p className="flex flex-col text-sm"><strong>Order Number:</strong> {selectedOrder.order_number}</p>
              <p className="flex flex-col text-sm"><strong>Phone Number:</strong> {selectedOrder.phone}</p>
              <p className="flex flex-col text-sm"><strong>Customer Name:</strong> {selectedOrder.user.name}</p>
              <p className="flex flex-col text-sm"><strong>city:</strong> ${selectedOrder.city.name}</p>


              {/* <p className="flex flex-col"><strong>Total:</strong> ${selectedOrder.total_price}</p> */}
              </div>
              <div className="flex flex-col mt-4">
  <div>
    <h3 className="text-lg font-semibold mb-4">Items</h3>
  </div>
  {selectedOrder && selectedOrder.items && selectedOrder.items.length > 0 ? (
    <ul className="overflow-y-scroll max-h-64 mt-4 w-full space-y-4">
      {selectedOrder.items.map((item) => (
        <li 
          key={item.id} 
          className="flex items-center gap-4 p-2 bg-gray-100 rounded-md shadow-sm"
        >
          {/* <div>
            <img
              src={item.image}
              alt={item.title}
              className="h-12 w-12 object-cover rounded-md"
            />
          </div> */}
          <div className="flex-1">
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-800">{item.product.name}</span>
              <span className="text-sm text-gray-600">Qty: {item.qty}</span>
            </div>
            <div className="flex justify-between items-center mt-1">
              {/* Uncomment the following line if you want to display the price */}
              {/* <span className="text-sm text-gray-600">Price: ${item.price}</span> */}
              <span className="font-semibold text-gray-800">
                Total: ${item.qty * item.price}
              </span>
            </div>
          </div>
        </li>
      ))}
    </ul>
  ) : (
    <p className="text-gray-600 mt-4">No items found for this order.</p>
  )}
</div>

              
                <button
                className="mt-4 px-4 py-2 rounded-md bg-gray-500 text-white"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default Ordersadmin;
