import React, { useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { CartContext } from "../../context/cart";

export default function Checkout() {
  const { state } = useLocation();
  const { order, total } = state;
  const { clearCart } = useContext(CartContext);

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
  });

  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePlaceOrder = async () => {
    const orderData = {
      customername: formData.name,
      customernum: formData.phone,
      customeraddress: formData.address,
      items: order,
      total: total,
      date: new Date().toISOString(),
    };

    try {
      const response = await fetch("http://localhost/masa/api/content/item/orders", {
        method: "POST",
        headers: {
          "api-key": "API-98177dc3e1ce2220c4228e1011caf2517191a287",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: orderData }),
      });

      if (response.ok) {
        setIsSuccess(true);
        clearCart();
      } else {
        console.error("Failed to place order:", await response.text());
      }
    } catch (error) {
      console.error("Error while placing order:", error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-primary">Checkout</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Summary Section */}
        <div className="bg-white shadow-lg rounded-lg p-6 space-y-6">
          <h2 className="text-2xl font-semibold">Order Summary</h2>
          <ul className="space-y-4">
            {order.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between text-lg"
              >
                <img
                  src={`http://localhost/masa/storage/uploads${item.image}`}
                  alt={item.title}
                  className="h-20 w-20 object-cover rounded-md"
                />
                <div className="flex-1 px-4">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-gray-500 text-base">Quantity: {item.quantity}</p>
                </div>
                <p className="font-semibold">${item.price * item.quantity}</p>
              </li>
            ))}
          </ul>
          <div className="flex justify-between items-center border-t pt-4">
            <span className="text-lg font-semibold">Total:</span>
            <span className="text-primary text-3xl font-bold">${total}</span>
          </div>
        </div>

        {/* Form Section */}
        <div className="col-span-2 space-y-6">
          <div>
            <label className="block text-lg font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-4 border rounded-md shadow-sm focus:ring-2 focus:ring-primary"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label className="block text-lg font-medium">Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full p-4 border rounded-md shadow-sm focus:ring-2 focus:ring-primary"
              placeholder="Enter your address"
            />
          </div>
          <div>
            <label className="block text-lg font-medium">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full p-4 border rounded-md shadow-sm focus:ring-2 focus:ring-primary"
              placeholder="Enter your phone number"
            />
          </div>
          <div className="mt-6">
            <button
              onClick={handlePlaceOrder}
              className="w-full py-3 bg-primary text-white rounded-md shadow-lg hover:bg-blue-700 transition"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>

      {isSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <h2 className="text-3xl font-semibold text-green-600 mb-4">
              Order Placed Successfully!
            </h2>
            <p className="text-lg text-gray-600">Thank you for your order.</p>
            <button
              onClick={() => setIsSuccess(false)}
              className="mt-6 px-6 py-2 bg-primary text-white rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
