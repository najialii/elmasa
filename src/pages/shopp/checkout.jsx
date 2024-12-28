import React, { useState, useContext } from "react";
import { CartContext } from "../../context/cart";
import { useAuth } from "../../context/authcontext";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import { MapPin, Phone } from "@phosphor-icons/react";
import bank from '../../assets/imgs/bankakk.svg'
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { cartItems, clearCart } = useContext(CartContext);
  const { token } = useAuth();
  const [phone, setPhone] = useState(null);
  const [address, setAddress] = useState("");
  const [fullName, setFullName] = useState("");
  const [paymentphone, setPaymentphone] = useState("");
  const [image, setImage] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isfilled, setIsfilled] = useState(false);
  
  const navigate = useNavigate();

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity, 0
  );

  const formattedCartItems = cartItems.map((item) => ({
    id: item.id,
    qty: item.quantity,
  }));

  const handlePlaceOrder = async () => {
    if (!address || !phone) {
      setIsfilled(true);
      toast.error('Phone number and address are required', {
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
      return;
    }
  
    console.log("Token:", token);
  
    const   city_id = 1;
    const orderData ={
      "cart": formattedCartItems,
      "phone": phone,
      "address": address,
      "fullName": fullName,
     // "img": image,
      "paymentphone": paymentphone,  
      "city_id": 1
    };
    console.log("Order data to be sent:", orderData);
  
    try {
      console.log("Tokennnnnnnnnnnnn:", token);
      const response = await fetch(`http://localhost:8000/api/order/place`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
         
        },
        body: JSON.stringify(orderData),
      });
  
      console.log("Response status:", response); 
      
      // return 
      
      if (response.ok) {
        const result = await response.json(); 
        setIsSuccess(true);
        clearCart(); 
        console.log("Order placed successfully:", result.data);
        toast.success('Order placed successfully!', {
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
        // navigate("/order-history");
      } else {
   
        const errorMessage = await response.text();
        console.error("Failed to place order:", errorMessage);
        setErrorMessage("Failed to place order. Please try again.");
        toast.error('Failed to place order. Please try again', {
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
      console.error("Error while placing order:", error);
      setErrorMessage("An error occurred while placing the order. Please try again.");
      toast.error('🦄 Error while placing order', {
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
  };
  
  

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className="max-w-screen p-6 bg-gray-100 h-full">




      
    <h1 className="text-3xl font-bold mb-6 text-center text-primary">Complete Your Order</h1>
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-2">

      <div className="col-span-3 bg-white rounded-xl p-4">
        <h2 className="text-2xl font-semibold text-primary">Order Summary</h2>
        <div className="max-h-80 overflow-y-auto rounded-lg p-6 space-y-6">
          <ul className="space-y-4">
            {cartItems.map((item) => (
              <li key={item.id} className="flex items-center justify-between text-lg">
                <img
                  src={JSON.parse(item.img)[0]} 
                  alt={item.title}
                  className="h-12 w-12 object-cover rounded-md"
                />
                <div className="flex-1 px-4">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-gray-500 text-base">Quantity: {item.quantity}</p>
                </div>
                <p className="font-semibold">${item.price * item.quantity}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex mt-8 bg-secondary p-6 rounded-xl justify-between items-center border-t pt-4">
          <span className="text-2xl text-white font-semibold">Total:</span>
          <span className="text-white text-3xl font-bold" dir="rtl">{total} ج.م</span>
        </div>
      </div>
  

      <div className="col-span-2 bg-white p-4 rounded-xl space-y-6">
        <h2 className="text-2xl font-semibold text-primary mb-4">Delivery Details</h2>
        <div>
          <span className="flex items-center">
            <Phone size={16} color="#000" />
            <label className="block text-lg font-medium">Phone</label>
          </span>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-3 border rounded-lg"
            placeholder="Enter your phone number"
          />
        </div>



        <div>
          <span className="flex items-center">
            <MapPin size={16} color="#000" />
            <label className="block text-lg font-medium">Address</label>
          </span>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full p-3 border rounded-lg"
            placeholder="Enter your address"
          />
        </div>
  
  







        <h2 className="text-2xl font-semibold text-primary mb-4">Payment Method</h2>
        <div className="flex items-center space-x-4">
          <img
            src={bank}
            alt="Bank"
            className="w-14 h-14 object-cover rounded-full border"
          />
          <div>
            <p className="text-lg font-medium">Pay With Bankak</p>
            <p className="text-gray-500 text-sm">Use your bank account for secure payment.</p>
            <div className="space-y-4 mt-4">
              <div>
                <label className="block text-lg font-medium">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full p-3 border rounded-lg"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label className="block text-lg font-medium">Account Number</label>
                <input
                  type="text"
                  value={paymentphone}
                  onChange={(e) => setPaymentphone(e.target.value)}
                  className="w-full p-3 border rounded-lg"
                  placeholder="Enter your account number"
                />
              </div>
              <div>
                <label className="block text-lg font-medium">Payment Receipt (Image)</label>
                <input
                  type="file"
                  onChange={handleImageChange}
                  className="w-full p-3 border rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
  
        <button
          onClick={handlePlaceOrder}
          className={`mt-4 w-full p-3 rounded-lg font-semibold ${phone && address ? 'bg-primary text-white' : 'bg-gray-400 text-gray-200 cursor-not-allowed'}`}
          disabled={!phone || !address}
        >
          Place Order
        </button>
        {isSuccess && (
          <div className="text-center bg-white flex justify-center items-center text-green-500 font-medium mt-4">
            Order placed successfully!
          </div>
        )}
        {errorMessage && (
          <div className="text-center text-red-500 font-medium mt-4">{errorMessage}</div>
        )}
      </div>
    </div>
    <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
      transition={Bounce}
    />
  </div>
  
  );
}
