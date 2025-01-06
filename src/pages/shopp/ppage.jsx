import React, { useContext, useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import LikeButton from '../../components/like';
import { CartContext } from '../../context/cart';
import { CalendarBlank, Flag, CheckCircle } from '@phosphor-icons/react';
import milk from '../../assets/imgs/miokmilk.png';
import ProductCard from './pcard';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

const PPage = () => {
  const location = useLocation();
  const { product: initialProduct } = location.state || {};
  const { id } = useParams();
  
  const [product, setProduct] = useState(initialProduct || null);
  const [mainImage, setMainImage] = useState(initialProduct ? JSON.parse(initialProduct.img)[0] : null);
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);

  const { addToCart } = useContext(CartContext);

  const fetchProduct = async (productId) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8000/api/product/${productId}`);
      const data = await response.json();
      setProduct(data.data);
      setMainImage(data.data.img ? JSON.parse(data.data.img)[0] : null); 
    } catch (error) {
      console.error('Error fetching product:', error);
    }
    setLoading(false);
  };
  

  useEffect(() => {
    if (id) {
      fetchProduct(id); 
    }
  }, [id]);

  const handleBuyNowClick = () => {
    addToCart(product);
    toast.success(  <div className='text-xl font-bold text-center' dir="rtl">تم الإضافة إلى السلة!</div>, {
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
  };

  const handleThumbnailClick = (image) => {
    setMainImage(image);
  };
  if (loading) {
    return (
        <div className="flex justify-center items-center h-screen w-screen">
            <div className="loading">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    );
}

  if (!product) {
    return <div className="text-center py-10 text-white">No product details available</div>;
  }

  return (
    <div className="bg-backGround text-gray-900 h-full">
      <div className="lg:max-w-7xl max-w-2xl mx-auto lg:py-16">
        <div className="lg:grid grid-cols-1 shadow-md lg:grid-cols-3 items-center justify-center lg:gap-2 bg-transparent">
          <div className=" h-full text-center relative bg-white p-4 ">
            <div className="overflow-hidden  transition-all duration-300">
            <img
  src={
    (() => {
      try {
        const parsedImg = JSON.parse(product.img); 
        const imageUrl = Array.isArray(parsedImg) ? parsedImg[0] : parsedImg; 
        return imageUrl.startsWith("http")
          ? imageUrl
          : `http://localhost:8000/storage/${imageUrl}`;
      } catch (error) {
        console.error("Invalid JSON format for images:", product.img);
        return "http://localhost:8000/storage/default-image.jpg"; 
      }
    })()
  }
  alt={product.name}
 className="w-full object-cover h-full mb-4"
/>
            </div>
            {/* <div className="flex justify-center gap-2 mt-4">
              {JSON.parse(product.img).map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-16 h-20 object-cover cursor-pointer transition-all duration-300 hover:scale-105"
                  onClick={() => handleThumbnailClick(image)}
                />
              ))}
            </div> */}
          </div>

          <div className="col-span-2 lg:mt-0 bg-white rounded-md p-6">
            <div className='flex gap-6'> 

            <h2 className="text-4xl font-semibold text-gray-800">{product.name}</h2>
            <h3 className="text-XL font-light text-gray-800 mt-2">{product.size}</h3>

            </div>
            
            <div className="mt-8 flex flex-col gap-4">
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center mx-8">
    <div className='flex flex-col'>
      <p className="text-gray-800">Price Now</p>
      <p className="text-gray-500 text-sm">Includes tax</p>
    </div>
    <div className='flex w-full justify-center'>
      <strong className="text-2xl font-black text-primary uppercase">{product.price} EGP</strong>
    </div>
  </div>
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center mx-8">
    <div className='flex flex-col'>
      <p className="text-gray-800">Discount</p>
    </div>
    <div className='flex justify-center'>
      <strong className="text-xl font-bold text-primary">{product.discount} % off</strong>
    </div>
  </div>
</div>

     

<div className="my-8 mx-4 lg:mx-20">
  <div className="flex lg:flex-nowrap flex-wrap justify-center gap-4 mt-10">
    <div className="bg-gray-100 w-full sm:w-1/3 h-20 flex flex-col justify-center items-center rounded-xl">
      <Flag size={22} color="#027384" />
      <h2 className="font-bold text-sm">Origin country</h2>
      <h2 className="text-primary font-extrabold">{product.origin_country}</h2>
    </div>
    <div className="bg-gray-100 w-full sm:w-1/3 h-20 flex flex-col justify-center items-center rounded-xl">
      <CalendarBlank size={22} color="#027384" />
      <h2 className="font-bold text-sm">Expiry date</h2>
      <h2 className="text-primary font-extrabold">{product.expiration_date}</h2>
    </div>
    <div className="bg-gray-100 w-full sm:w-1/3 h-20 flex flex-col justify-center items-center rounded-xl">
      <CheckCircle size={22} color="#027384" />
      <h2 className="font-bold text-sm">Availability</h2>
      <h2 className="text-primary font-extrabold">{product.stock}</h2>
    </div>
  </div>
</div>



            {/* {feedback && (
              <div className="fixed top-0 left-0 w-full bg-green-500 text-white text-center py-2 z-50">
                {feedback}
              </div>
            )} */}

            <div className=" bottom-0 flex items-center justify-start space-x-4">
              <button
                onClick={handleBuyNowClick}
                className="min-w-full px-6 py-3 border bg-primary text-secondaryLight text-xl font-semibold rounded-xl
                 transition-all"
              >
                    اشترِ الآن
              </button>
              {/* <button
                type="button"
                className="min-w-fit px-6 py-3 border border-gray-600 bg-transparent text-gray-600 text-sm font-semibold rounded-xl hover:bg-gray-200 transition-all"
              >
                Add To Cart
              </button> */}
            </div>
          </div>

          {/* <div className="lg:col-span-2 h-full bg-white rounded-md p-4">
          <div className='bg-gray-100 p-4 rounded-md'>

  <div className='flex items-center justify-center'>
    <h2 className='text-primary text-xl font-bold'>
      Additional Information
    </h2>
  </div>

  
  <div className='flex flex-col gap-4 mt-4'>
    <div className='flex justify-between mx-2 my-3 border-b border-gray-400 pb-3'>
      <h2 className='font-bold text-gray-700'>Category</h2>
      <h2 className='text-gray-600'>{product.category.name}</h2>
    </div>

    <div className='flex justify-between mx-2 my-3 border-b border-gray-400 pb-3'>
      <h2 className='font-bold text-gray-700'>Cartoon</h2>
      <h2 className='text-gray-600'>{product.category.name}</h2>
    </div>

    <div className='flex justify-between mx-2 my-3 border-b border-gray-400 pb-3'>
      <h2 className='font-bold text-gray-700'>Another Category</h2>
      <h2 className='text-gray-600'>{product.category.name}</h2>
    </div>
  </div>
</div>


          </div> */}
        </div>

        <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-2">
          <div className=" bg-white p-4 rounded-md">
            <h3 className="text-2xl font-semibold text-gray-800">About the Product</h3>
            <p className="text-gray-700 mt-4">{product.description}</p>
          </div>

          <div className=" bg-white p-4 rounded-md">
            <div className="space-y-4">
              <h4 className="text-2xl font-semibold text-primary">Nutritional Facts</h4>
              <p className="text-gray-600">Per 100g Serving</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 mt-6">

                {[
                  { name: 'Calories', value: '240 kcal' },
                  { name: 'Total Fat', value: '12g' },
                  { name: 'Saturated Fat', value: '3.5g' },
                  { name: 'Trans Fat', value: '0g' },
                  { name: 'Cholesterol', value: '45mg' },
                  { name: 'Sodium', value: '430mg' },
                  { name: 'Total Carbohydrate', value: '19g' },
                  { name: 'Dietary Fiber', value: '3g' },
                  { name: 'Sugars', value: '4g' },
                  { name: 'Protein', value: '22g' },
                ].map((nutrient, index) => (
                  <div key={index} className="flex justify-between items-center py-2 px-4 border-b border-gray-200">
                    <p className="text-lg text-gray-700">{nutrient.name}</p>
                    <p className="text-lg font-medium text-gray-800">{nutrient.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
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
};

export default PPage;
