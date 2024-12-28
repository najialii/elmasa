import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/authcontext';
import { Image } from '@phosphor-icons/react';

function AddProduct() {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productImage, setProductImage] = useState(null);
  const [productBrand, setProductBrand] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productStock, setProductStock] = useState('');
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [expiryDate, setExpiryDate] = useState('');
  const [originCountry, setOriginCountry] = useState('');
  const [discount, setDiscount] = useState('');
  const [size, setSize] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [fileName, setFileName] = useState(null);

  const { token } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const brandsResponse = await fetch('http://localhost:8000/api/brand/list');
        const categoriesResponse = await fetch('http://localhost:8000/api/categories');

        const brandsData = await brandsResponse.json();
        const categoriesData = await categoriesResponse.json();

        setBrands(brandsData.data || []);
        setCategories(categoriesData.data.data || []);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching brands or categories:', error);
        setError('Failed to load brands or categories');
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleImageChange = (e) => {
    setProductImage(e.target.files[0]);
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', productName);
    formData.append('price', productPrice);
    formData.append('description', productDescription);
    formData.append('img', productImage);
    formData.append('brand_id', productBrand);
    formData.append('category_id', productCategory);
    formData.append('stock', productStock);
    formData.append('origin_country', originCountry);
    formData.append('expiration_date', expiryDate);
    formData.append('discount', discount);
    formData.append('size', size);

    try {
      const response = await fetch('http://localhost:8000/api/products/add', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        console.log(response)
        alert('Product added successfully!');
        setProductName('');
        setProductPrice('');
        setProductDescription('');
        setProductImage(null);
        setProductBrand('');
        setProductCategory('');
        setProductStock('');
        setOriginCountry('');
        setExpiryDate('');
        setDiscount('');
        setSize('');
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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="mb-4 col-span-2">
          <label htmlFor="productImage" className="block text-gray-700 text-sm font-bold mb-2">
            Image
          </label>
          <div className="flex flex-col items-center justify-center w-[200px] relative border-2 border-dashed border-secondaryLight rounded-lg p-6 space-y-4">
            <Image size={96} weight="thin" color="#ADEB76" />
            <label htmlFor="productImage" className="cursor-pointer text-secondaryDark text-sm font-medium">
              Upload Image
            </label>
            <input
              type="file"
              id="productImage"
              onChange={handleImageChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="productName" className="block text-gray-700 text-sm font-bold mb-2">
            Name
          </label>
          <input
            type="text"
            id="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
            className="shadow bg-gray-100 focus:bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-secondaryLight focus:shadow-xl transition-all duration-300 ease-in-out"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="productPrice" className="block text-gray-700 text-sm font-bold mb-2">
            Price
          </label>
          <input
            type="number"
            id="productPrice"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            required
            className="shadow bg-gray-100 focus:bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-secondaryLight focus:shadow-xl transition-all duration-300 ease-in-out"
          />
        </div>
        <div className="mb-4 col-span-2">
          <label htmlFor="productDescription" className="block text-gray-700 text-sm font-bold mb-2">
            Description
          </label>
          <input
            id="productDescription"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            required
            className="shadow bg-gray-100 focus:bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-secondaryLight focus:shadow-xl transition-all duration-300 ease-in-out"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="productBrand" className="block text-gray-700 text-sm font-bold mb-2">
            Brand
          </label>
          <select
            id="productBrand"
            value={productBrand}
            onChange={(e) => setProductBrand(e.target.value)}
            required
            className="shadow bg-gray-100 focus:bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-secondaryLight focus:shadow-xl transition-all duration-300 ease-in-out"
          >
            <option value="">Select Brand</option>
            {brands.length > 0 ? (
              brands.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              ))
            ) : (
              <option value="">No brands available</option>
            )}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="productCategory" className="block text-gray-700 text-sm font-bold mb-2">
            Category
          </label>
          <select
            id="productCategory"
            value={productCategory}
            onChange={(e) => setProductCategory(e.target.value)}
            required
            className="shadow bg-gray-100 focus:bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-secondaryLight focus:shadow-xl transition-all duration-300 ease-in-out"
          >
            <option value="">Select Category</option>
            {categories.length > 0 ? (
              categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))
            ) : (
              <option value="">No categories available</option>
            )}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="productStock" className="block text-gray-700 text-sm font-bold mb-2">
            Stock
          </label>
          <input
            type="number"
            id="productStock"
            value={productStock}
            onChange={(e) => setProductStock(e.target.value)}
            required
            className="shadow bg-gray-100 focus:bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-secondaryLight focus:shadow-xl transition-all duration-300 ease-in-out"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="expiryDate" className="block text-gray-700 text-sm font-bold mb-2">
            Expiry Date
          </label>
          <input
            type="date"
            id="expiryDate"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            required
            className="shadow bg-gray-100 focus:bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-secondaryLight focus:shadow-xl transition-all duration-300 ease-in-out"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="originCountry" className="block text-gray-700 text-sm font-bold mb-2">
            Origin Country
          </label>
          <input
            type="text"
            id="originCountry"
            value={originCountry}
            onChange={(e) => setOriginCountry(e.target.value)}
            required
            className="shadow bg-gray-100 focus:bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-secondaryLight focus:shadow-xl transition-all duration-300 ease-in-out"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="discount" className="block text-gray-700 text-sm font-bold mb-2">
            Discount
          </label>
          <input
            type="number"
            id="discount"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            required
            className="shadow bg-gray-100 focus:bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-secondaryLight focus:shadow-xl transition-all duration-300 ease-in-out"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="size" className="block text-gray-700 text-sm font-bold mb-2">
            Size
          </label>
          <input
            type="text"
            id="size"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            required
            className="shadow bg-gray-100 focus:bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-secondaryLight focus:shadow-xl transition-all duration-300 ease-in-out"
          />
        </div>
        <div className="flex items-center justify-between col-span-2">
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
