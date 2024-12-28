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
    console.log('Navigating to product:', product); // Log to see if product is correct
    navigate(`/product/${product.id}`, { state: { product } });
  };
  
  if (!products?.products?.data || products.products.data.length === 0) {
    return (
      <div className="h-screen w-screen flex justify-center bg-transparent items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-10 animate-[spin_0.8s_linear_infinite] fill-blue-600 block mx-auto"
          viewBox="0 0 24 24"
        >
          <path
            d="M12 22c5.421 0 10-4.579 10-10h-2c0 4.337-3.663 8-8 8s-8-3.663-8-8c0-4.336 3.663-8 8-8V2C6.579 2 2 6.58 2 12c0 5.421 4.579 10 10 10z"
          />
        </svg>
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
    <div>
      <div className="grid overflow-x-hidden grid-cols-2  sm:grid-cols-2 lg:grid-cols-5 xl:grid-cols-3 sm:gap-1 font-cairo lg:gap-2 ">
        {products.products.data.map((product) => {
          let images = [];
          try {
            images = JSON.parse(product.img);
          } catch (error) {
            console.error('Invalid JSON format for images:', product.img);
          }
          console.log(images)

          const productQuantity = productCounts[product.id] || 0;

          return (
            <div
              key={product.id}
              className="bg-white hover:shadow-2xl p-4 cursor-pointer lg:rounded-xl 
                border border-gray-200 transition-shadow duration-500 flex flex-col lg:w-56"
            >
              <div onClick={() => handelProductDetails(product)} className="flex justify-center">
                <img
                  src={images[0] || 'https://place-hold.it/300'}
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
