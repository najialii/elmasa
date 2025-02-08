import React, { useContext } from "react";
import { CartContext } from "../context/cart";
import cartsvg from "../assets/imgs/box.png";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Basket, Trash, List, User } from "@phosphor-icons/react";
const VITE_IMAGE_URL = import.meta.env.VITE_IMAGE_STORAGE_URL

export default function Cart({ isOpen, onClose }) {
  const { cartItems, addToCart, removeFromCart, clearCart, getCartTotal } = useContext(CartContext);
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate("/checkout", {
      state: { order: cartItems, total: getCartTotal() },
    });
    onClose();
  };

  return (
    <>
 <div dir='rtl'
  className={`fixed z-40 top-0 ${
    isOpen ? "right-0" : "-right-full"
  } lg:w-[400px] w-[90%] h-full bg-white shadow-xl transition-transform duration-300 ease-in-out`}
  style={{ zIndex: 1050 }}
>
  {/* Sidebar Header */}
  <div className="flex justify-between items-center border-b px-6 py-4">
    <h1 className="text-base gap-2 flex text-primary font-semibold">

    <Basket size={24} color="#00000" weight="fill" />
    السلة
    </h1>
    <button
      className="text-gray-900  p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
      onClick={onClose}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="w-4 h-4 text-gray-900 text-4xl "
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>

  <div className="flex gap-2  flex-col h-full">
 
    <div dir="rtl" className="flex-grow lg:max-h-[420px] max-h-[650px] overflow-y-auto  py-4">
      {cartItems.length > 0 ? (
        cartItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center border border-t border-gray-200 justify-between gap-4 p-4 bg-white   hover:bg-gray-50 transition-all"
          >
            <div className="flex gap-4 ">
              <img
                src={
                  (() => {
                    try {
                      const parsedImg = JSON.parse(item.img);
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
                alt={item.name}
                className="w-[5.25rem] h-[5.25rem]  rounded-md"
              />
              <div className="flex flex-col justify-center items-start">
                <h2 className="text-base w-full">{item.name}</h2>
                <div className="flex items-center gap-2 mt-4">
                <button
                className="px-3 py-1 bg-primary   text-white rounded hover:bg-gray-300 transition-all"
                onClick={() => addToCart(item)}
              >
                +
              </button>
              <span className="font-medium">{item.quantity}</span>
                <button
                className="px-3 py-1 bg-white text-primary border border-primary rounded hover:bg-gray-300 transition-all"
                onClick={() => removeFromCart(item)}
              >
                -
              </button>
     
           
              </div>


              </div>
            </div>
            <div className="flex justify-end items-center gap-2">

            <p className="text-gray-800 font-extrabold text-base" dir="rtl">{item.price} ج.م</p>
            
              <hr className="border-t border-gray-200" />
            </div>
          </div>
        ))
      ) : (
        <div className="flex flex-col gap-4 justify-center my-40 lg:my-40 items-center">
          <div>

          </div>

          <div className="flex items-center flex-col">

          <img src={cartsvg} className="w-32 object-contain" alt="Empty Cart" />
          <p className="text-center text-xl text-gray-600">Your cart is empty.</p>
          </div>
          <div className="fixed bottom-0  my-6">

          <Link
            to="/shop"
            className="h-10 w-52 bg-primary text-white rounded-xl flex items-center justify-center hover:bg-primary-dark transition-all"
            >
            Continue Shopping
          </Link>
            </div>
        </div>
      )}
    </div>


    {cartItems.length > 0 && (
      <div className="border-t border-b px-6  border-gray-200 mt-4">
        <div className="flex justify-between items-center mb-4">
          <span className="text-base font-semibold text-gray-500">الاجمالي </span>
          <span className="text-base text-primary font-bold" dir="rtl">{getCartTotal()} ج.م</span>
        </div>
        <div className="flex gap-4">
     
        </div>


        <div className="flex gap-2">
        <button
            className="w-full  bg-primary text-white py-1.5 text-sm rounded-md hover:bg-primary-dark transition-all"
            onClick={handleCheckout}
          >
            اتمام الشراء
          </button>
          <button
            className="w-[70%] flex items-center gap-2 justify-center border border-primary text-primary py-2 rounded-md transition-all"
            onClick={clearCart}
          >
               {/* <Trash size={28} color="#ee7272" weight="fill" /> Cart */}
               تفاصيل السلة
          </button>
        </div>
      </div>
    )}
  </div>
</div>

    </>
  );
}
