import React, { useEffect, useState } from 'react';
import { Plus, Minus, Trash } from '@phosphor-icons/react';

const Warehouse = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newQty, setNewQty] = useState({});
  const [statusUpdateLoading, setStatusUpdateLoading] = useState(false);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `http://localhost/masa/api/content/items/products?populate=*`
        );
        const data = await response.json();

        console.log(data)
        const cleanedData = Array.isArray(data)
        ? data.map((product) => ({
          id: product._id,
              name: product['productname ']?.trim() || 'Unnamed Product',
              price: product.productprice || 'N/A',
              image:
              Array.isArray(product.productpic)
                  ? product.productpic[0]?.path
                  : product.productpic?.path,
              qty: product.qty || 0,
            }))
            : [];

        setProducts(cleanedData);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleIncreaseQuantity = (productId) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId
          ? { ...product, qty: product.qty + 1 }
          : product
      )
    );
  };

  const handleDecreaseQuantity = (productId) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId && product.qty > 0
          ? { ...product, qty: product.qty - 1 }
          : product
      )
    );
  };

  const handleDeleteProduct = (productId) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== productId)
    );
  };

  const handleAddQty = async (productId) => {
    setStatusUpdateLoading(true); // Start loading
    try {
      // Update the products state with the new quantity
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === productId
            ? { ...product, qty: product.qty + (newQty[productId] || 0) }
            : product
        )
      );
  
      // Reset the newQty state for that product
      setNewQty((prevState) => ({ ...prevState, [productId]: 0 }));
  
      // Find the updated product details
      const updatedProduct = products.find((product) => product.id === productId);
  
      // Prepare the request payload
      const data = {
        data: {
          _id: updatedProduct.id,
          qty: updatedProduct.qty, // Make sure you're sending the correct new quantity
          productname: updatedProduct.name,
          productpic: updatedProduct.image,
          productprice: updatedProduct.price,
          sizes: updatedProduct.sizes,
          category: updatedProduct.category,
        },
      };
  
      // Make the POST request to update the quantity
      const response = await fetch("http://localhost/masa/api/content/item/orders", {
        method: "POST",
        headers: {
          "api-key": "API-98177dc3e1ce2220c4228e1011caf2517191a287", // Ensure correct API key
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      // Log the response data
      const responseData = await response.json();
      console.log("Response from backend:", responseData);
  
      // If the backend confirms the quantity update, update the state
      if (responseData.data && responseData.data.qty !== undefined) {
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.id === productId
              ? { ...product, qty: responseData.data.qty } // Update the state with the new qty from the response
              : product
          )
        );
      }
  
      console.log("Quantity updated successfully");
  
    } catch (err) {
      console.error("Error updating quantity:", err);
    } finally {
      setStatusUpdateLoading(false); // Reset loading state
    }
  };
  
  

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen w-screen">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-12 animate-spin text-blue-600"
          viewBox="0 0 24 24"
        >
          <path
            d="M12 22c5.421 0 10-4.579 10-10h-2c0 4.337-3.663 8-8 8s-8-3.663-8-8c0-4.336 3.663-8 8-8V2C6.579 2 2 6.58 2 12c0 5.421 4.579 10 10 10z"
          />
        </svg>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="py-[80px] px-4">
      <h2 className="text-3xl font-semibold text-center mb-8">Warehouse Management</h2>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Product</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Price</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Qty</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b">
                <td className="px-6 py-4 text-sm font-medium text-gray-900 flex items-center gap-3">
                  <img
                    src={`http://localhost/masa/storage/uploads${product.image}`}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  {product.name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">{product.price} EGP</td>
                <td className="px-6 py-4 text-sm text-gray-700">{product.qty}</td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handleDecreaseQuantity(product.id)}
                      className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
                    >
                      <Minus size={20} />
                    </button>
                    <button
                      onClick={() => handleIncreaseQuantity(product.id)}
                      className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition"
                    >
                      <Plus size={20} />
                    </button>
                    <input
                      type="number"
                      value={newQty[product.id] || ''}
                      onChange={(e) =>
                        setNewQty((prevState) => ({
                          ...prevState,
                          [product.id]: Number(e.target.value),
                        }))
                      }
                      className="w-20 p-1 border rounded"
                      placeholder="Add Qty"
                    />
                    <button
                      onClick={() => handleAddQty(product.id)}
                      className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition"
                    >
                      Add Qty
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="bg-gray-500 text-white p-2 rounded-full hover:bg-gray-600 transition"
                    >
                      <Trash size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Warehouse;
