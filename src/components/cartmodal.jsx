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
      className="absolute top-0 right-0 sm:h-scre z-[1000px] p-6  shadow-lg bg-white w-full max-w-lg max-h-fit"
      overlayClassName="fixed inset-0  backdrop-blur-sm"
    >
      <div className="flex flex-col gap-6 max-w-lg w-full">
        <div className="flex justify-between items-center border-b pb-4">
          <h1 className="text-2xl text-primary font-bold">Shopping Cart</h1>
          <button
            className="text-white bg-red-600 hover:bg-red-700 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
            onClick={onClose}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 text-white">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex flex-col gap-4 max-h-80 overflow-y-auto">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-4 p-4 border border-l-4 rounded-l-lg border-l-primary rounded-md"
              >
                <div className="flex gap-4">
                <img
                    src={JSON.parse(item.img)[0]} 
                    alt={item.title}
                    className="h-12 w-12 object-cover rounded-md"
                  />
                  <div className="flex flex-col">
                    <h2 className="font-semibold text-lg">{item.name}</h2>
                    <p className="text-gray-500 text-sm" dir="rtl">{item.price} ج.م</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    onClick={() => removeFromCart(item)}
                  >
                    -
                  </button>
                  <span className="font-medium">{item.quantity}</span>
                  <button
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    onClick={() => addToCart(item)}
                  >
                    +
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col gap-4 justify-center items-center">
              <div>
                <img
                  src={cartsvg}
                  className="w-40 h-40"
                  alt="Empty Cart"
                />
              </div>
              <p className="text-center text-xl text-gray-600">Your cart is empty.</p>
              <button className="flex items-center justify-center gap-2 relative h-10 rounded-xl w-52 overflow-hidden border border-primary bg-primary text-white shadow-2xl transition-all">
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
                className="w-full bg-primary text-white py-2 rounded-md hover:bg-green-600"
                onClick={handleCheckout}
              >
                Checkout
              </button>
              <button
                className="w-full bg-red-400 hover:bg-red-500 text-white py-2 rounded-md"
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
