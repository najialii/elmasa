import React, { useEffect, useState, useContext } from 'react';
import LikeButton from '../../components/like';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/cart';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Plus } from '@phosphor-icons/react';
import useFetch from '../../components/hooks/usefetch';
import Pcard from './pcards';
const ProductCard = ({ categoryName }) => {
//   const navigate = useNavigate();
//   const [products, setProducts] = useState([]);

//   const {data , loading ,error} = useFetch('http://localhost:8000/api/products')
//   console.log("Fetched data:", data);

//   const { cartItems, addToCart, removeFromCart, clearCart, getCartTotal } = useContext(CartContext);
  
 


//   if (loading) return <div className=" h-screen w-screen flex justify-center items-center"> <svg xmlns="http://www.w3.org/2000/svg" class="w-10 animate-[spin_0.8s_linear_infinite] fill-blue-600 block mx-auto"
//   viewBox="0 0 24 24">
//   <path
//     d="M12 22c5.421 0 10-4.579 10-10h-2c0 4.337-3.663 8-8 8s-8-3.663-8-8c0-4.336 3.663-8 8-8V2C6.579 2 2 6.58 2 12c0 5.421 4.579 10 10 10z"
//     data-original="#000000" />
// </svg>;</div>

//   if (error) return <div>{error}</div>;

//   return (
// <Pcard products={data} addToCart={() => addToCart() }  removeFromCart={removeFromCart} handelProductDetails={handelProductDetails} />

//   );
};

export default ProductCard;
