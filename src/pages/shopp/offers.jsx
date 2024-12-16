import React, { useEffect, useState, useContext } from 'react';
import Slider from 'react-slick';
import LikeButton from '../../components/like';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/cart';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Offers = ({ categoryName }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <div className="h-screen w-screen flex justify-center items-center">Loading...</div>;
  if (error) return <div>{error}</div>;


  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
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
    <div className="">
      <Slider {...sliderSettings}>
        {products.map((product) => (
          <div key={product.id} className="p-4">
            <div className="bg-white shadow hover:shadow-2xl p-4

             rounded-xl  transition-shadow w-56 duration-300">
              <div className="flex justify-end">
                <LikeButton />
              </div>
              <img
                src={`http://localhost/masa/storage/uploads${product.image}`} 
                alt={product.name}
                className="lg:w-full w-52 object-cover h-auto"
              />
              <h3 className="text-lg text-gray-400">Elmasa</h3>
              <h3 
                onClick={() => handleProductDetails(product)}
                className="text-lg font-bold cursor-pointer hover:text-primary hover:underline"
              >
                {product.name}
              </h3>
              <p className="text-gray-600">{product.price} EGP</p>
              <div className="flex justify-center items-center mt-8">
                <button
                  onClick={() => {
                    addToCart(product);
                    notify();
                  }}
                  className="flex items-center justify-center gap-2 relative h-10 rounded-xl
                   w-52 overflow-hidden border border-secondary bg-secondary text-white shadow-2xl transition-all"
                >
                  Buy Now
                </button>
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
