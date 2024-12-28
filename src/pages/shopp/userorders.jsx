import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/authcontext"; 
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { EyeClosed, ArrowLeft , ArrowRight } from "@phosphor-icons/react";

export default function OrderHistory() {
  const { user } = useAuth();  
  const [orders, setOrders] = useState([]); 
  const [errorMessage, setErrorMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [currentpage, setCurrentPage] = useState(1)
  const [disabledButton, setDisabledButton] = useState(false)

  console.log(selectedOrder)

  const openModal = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const handelNextPage =()=>{
    setCurrentPage((prevPage)=> prevPage + 1) 
  
  }
  const handelprevPage =()=>{
    setCurrentPage((prevPage)=> prevPage - 1) 
    
  }
  useEffect(() => {
    const fetchOrders = async () => {
  

      try {
        const response = await fetch(`http://localhost:8000/api/order/list?page=${currentpage}`, {
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

  if(orders.length === 0){
    console.log("nbasasdajfosh")
  }

  return (
    <div className="cont ainer w-full py-8 px-4">
      {errorMessage ? (
        <p className="text-red-500 text-center text-xl">{errorMessage}</p>
      ) : Array.isArray(orders) && orders.length === 0 ? (
        <p className="text-center text-lg text-gray-500">You have no orders yet.</p>
      ) : (
        <div className="overflow-y-scroll w-full  rounded-lg shadow-lg bg-white">
          <table className="min-w-full  ">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold">Order #</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Placed On</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Total Price</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 max-h-96">
              {orders.map((order) => (
                <tr key={order.id} className="border-b hover:bg-gray-50 transition-all">
                  <td className="px-4 py-4 text-sm font-medium">{order.order_number}</td>
                  <td className="px-4 py-4 text-sm">{new Date(order.created_at).toLocaleDateString()}</td>
                  <td className="px-4 py-4 text-sm">{order.status}</td>
                  <td className="px-4 py-4 text-sm font-semibold">${order.total_price}</td>
                  <td className="px-4 py-4">
                    <button 
                      className= " flex items-center text-white py-1 px-2 gap-2 rounded-xl bg-primary"
                      onClick={() => openModal(order)}
                    >
                        <EyeClosed size={12} color="#fff" /> View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isModalOpen && selectedOrder && (
        <div className="fixed inset-0 backdrop-blur-sm flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h2 className="text-xl  font-bold mb-4 text-primary">Full Order Details</h2>
            <div className="text-gray-700">
              <div className="font-medium ">Order Total: ${selectedOrder.total_price}</div>
              <div className="mt-2">
                <p>Shipping Address: {selectedOrder.address}</p>
                <p>Order Date: {new Date(selectedOrder.created_at).toLocaleDateString()}</p>
                <ul className="mt-4 lg:max-h-64 max-h-56 overflow-y-scroll">
                  {selectedOrder.items && selectedOrder.items.map((item) => (
                    <li key={item.id} className="border-b py-2">
                      <div>
                      <img
                    src={JSON.parse(item.product.img)[0]} 
                    alt={item.title}
                    className="h-12 w-12 object-cover rounded-md"
                  />
                      </div>
                      <div className="flex justify-between">
                        <span>{item.product.name}</span>
                        <span>Qty: {item.qty}</span>
                      </div>
                      <div className="flex  font-bold justify-between">
                        <span>Price: ${item.price}</span>
                        <span>Total: ${item.qty * item.price}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded mt-4 w-full sm:w-auto"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className="flex justify-center mt-6 text-sm items-center">
      <button onClick={()=>{
         handelprevPage()
        }} className="flex gap-2 items-center p-2 bg-white rounded-l-xl   border border-gray-400">
           <ArrowLeft size={12} />
          prev
        </button>
        <span className="border  bg-white p-2">
        {currentpage}
          </span>
   
        <button onClick={()=>{
          handelNextPage()
        }} className=" flex gap-2 items-center p-2 bg-white rounded-r-xl  border border-gray-400">
          next 
          <ArrowRight size={12} />
        </button>
       
     
      </div>
    </div>
  );
}
