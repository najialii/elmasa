import LikeButton from '../../components/like';
import { ShoppingCartSimple , MinusCircle, PlusCircle } from '@phosphor-icons/react';
import { useState } from 'react';
import { useContext } from 'react';
import { CartContext } from '../../context/cart';
import { useNavigate } from 'react-router-dom';

const Pcard = ({ products,   }) => {
  const navigate = useNavigate()
  const [imageloaded,setImageloaded] = useState({})
  const [productCounts, setProductCounts] = useState({});
  const { cartItems, addToCart, removeFromCart } = useContext(CartContext);
  const handelProductDetails = (product) => {
    console.log('Navigating to product:', product); 
    navigate(`/product/${product.id}`, { state: { product } });
  };
  
  if (!products?.products?.data || products.products.data.length === 0) {
    return (
      <div className="h-screen w-screen flex justify-center bg-transparent items-center">
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
    <div className='flex justify-center '>
      <div className="grid  grid-cols-2  sm:grid-cols-2 lg:grid-cols-5  sm:gap-1 font-cairo lg:gap-12 ">
        {products.products.data.map((product) => {
          let images = [];
          try {
            images = JSON.parse(product.img);
          } catch (error) {
            console.error('Invalid JSON format for images:', product.img);
          }
          // console.log("immmmmmmmmmmmmmmmm", "https://elmasafoods.com//storage/"+ JSON.parse(product.img))

          const productQuantity = productCounts[product.id] || 0;

          return (
            <div
              key={product.id}
              className=" hover:shadow-2xl p-4 cursor-pointer lg:rounded-xl 
                border border-gray-200 bg-white transition-shadow duration-500 flex flex-col lg:w-56"
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
          : `https://elmasafoods.com//storage/${imageUrl}`;
      } catch (error) {
        console.error("Invalid JSON format for images:", product.img);
        return "https://elmasafoods.com//storage/default-image.jpg"; 
      }
    })()
  }
  alt={product.name}
  className="w-fit object-cover h-32 sm:h-56 lg:h-fit rounded-md mb-4"
/>
              </div>
              <div>
                <h3 className="text-gray-400">Brand: Elmasa</h3>
                <h3 className="cursor-pointer text-gray-700 font-bold hover:underline truncate">
                  {product.name}
                </h3>
                <h3 className="text-gray-500">300 gm</h3>
              </div>
              <p className="text-primary font-bold text-xl text-right" dir="rtl">
  {product.price} ج.م
</p>
              <div className="flex justify-center items-center mt-4 flex-grow">
                {productQuantity > 0 ? (
                  <div
                    className="flex items-center justify-between gap-2 bg-lime-100 rounded-xl p-2 w-64 
                    animate-scaleIn"
                  >
                    <button
                      onClick={() => handleDecrement(product)}
                      className="h-10 w-10 text-secondaryDark rounded-full flex items-center justify-center 
                      hover:scale-110 transition-transform duration-200 ease-in-out"
                    >
                      <MinusCircle size={40} color="#8EA123" />
                    </button>
                    <span
                      className="text-xl font-bold transform transition-transform duration-200 ease-in-out"
                    >
                      <span className="text-secondaryDark">{productQuantity}</span>
                    </span>
                    <button
                      onClick={() => handleIncrement(product)}
                      className="h-10 w-10 rounded-full font-bold flex items-center justify-center 
                      hover:scale-110 transition-transform duration-200 ease-in-out"
                    >
                      <PlusCircle size={40} color="#8EA123" />
                    </button>
                  </div>
                ) : (
                  <button
                  onClick={() => handleAddToCart(product)}
                    className="flex items-center justify-center gap-2 relative h-10 rounded-md
                    w-40 overflow-hidden  bg-primary font-bold text-sm text-white "
                  >
                    <ShoppingCartSimple  size={15} color="#fff" />
                    اشترِ الآن
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
