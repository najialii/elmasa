import React, { useContext } from "react";
import Modal from "react-modal";
import { CartContext } from "../context/cart";
import cartsvg from "../assets/imgs/box.png";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

Modal.setAppElement("#root");

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
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Cart Modal"
      className="absolute z-40 bottom-0 lg:right-0  opacity-100 p-6 lg:h-[600px] h-[550px] shadow-lg bg-white w-full max-w-lg lg:max-h-fit rounded-xl"
      overlayClassName="fixed inset-0 backdrop-blur-sm "
    >
      <div className="flex flex-col gap-6 max-w-lg w-full">
        <div className="flex justify-between items-center border-b pb-4 mb-4">
          <h1 className="text-2xl text-primary font-semibold">Shopping Cart</h1>
          <button
            className="text-white bg-red-500 hover:bg-red-700 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
            onClick={onClose}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 text-white">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        
        <div className="flex flex-col gap-4 max-h-72  overflow-y-auto">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-4 p-4 bg-white rounded-md shadow-md border border-gray-100hover:bg-gray-50 transition-all"
              >
                <div className="flex gap-4">
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
        console.error("Invalid JSON format for images:", product.item);
        return "http://localhost:8000/storage/default-image.jpg"; 
      }
    })()
  }
  alt={item.name}
  className="w-20 rounded-md mb-4"
/>
                  <div className="flex flex-col">
                    <h2 className="font-semibold text-lg">{item.name}</h2>
                    <p className="text-primary  text-xl" dir="rtl">{item.price} ج.م</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition-all"
                    onClick={() => removeFromCart(item)}
                  >
                    -
                  </button>
                  <span className="font-medium">{item.quantity}</span>
                  <button
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition-all"
                    onClick={() => addToCart(item)}
                  >
                    +
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col gap-4 justify-center items-center">
              <img src={cartsvg} className="w-40 h-40" alt="Empty Cart" />
              <p className="text-center text-xl text-gray-600">Your cart is empty.</p>
              <button className="relative h-10 w-52 bg-primary text-white rounded-xl flex items-center justify-center gap-2 hover:bg-primary-dark transition-all">
                <Link to="/shop">Continue Shopping</Link>
              </button>
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="border-t pt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold text-gray-900">Total:</span>
              <span className="text-2xl text-primary font-bold" dir="rtl">{getCartTotal()} ج.م</span>
            </div>
            <div className="flex gap-4">
              <button
                className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary-dark transition-all"
                onClick={handleCheckout}
              >
                Checkout
              </button>
              <button
                className="w-full bg-red-400 hover:bg-red-500 text-white py-2 rounded-md transition-all"
                onClick={clearCart}
              >
                Clear Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
