  import React, { useContext, useState, useEffect } from 'react';
  import { useLocation, useParams } from 'react-router-dom';
  import LikeButton from '../../components/like';
  import { CartContext } from '../../context/cart';
  import { CalendarBlank, Flag, CheckCircle, ShareNetwork, FacebookLogo ,
     ShoppingCartSimple, MinusCircle , PlusCircle,
    WhatsappLogo, XLogo, InstagramLogo,MagnifyingGlassPlus} from '@phosphor-icons/react';
  import milk from '../../assets/imgs/miokmilk.png';
  import ProductCard from './pcard';
  import { ToastContainer, toast, Bounce } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css'; 
  import masaseoil from '../../assets/imgs/zeetfool.png'
  import ImageZoom from "react-image-zooom";
  const VITE_IMAGE_URL = import.meta.env.VITE_IMAGE_STORAGE_URL
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  
  
  const PPage = () => {
    const location = useLocation();
    const { product: initialProduct } = location.state || {};
    const { id } = useParams();
    const [productCounts, setProductCounts] = useState({});
    const [product, setProduct] = useState(initialProduct || null);
    const [mainImage, setMainImage] = useState(initialProduct ? JSON.parse(initialProduct.img)[0] : null);
    const [feedback, setFeedback] = useState('');
    const [loading, setLoading] = useState(false);
    const { cartItems, addToCart, removeFromCart, clearCart, getCartTotal } = useContext(CartContext);
    const [zoomed, setZoomed] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);



    const toggleDropdown = () => {
      setIsDropdownOpen(!isDropdownOpen);
    };

    const handleZoomClick = () => {
      setZoomed(!zoomed);
    };
    
  const productId = id
    const fetchProduct = async (productId) => {
      setLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/product/${productId}`);
        const data = await response.json();
        setProduct(data.data);
        console.log("ahhhhhhhhhhh", data.data)
        console.log("alrwabi")
        setMainImage(data.data.img ? JSON.parse(data.data.img)[0] : null); 
      } catch (error) {
        console.error('Error fetching product:', error);
      }
      setLoading(false);
    };

    
    const handleAddToCart = (product) => {
      setProductCounts((prev) => ({
        ...prev,
        [product.id]: (prev[product.id] || 0) + 1,
      }));
      addToCart(product);
      console.log("clicked")
    };

    const handleIncrement = (product) => {
      setProductCounts((prev) => ({
        ...prev,
        [product.id]: (prev[product.id] || 0) + 1, 
      }));
      addToCart(product);
    };
    
    const handleDecrement = (product) => {
      setProductCounts((prev) => {
        const newCount = (prev[product.id] || 1) - 1;
        if (newCount <= 0) {
          const { [product.id]: _, ...rest } = prev; 
          return rest;
        }
        return { ...prev, [product.id]: newCount };
      });
      removeFromCart(product);
    };
    
    const productQuantity = product ? productCounts[product.id] || 0 : 0;


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
      <div dir='rtl' className="bg-white text-gray-900 h-full w-full">
        <div className=" lg:max-w-7xl  max-w-2xl ">
          <div className="lg:grid grid-cols-1  lg:grid-cols-2  items-center justify-center lg:gap-2 bg-transparent  lg:mx-20">
            <div className=" h-full text-center bg-white flex justify-center p-4 ">
              <div className="overflow-hidden w-full h-full transition-all duration-300">
                {/* <div className='flex'>

              <h2 className="lg:hidden block w-full  lg:text-5xl text-2xl font-md text-gray-800">{product.name}</h2>
              <button>

              <ShareNetwork size={28} weight='thin' color="#000" />
              </button>
              </div>
              */}

<div
  onClick={handleZoomClick}
  className={`bg-white w-full  lg:w-full lg:py-0 py-7 flex justify-center flex-col items-center transition-all duration-300`}
>
  <ImageZoom
     className = {`zoom-container h-full  ${
      zoomed ? '' : ''
    } `}
    
    src={(() => {
      try {
        const parsedImg = JSON.parse(product.img);
        const imageUrl = Array.isArray(parsedImg) ? parsedImg[0] : parsedImg;
        return imageUrl.startsWith("http")
          ? imageUrl
          : `${VITE_IMAGE_URL}/${imageUrl}`;
      } catch (error) {
        console.error("Invalid JSON format for images:", product.img);
        return "http://localhost:8000/storage/default-image.jpg";
      }
    })()}

    zoom={150}
    zoomMargin={25}
   
    alt={product.name}
  />

  {!zoomed && (
    <div className="flex justify-center">
      <div className="text-gray-800 mt-12 animate-fadeIn p-2 rounded-xl w-60 flex justify-center">
        <h2 className="flex items-center gap-2 animate-bounce">
          انقر لتكبير الصورة <MagnifyingGlassPlus size={20} weight="fill" />
        </h2>
      </div>
    </div>
  )}
</div>


              {/* <img
              // src={masaseoil}
    // src={
    //   (() => {
    //     try {
    //       const parsedImg = JSON.parse(product.img); 
    //       const imageUrl = Array.isArray(parsedImg) ? parsedImg[0] : parsedImg; 
    //       return imageUrl.startsWith("http")
    //         ? imageUrl
    //         : `${VITE_IMAGE_URL}/${imageUrl}`;
    //     } catch (error) {
    //       console.error("Invalid JSON format for images:", product.img);
    //       return "http://localhost:8000/storage/default-image.jpg"; 
    //     }
    //   })()
    // }

  className="w-[full] object-cover h-full mb-4"
  /> */}
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
            <div className="w-full bg-white  rounded-md p-6 ">
    <div>
      <div dir='rtl' className="flex w-full justify-between items-center lg:mx-2 mb-4">
        <h2 className="w-[90%] lg:text-4xl font-bold text-2xl font-md text-gray-800">{product.name}</h2>
        <button onClick={toggleDropdown}>
<span className='lg:mb-12'>

        <ShareNetwork size={28} weight='thin' color="#000" />
</span>
        </button>

        {isDropdownOpen && (
        <div dir='rtl'
          className="z-10 absolute animate-scaleIn   lg:mt-48 mt-48 left-0 right-6  bg-white divide-y divide-gray-100 rounded-lg shadow w-32 mx-12 lg:px-2 dark:bg-gray-700"
          onClick={() => setIsDropdownOpen(false)} // Close dropdown on click
        >
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
            {/* Social media links */}
            <li className='flex items-center hover:bg-gray-100 justify-between'>
              <a
                href="https://www.facebook.com/sharer/sharer.php?u=yourURL"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                فيسبوك  
              </a>
              <FacebookLogo size={28} weight="regular" color='#81c6ca' />
            </li>
            <li className='flex items-start hover:bg-gray-100 justify-between'>
              <a
                href="https://twitter.com/intent/tweet?url=yourURL"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                تويتر
              </a>
                <InstagramLogo size={28} weight="regular" color='#81c6ca' />
            </li>
            <li className='flex items-center hover:bg-gray-100 justify-between'>
              <a
                href="https://www.linkedin.com/shareArticle?mini=true&url=yourURL"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                لينكد إن
              </a>
            <XLogo size={28} weight="regular" color='#81c6ca' />
            </li>
            <li className='flex items-center hover:bg-gray-100 dark:hover:bg-gray-600 justify-between'>
              <a
                href="https://api.whatsapp.com/send?text=yourURL"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-2   dark:hover:text-white"
              >
                واتساب
              </a>
            <WhatsappLogo size={28} weight="regular" color='#81c6ca' />
            </li>
          </ul>
        </div>
      )}

      </div>
    </div>

    <div className="mt-8 flex flex-col lg:gap-4 gap-12">
      <div>
        <div className="flex w-full lg:mx-4 justify-between items-center">
        
          <strong dir='rtl' className="text-3xl font-black text-secondary uppercase">{product.price} ج.م</strong>
          
          <span className="flex gap-2 p-2 rounded-md  items-center font-extrabold">
            <CheckCircle size={28} color="#4cc854" weight="fill" /> متوفر
          </span>
        </div>
        <div className=' mt-8 '>

          <strong className="text-xl mx-4 font-extralight mt-20 text-gray-800 uppercase">  
            %{product.discount } 
            </strong>
            
        </div>
      </div>

      {/* <div className="flex justify-center">
          <strong className="text-xl font-bold text-primary">{product.discount} % off</strong>
        </div> */}
    </div>


    

    <div className="my-8 lg:mx-4 ">
      <div className="flex lg:flex-nowrap   p-2 justify-center gap-2 ">
        <div className=" text-gray-600   w-full sm:w-1/3 h-20 flex flex-col justify-center items-center ">
          
          <Flag size={28} weight='fill' color="#81c6ca" />
          <h2 className=" text-sm">بلد المنشاء</h2>
          <h2 className="text-primary text-lg font-extrabold">{product.origin_country}</h2>

        </div>
        <div className=" text-gray-600   w-full sm:w-1/3 h-20 flex flex-col justify-center items-center ">
          <CalendarBlank size={28} weight='fill' color="#81c6ca" />
          <h2 className="font-bold text-sm">تاريخ الانتهاء</h2>
          <h2 className="text-primary font-extrabold">{product.expiration_date}</h2>
        </div>
        <div className=" text-gray-600   w-full sm:w-1/3 h-20 flex flex-col justify-center items-center ">
          <CheckCircle size={28} weight='fill' color="#81c6ca" />
          <h2 className="font-bold text-sm">الكمية</h2>
          <h2 className="text-primary font-extrabold">{product.stock}</h2>
        </div>
      </div>
    </div>
    <div className="flex justify-start items-center mt-6 mx-4  flex-grow transition-all duration-500 ease-in-out transform ">
                  {productQuantity > 0 ? (
                    <div dir='rtl'
                      className="flex items-center mt-12 justify-between gap-2 border w-40
                      border-primary rounded-xl p-2   
                      animate-scaleIn"
                    >
                      <button
                        onClick={() => handleDecrement(product)}
                        className="h-10 w-10 text-gray-800 rounded-full flex items-center justify-center 
                        hover:scale-110 transition-transform duration-200 ease-in-out"
                      >
                        <MinusCircle size={40} color="#050505" />
                      </button>
                      <span
                        className="text-xl font-bold transform transition-transform duration-200 ease-in-out"
                      >
                        <span className="text-gray-">{productQuantity}</span>
                      </span>
                      <button
                        onClick={() => handleIncrement(product)}
                        className="h-10 w-10 rounded-full font-bold flex items-center justify-center 
                        hover:scale-110 transition-transform duration-200 ease-in-out"
                      >
                        <PlusCircle size={40} color="#050505" />
                      </button>
                    </div>
                  ) : (
                    <button
                    onClick={() => handleAddToCart(product)}
                      className="flex items-center justify-center gap-2 relative h-10 rounded-md lg:mt-8
                      w-40 overflow-hidden  bg-primary font-bold text-sm text-white animate-fadeIn transition-all duration-500 ease-in-out transform flex-shrink "
                    >
                      <ShoppingCartSimple  size={18} weight='bold' color="#fff" />
                      اشترِ الآن
                    </button>
                  )}
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

          <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 lg:gap-4 gap-8 lg:mx-auto">
            <div className=" bg-white p-4 rounded-md lg:mx-12">
              <h3 className="text-2xl font-semibold text-gray-900">وصف المنتج</h3>
              <p className="text-gray-900 mt-4">{product.description}</p>
            </div>

            <div className=" bg-white p-4 rounded-md shadow-md lg:mx-0 mx-4">
              <div className="space-y-4">
                <h4 className="text-2xl font-semibold text-gray-900"> 
                حقائق غذائية
                </h4>
                <p className="text-gray-600">Per 100g Serving</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 mt-6">

                  {[
                    
    { name: 'السعرات الحرارية', value: '240 كيلو كالوري' },
    { name: 'إجمالي الدهون', value: '12 جم' },
    { name: 'الدهون المشبعة', value: '3.5 جم' },
    { name: 'الدهون المتحولة', value: '0 جم' },
    { name: 'الكوليسترول', value: '45 ملجم' },
    { name: 'الصوديوم', value: '430 ملجم' },
    { name: 'إجمالي الكربوهيدرات', value: '19 جم' },
    { name: 'الألياف الغذائية', value: '3 جم' },
    { name: 'السكريات', value: '4 جم' },
    { name: 'البروتين', value: '22 جم' }

                  ].map((nutrient, index) => (
                    <div
                    key={index}
                    className="flex justify-between items-center px-4 py-2 border-b border-gray-200 last:border-0"
                  >
                    <span className="text-gray-700 text-base">{nutrient.name}</span>
                    <span className="text-gray-800 text-base font-medium">{nutrient.value}</span>
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
