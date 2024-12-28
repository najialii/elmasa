import React, { useEffect, useState, useContext } from 'react';
import Slider from 'react-slick';
import LikeButton from '../../components/like';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/cart';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Basket, Fire } from '@phosphor-icons/react';
const Offers = ({ categoryName }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const targetTime = new Date('2024-12-31T23:59:59'); // Set target time (for example, end of the year)
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining(targetTime));

  // Function to calculate the remaining time
  function calculateTimeRemaining(targetTime) {
    const now = new Date();
    const timeDiff = targetTime - now; // Get the difference in milliseconds

    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  }

    // Update countdown every second
    useEffect(() => {
      const timer = setInterval(() => {
        setTimeRemaining(calculateTimeRemaining(targetTime));
      }, 1000);
  
      // Clear interval when countdown reaches zero
      return () => clearInterval(timer);
    }, [targetTime]);



  const notify = () => toast("Added to the cart!");

  const { cartItems, addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `http://localhost/masa/api/content/items/products?populate=*`
        );
        const data = await response.json();
        const cleanedData = Array.isArray(data)
          ? data.map((product) => ({
              id: product._id,
              name: product['productname ']?.trim() || 'Unnamed Product',
              price: product.productprice || 'N/A',
              image:
                Array.isArray(product.productpic)
                  ? product.productpic[0]?.path
                  : product.productpic?.path,
              category: product.category || null,
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
  }, [categoryName]);

  const handleProductDetails = (product) => {
    navigate(`/product/${product.id}`, { state: { product } });
  };

  if (loading) return <div className="h-screen w-screen flex justify-center items-center"> <svg xmlns="http://www.w3.org/2000/svg" className="w-10 animate-[spin_0.8s_linear_infinite] fill-blue-600 block mx-auto" viewBox="0 0 24 24"><path d="M12 22c5.421 0 10-4.579 10-10h-2c0 4.337-3.663 8-8 8s-8-3.663-8-8c0-4.336 3.663-8 8-8V2C6.579 2 2 6.58 2 12c0 5.421 4.579 10 10 10z" data-original="#000000" /></svg>;</div>;

  if (error) return <div>{error}</div>;

  const sliderSettings = {

    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    margin: 4,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          margin: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className=" bg-backGround p-4">
      <div className='bg-[#f2fce9] '>
      <div className='bg-[rgb(188,239,144)] my-3 w-full h-12'>
      <div className=' flex  items-center justify-between mx-2'>
        <h2 className='flex gap-2 font-black text-primary text-2xl my-2'>
        <Fire size={32} weight='fill' color="#214C4F" /> mega sale 
        </h2>
  
        <div className="text-xl text-gray-800 my-2 ">
          <span className="text-xl text-primary">{timeRemaining.days}d </span> :
          <span className="text-xl text-primary">{timeRemaining.hours}h </span> :
          <span className="text-xl text-primary">{timeRemaining.minutes}m</span> :
          <span className="text-xl text-primary">{timeRemaining.seconds}s</span>
        </div>
       
        </div>
      </div>
      </div>

      <Slider {...sliderSettings}>
        {products.map((product) => (
          <div key={product.id} className="">
            <div className="bg-seclightt shadow hover:shadow-2xl p-4 rounded-md  w-full lg:w-[586px]  duration-300">
              <div className="flex ">
                <div className="flex-shrink-0 border items-center ">
                  <img
                    src={`http://localhost/masa/storage/uploads${product.image}`}
                    alt={product.name}
                    className="w-20 lg:w-36 lg:h-36 h-20 object-cover rounded-lg"
                  />
                </div>
                <div className="ml-4 flex flex-col  justify-between flex-1">
    
                  <h3 className="text-lg text-gray-400">Elmasa</h3>
                  <h3
                    onClick={() => handleProductDetails(product)}
                    className="text-lg font-bold cursor-pointer hover:text-primary hover:underline"
                  >
                    {product.name}
                  </h3>
                  <p className="text-primary font-bold text-xl">{product.price} EGP</p>
                  <div className="flex justify-center items-center mt-4">
                    <button
                      onClick={() => {
                        addToCart(product);
                        notify();
                      }}
                      className="flex items-center justify-center gap-2 relative h-10 rounded-sm w-full overflow-hidden  bg-secondaryLight text-white shadow-2xl transition-all"
                    >
                      <Basket size={20} color="#fff" />
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
      <ToastContainer />
    </div>
  );
};

export default Offers;
