import React, { useState } from 'react';

function AddProduct() {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productImage, setProductImage] = useState(null);

  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const apiKey = import.meta.env.API_KEY;
  
  console.log('API URL:', apiUrl);
  console.log('API Key:', apiKey);
  console.log('***********************************************************');
  console.log('env:', import.meta.env);
  

  const handleImageChange = (e) => {
    setProductImage(e.target.files[0]);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('productname', productName);
    formData.append('productprice', productPrice);
    formData.append('productdescription', productDescription);
    formData.append('productpic', productImage);

    try {
      const response = await fetch('http://localhost/masa/api/content/items/products', {
        method: 'POST',
        headers: {
          "api-key": "API-98177dc3e1ce2220c4228e1011caf2517191a287",
        },
        body: formData,
      });

      if (response.ok) {
        alert('Product added successfully!');
        setProductName('');
        setProductPrice('');
        setProductDescription('');
        setProductImage(null);
      } else {
        const errorData = await response.json();
        console.error('Error Response:', errorData);
        alert('Failed to add product.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while adding the product.');
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-2xl font-bold mb-6">Add New Product</h2>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label htmlFor="productName" className="block text-gray-700 text-sm font-bold mb-2">
            Product Name
          </label>
          <input
            type="text"
            id="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="productPrice" className="block text-gray-700 text-sm font-bold mb-2">
            Product Price
          </label>
          <input
            type="number"
            id="productPrice"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="productDescription" className="block text-gray-700 text-sm font-bold mb-2">
            Product Description
          </label>
          <textarea
            id="productDescription"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
          ></textarea>
        </div>

        <div className="mb-4">
          <label htmlFor="productImage" className="block text-gray-700 text-sm font-bold mb-2">
            Product Image
          </label>
          <input
            type="file"
            id="productImage"
            onChange={handleImageChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-primary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProduct;
