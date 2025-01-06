import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/authcontext';
import { Image } from '@phosphor-icons/react';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import axios from 'axios';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
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
        const brandsResponse = await fetch(`${API_BASE_URL}/brand/list`);
        const categoriesResponse = await fetch(`${API_BASE_URL}/categories`);

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
    console.log(e.target.files[0])
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
    formData.append('image', productImage);
    formData.append('brand_id', productBrand);
    formData.append('category', productCategory);
    formData.append('stock', productStock);
    formData.append('origin_country', originCountry);
    formData.append('expiration_date', expiryDate);
    formData.append('discount', discount);
    formData.append('size', size);

    try {
      // const response = await fetch('http://localhost:8000/api/products/add', {
      //   method: 'POST',
      //   headers: {
      //     'Authorization': `Bearer ${token}`,
      //   },
      //   body: formData,
      // });

      const response = await axios.post(`${API_BASE_URL}/products/add`,formData,{
        headers:{
          'Content-Type': 'multipart/form-data',
               'Authorization': `Bearer ${token}`
        }
      });

    //  console.log(response);
    

      if (response.status==201) {
        console.log(response)
 toast.success('product added successfully!', {
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
      
      <form onSubmit={handleSubmit} className="bg-white shadow-md  px-8 rounded-md pb-8 mb-4 ">
      <div className='grid grid-cols-3 gap-4'>

<div className='flex col-span-2 justify-center items-center w-full h-fit bg-gray-100 rounded-xl p-6'>


        <div className=' w-full h-fit p-6 rounded-md shadow-md"'>

        <div className="flex flex-col items-start mt-8 h-fit bg-gray-100 w-full p-6">
  <div className="w-full mb-4">
    <h2 className="font-black text-lg text-gray-800">Product Details</h2>
  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
    {/* Product Name */}
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

    {/* Expiry Date */}
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

    {/* Product Description */}
    <div className="mb-4 col-span-1 sm:col-span-2">
      <label htmlFor="productDescription" className="block text-gray-700 text-sm font-bold mb-2">
        Description
      </label>
      <textarea
        id="productDescription"
        value={productDescription}
        onChange={(e) => setProductDescription(e.target.value)}
        required
        rows="4"
        className="shadow bg-gray-100 focus:bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-secondaryLight focus:shadow-xl transition-all duration-300 ease-in-out"
      />
    </div>

    {/* Origin Country */}
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

    {/* Size */}
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
  </div>
</div>


            <div className="flex flex-col items-start mt-8 h-fit bg-gray-100 w-full p-6">
  <div className="w-full mb-4">
    <h2 className="font-black text-lg text-gray-800">Pricing And Stock</h2>
  </div>
  
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
    {/* Price Field */}
    <div>
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

    {/* Stock Field */}
    <div>
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

    {/* Discount Field */}
    <div>
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
  </div>
</div>




        </div>

            </div>





          

        <div>
  
  <div className="mb-4  bg-gray-100 h-[80%]  rounded-md shadow-md p-6 py-12 flex flex-col justify-center items-center w-full">
    
    <label htmlFor="productImage" className="flex font-extrabold w-full my-3 justify-start ml-10 text-gray-700 text-sm  mb-2">
      Upload Image
    </label>
    <div className='flex flex-col items-center justify-center w-full h-full   '>

    <div className="flex flex-col  items-center justify-center   relative border-2 border-dashed border-secondaryLight  p-6 space-y-4">
      <Image size={200} weight="thin" color="#ADEB76" />
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
    <div className="max-w-md mx-auto   p-6">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Image Upload Instructions</h2>
      <ul className="list-disc list-inside text-gray-700 text-sm space-y-2">
        <li>Accepted file formats: <strong>JPG, PNG, GIF</strong>.</li>
        <li>Maximum file size: <strong>5MB</strong>.</li>
        <li>Recommended dimensions: <strong>1200x800 pixels</strong>.</li>
        <li>Ensure the image is clear and not blurry.</li>
        <li>Avoid uploading copyrighted or offensive content.</li>
        <li>Do not use special characters in the file name.</li>
        <li>Preview your image before submitting.</li>
      </ul>
    </div>
    
        </div>
    
  </div>




<div className="flex flex-col h-[20%] justify-center items-center w-full rounded-md shadow-md mt-8 bg-gray-100  p-6">
<div className='flex justify-start w-full'>
<h2 className='font-black '>
Brand And Category

</h2>
</div>
  <div className=" w-full max-w-4xl p-6 ">
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

      <div className="mb-4">
        <label htmlFor="productBrand" className="block text-gray-700 text-sm font-semibold mb-2">
          Brand
        </label>
        <select
          id="productBrand"
          value={productBrand}
          onChange={(e) => setProductBrand(e.target.value)}
          required
          className="shadow-lg bg-gray-100 focus:bg-white appearance-none border rounded-md w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-secondaryLight focus:shadow-lg transition-all duration-300 ease-in-out"
        >
          <option value="" disabled>
            Select Brand
          </option>
          {brands.length > 0 ? (
            brands.map((brand) => (
              <option key={brand.id} value={brand.id}>
                {brand.name}
              </option>
            ))
          ) : (
            <option value="" disabled>
              No brands available
            </option>
          )}
        </select>
      </div>

  
      <div className="mb-4">
        <label htmlFor="productCategory" className="block text-gray-700 text-sm font-semibold mb-2">
          Category
        </label>
        <select
          id="productCategory"
          value={productCategory}
          onChange={(e) => setProductCategory(e.target.value)}
          required
          className="shadow-lg bg-gray-100 focus:bg-white appearance-none border rounded-md w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-secondaryLight focus:shadow-lg transition-all duration-300 ease-in-out"
        >
          <option value="" disabled>
            Select Category
          </option>
          {categories.length > 0 ? (
            categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))
          ) : (
            <option value="" disabled>
              No categories available
            </option>
          )}
        </select>
      </div>
    </div>
  </div>
</div>


  </div>
        </div>

{/* stock  and price  */}

<div className="flex mt-10 items-center justify-end col w-full">
          <button
            type="submit"
            className="bg-primary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
            Add Product
          </button>
        </div>

        
      </form>
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

export default AddProduct;
