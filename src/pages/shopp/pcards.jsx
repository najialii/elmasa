import LikeButton from '../../components/like';
import { ShoppingCartSimple , MinusCircle, PlusCircle } from '@phosphor-icons/react';
import { useState } from 'react';
import { useContext } from 'react';
import { CartContext } from '../../context/cart';
import { useNavigate } from 'react-router-dom';
import masaseoil from '../../assets/imgs/zeetfool.png'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import ProductCardSkeleton from './Skecard';
const VITE_IMAGE_URL = import.meta.env.VITE_IMAGE_STORAGE_URL

const Pcard = ({ products }) => {
  const navigate = useNavigate()
  const [imageloaded,setImageloaded] = useState({})
  const [productCounts, setProductCounts] = useState({});
  const {showQtyMode , setshowQtyMode} = useState(false)
  const handelProductDetails = (product) => {
    console.log('Navigating to product:', product); 
    navigate(`/product/${product.id}`, { state: { product } });
  };  const { cartItems, addToCart, removeFromCart, clearCart, getCartTotal } = useContext(CartContext);
  
  if (!products?.products?.data) {
    return (
      <div dir="rtl" className="flex justify-center">
        <div className="grid grid-cols-2 gap-y-3 sm:grid-cols-2 lg:grid-cols-4 sm:gap-1 gap-4 font-cairo lg:gap-10">
          {Array.from({ length: 4 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

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
  

  return (
    <div dir='rtl' className='flex justify-center '>
      <div className="grid  grid-cols-2  gap-y-3  sm:grid-cols-2 lg:grid-cols-4 sm:gap-1 gap-4 font-cairo lg:gap-10 ">
        {products.products.data.map((product) => {
          let images = [];
          try {
            images = (product.img);
          } catch (error) {
            console.error('Invalid JSON format for images:', product.img);
          }
          // console.log("immmmmmmmmmmmmmmmm", "https://elmasafoods.com//storage/"+ JSON.parse(product.img))

          const productQuantity = productCounts[product.id] || 0;

          return (
            <div
              key={product.id}
              className=" hover:shadow-2xl p-4 cursor-pointer lg:rounded-md rounded-md
                shadow-md bg-white transition-shadow duration-500 flex flex-col lg:w-60"
            >
              <div onClick={() => handelProductDetails(product)} className="flex justify-center">
              <img
  src={
    (() => {
      try {
        const parsedImg = JSON.parse(product.img); 
        const imageUrl = Array.isArray(parsedImg) ? parsedImg[0] : parsedImg; 
        return imageUrl.startsWith("http")
          ? imageUrl
          : `${VITE_IMAGE_URL}/${imageUrl}`;
      } catch (error) {
        console.error("Invalid JSON format for images:", product.img);
        return "https://elmasafoods.com//storage/default-image.jpg"; 
      }
    })()
  }
  alt={product.name}
  className="w-fit object-cover h-32 sm:h-56 lg:h-fit rounded-md mb-4"
/>
{/* <img src={masaseoil} className='w-full h-full' alt="" srcset="" /> */}
              </div>
              <div>
               
                <h3 className="cursor-pointer text-gray-900 font-extrabold hover:underline truncate">
                  {product.name}
                </h3>
                {/* <h3 className="text-gray-500">300 gm</h3> */}
              </div>
              <p className="text-primary font-bold text-xl text-right" dir="rtl">
  {product.price} ج.م
</p>
              <div className="flex justify-center items-center mt-4 flex-grow transition-all duration-500 ease-in-out transform ">
                {productQuantity > 0 ? (
                    <div
                                     className="flex items-center justify-between gap-2 border lg:w-56 w-full
                                      border-primaryLight rounded-xl p-2  
                                     animate-scaleIn"
                                   >
                                     <button
                                       onClick={() => handleDecrement(product)}
                                       className="h-10 w-10 text-gray-800 rounded-full border-primary flex items-center justify-center 
                                       hover:scale-110 transition-transform duration-200 ease-in-out"
                                     >
                                       <MinusCircle weight='regular' size={32} color="#81c6ca" />
                                     </button>
                                     <span
                                       className="text-base font-bold transform transition-transform duration-200 ease-in-out"
                                     >


                                       <span className="text-gray-900 ">{productQuantity}</span>
                                     </span>
                                     <button
                                       onClick={() => handleIncrement(product)}
                                       className="h-10 w-10 rounded-full  font-bold flex items-center justify-center 
                                       hover:scale-110 transition-transform duration-200 ease-in-out"
                                     >
                                       <PlusCircle weight='regular' size={32} color="#81c6ca" />
                                     </button>
                                   </div>
                ) : (
                  <button
                                   onClick={() => handleAddToCart(product)}
                                     className="flex items-center justify-center gap-2 relative h-10 rounded-md
                                     w-40 overflow-hidden  bg-primary  lg:text-base text-sm text-white animate-fadeIn transition-all duration-500 ease-in-out transform flex-shrink "
                                   >
                                     <ShoppingCartSimple  size={18} weight='fill' color="#fff" />
                                     اضف للسلة
                                   </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Pcard;
