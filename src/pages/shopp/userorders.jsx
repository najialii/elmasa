import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/authcontext"; 
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { EyeClosed, ArrowLeft , ArrowRight } from "@phosphor-icons/react";
import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export default function OrderHistory() {
  const { user, token } = useAuth();  
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

  const handelNextPage =()=> {
    setCurrentPage((prevPage)=> prevPage + 1) 
  }

  const handelprevPage =()=> {
    setCurrentPage((prevPage)=> prevPage - 1) 
  }

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/order/list`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          const result = response.data;
          console.log(result)
          if (result && result.data && Array.isArray(result.data.data)) {
            setOrders(result.data.data);
          } else {
            setErrorMessage("Failed to fetch orders.");
          }
        } else {
          const errorMessage = response.statusText;
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
  }, [currentpage, token]);

  if(orders.length === 0){
    console.log("nbasasdajfosh")
  }

  return (
    <div className="container w-full py-8 px-4">
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
                  <td className="px-4 py-4 text-sm">
                  <button
    className={`px-4 py-2 text-white rounded-md font-semibold ${
      order.status === "delivered"
        ? "bg-green-400 hover:bg-green-500 font-bold"
        : order.status === "paid"
        ? "bg-orange-400 hover:bg-orange-500"
        : "bg-gray-400 hover:bg-gray-500"
    }`}
  >
    
    {order.status}
  </button>
                  </td>
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
          <div className=" bg-white p-6 rounded-lg max-w-md w-full">
            <div className="flex justify-between">


<div className="flex flex-col w-full max-h-12">

            <h2 className="text-xl  font-bold mb-4 text-primary">Full Order Details</h2>
</div>
            <button
            
            className={`px-2 py-2 text-white rounded-md font-bold text-sm ${
              selectedOrder.status === "delivered"
                ? "bg-green-400 hover:bg-green-500 "
                : selectedOrder.status === "paid"
                ? "bg-orange-400 hover:bg-orange-500"
                : "bg-gray-400 hover:bg-gray-500"
            }`} >             
              {selectedOrder.status}
              
              </button>
            </div>
                

            <ul className="mt-4 lg:max-h-64 max-h-56 overflow-y-scroll">
  {selectedOrder.items && selectedOrder.items.map((item) => (
    <li key={item.id} className="bg-white hover:bg-gray-100 rounded-md shadow-md my-2 max-h-20 h-20 py-2 px-4 flex items-center justify-between">
      <div className="flex items-center justify-center w-1/4">
      <img
  src={
    (() => {
      try {
        const parsedImg = JSON.parse(item.img); 
        const imageUrl = Array.isArray(parsedImg) ? parsedImg[0] : parsedImg; 
        return imageUrl.startsWith("http")
          ? imageUrl
          : `http://localhost:8000/storage/${imageUrl}`;
      } catch (error) {
        console.error("Invalid JSON format for images:", item.img);
        return "http://localhost:8000/storage/default-image.jpg"; 
      }
    })()
  }
  alt={item.name}
  className="w-20 rounded-md mb-4"
/>
          
      </div>
      
      <div className="flex flex-col items-center justify-center w-1/2">
        <span className="text-xl font-medium">{item.product.name}</span>
   
      </div>
      
      <div className="flex flex-col items-end justify-center w-1/4">
        <span className="text-xl font-semibold">{item.price}</span>
        <span className="text-sm">Qty: {item.qty}</span>
        {/* <span className="text-sm font-semibold">Total: ${item.qty * item.price}</span> */}
      </div>
    </li>
  ))}
</ul>


            <div className="text-gray-700  items-center justify-around">
            

            <div className="mt-6">
  {/* Order Date */}
  <p className="flex justify-between ">
    <span className="text-sm font-medium text-gray-700">Order Date</span>
    <span className="text-xl font-extrabold text-gray-900">
      {new Date(selectedOrder.created_at).toLocaleDateString()}
    </span>
  </p>

  {/* Address */}
  <p className="text-gray-900 flex justify-between text-sm mb-6 mt-4">
    <span className="text-sm font-medium text-gray-700">Address</span>
    <span className="text-xl font-extrabold text-gray-900">
      {selectedOrder.address}
    </span>
  </p>

  {/* Phone Number */}
  <p className="text-gray-900 flex justify-between text-sm">
    <span className="text-sm font-medium text-gray-700">Phone Number</span>
    <span className="text-xl font-extrabold text-gray-900">
      {selectedOrder.order_number}
    </span>
  </p>
</div>

            </div>

            <div className="mt-2 flex justify-between">

<div className="font-medium ">Order Total</div>
<p className="text-3xl text-primary font-extrabold ">
${selectedOrder.total_price}
</p>
 
</div>
            <div className="flex justify-end w-full mt-4">

            <button
              className="bg-red-500 text-white px-4 py-2 rounded mt-4 w-32 sm:w-auto"
              onClick={closeModal}
            >
              Close
            </button>
            </div>
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
   
        <button onClick={()=> {
          handelNextPage()
        }} className=" flex gap-2 items-center p-2 bg-white rounded-r-xl  border border-gray-400">
          next 
          <ArrowRight size={12} />
        </button>
       
     
      </div>
    </div>
  );
}
