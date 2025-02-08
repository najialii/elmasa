import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../../context/authcontext"; 
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { EyeClosed, ArrowLeft , ArrowRight,Clock } from "@phosphor-icons/react";
import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const VITE_IMAGE_URL = import.meta.env.VITE_IMAGE_STORAGE_URL

export default function OrderHistory() {
  const { user, token } = useAuth();  
  const [orders, setOrders] = useState([]); 
  const [errorMessage, setErrorMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [currentpage, setCurrentPage] = useState(1)
  const [disabledButton, setDisabledButton] = useState(false)
  const effectRan = useRef(false)

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

  
  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/order/list`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        const result = response.data;
        console.log("hhha",response.data)
        console.log("foff",result)
        if (result && result.data && Array.isArray(result.data.data)) {
          setOrders(result.data.data);
          console.log(result.data.data)
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
  useEffect(() => {
   if (!effectRan.current) {
    effectRan.current = true 
    fetchOrders();
   }

  }, [currentpage, token]);


  return (
    <div className="container w-full  pt-4 ">
      <div dir="rtl" className="pb-6">
        <h3 className="text-3xl">
          الطلبات
        </h3>
      </div>
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
      <div
        dir="rtl"
        className="fixed max-h-[600px] bottom-0 lg:right-0 bg-gradient-to-t from-blue-100 to-white p-6 rounded-t-lg w-full max-w-md  shadow-lg overflow-y-auto "
      >
      
        <div className=" w-full p-2 border-b border-primary">

        <div className="text-center mb-4">
          <h2 className="text-3xl font-extrabold text-primary">تفاصيل الطلب</h2>
        </div>
    
       
        <div className="flex justify-between items-center mb-6">
          <h2 className="flex items-center gap-1 font-medium text-gray-500">
          <Clock size={18} weight="fill" />   {new Date(selectedOrder.created_at).toLocaleDateString()}
          </h2>
          <button
            className={`px-4 py-2 text-white rounded-md font-bold text-sm transition-all ${
              selectedOrder.status === "delivered"
                ? "bg-green-500 hover:bg-green-600"
                : selectedOrder.status === "paid"
                ? "bg-orange-500 hover:bg-orange-600"
                : "bg-gray-400 hover:bg-gray-500"
            }`}
          >
            {selectedOrder.status}
          </button>
        </div>
              </div>
    
  <div className="">

        <ul className="space-y-4 max-h-32 overflow-y-auto">
          {selectedOrder.items?.map((item) => (
            <li
              key={item.id}
              className="bg-white mt-2 hover:bg-gray-200 rounded-md shadow-md p-4 flex items-center justify-between"
            >
               <img
                src={
                  (() => {
                    try {
                      const parsedImg = JSON.parse(item.product.img);
                      const imageUrl = Array.isArray(parsedImg) ? parsedImg[0] : parsedImg;
                      return imageUrl.startsWith("http")
                        ? imageUrl
                        : `${VITE_IMAGE_URL}/${imageUrl}`;
                    } catch (error) {
                      console.error("Invalid JSON format for images:", item.img);
                      return "http://localhost:8000/storage/default-image.jpg";
                    }
                  })()
                }
                alt={item.product.name}
                className="w-20 h-20 rounded-md"
              />
              <div className="flex  items-center w-2/3">
                <span className="text-sm font-medium">{item.product.name}</span>
              </div>
              <div className="flex flex-col items-start gap-2 ">
                <span className="text-sm font-semibold">{item.price} ج.م</span>
                <span className="text-xs text-gray-600">Qty: {item.qty}</span>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-6 border border-secondary bg-lime-200 p-4 rounded-md">
          <h3 className="text-lg font-bold">عنوان التوصيل</h3>
          <p className="text-sm text-gray-700">{selectedOrder.address}</p>
        </div>
        <div className="">
          <h3 className="mt-4 text-lg font-bold"> رقم الجوال</h3>
          <p className="text-lg text-gray-700">{selectedOrder.phone}</p>
        </div>
    
        
        <div className="mt-6 flex justify-between items-center text-lg">
          <span className="font-medium">إجمالي الطلب</span>
          <span className="text-2xl font-extrabold text-primary">
            ${selectedOrder.total_price}
          </span>
        </div>
    
        {/* Close Button */}
        <div className="flex justify-end mt-4">
          <button
            className="bg-gray-400 text-white px-4 py-2 rounded"
            onClick={closeModal}
          >
           <span>&#x25BC;</span> إغلاق
          </button>
          </div>
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
