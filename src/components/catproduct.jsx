  import React, { useEffect, useState, useRef } from "react";
  import Pcard from "../pages/shopp/pcards";
  import { useNavigate } from "react-router-dom";
  import { Star,Lightning } from "@phosphor-icons/react";
  import { WhatsappLogo,ArrowRight,ArrowLeft } from "@phosphor-icons/react";
import axios from "axios";
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const CategoryProducts = () => {
    const effectRan = useRef(false)
    const [category1Products, setCategory1Products] = useState([]);
    const [category2Products, setCategory2Products] = useState([]);
    const [category3Products, setCategory3Products] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchCategoryProducts = async (categoryId, setCategoryProducts) => {
      try {
        const response = await axios.get(`${API_BASE_URL}/products?cid=${categoryId}`);
        console.log("Response data:", response.data);
        
        setCategoryProducts(response.data?.products?.data.slice(0, 5)); 
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    

    useEffect(() => {
      const fetchAllProducts = async () => {
        
        setLoading(true);
        await Promise.all([
          fetchCategoryProducts(1, setCategory1Products),
          fetchCategoryProducts(2, setCategory2Products),
          fetchCategoryProducts(3, setCategory3Products),
        ]);
        setLoading(false);
      };
      if (!effectRan.current) {
        effectRan.current = true
        fetchAllProducts();
      }

    }, []);

    const handleCategoryClick = (categoryId) => {
      navigate(`/category/${categoryId}`);
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

    return (
      <div className="mt-8 lg:mx-12">

      <div dir="rtl" className=' w-full h-12 mb-4 '>
        <div className='flex flex-col items-start justify-end mt-8'>
          <h2 className='flex items-center gap-2 font-black text-primary text-xl'>
            <Star size={20} color="#214C4F" /> فئة مميزة
          </h2>
        </div>
      </div>
    
      <div className=" p-2 relative">
      
        {/* <button className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-secondaryLight text-white p-3 rounded-md shadow-lg z-10">
        <ArrowLeft size={20} color="#fff" />
        </button>
        
        <button className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-secondaryLight text-white p-3 rounded-md shadow-lg z-10">
        <ArrowRight size={20} color="#fff" />
        </button> */}
    
        <Pcard products={{ products: { data: category2Products } }} />
        
        <div className="flex justify-center my-8">
          <button
            className="bg-secondaryLight text-white px-6 text-xl py-2 rounded-lg shadow-md hover:bg-secondary transition"
            onClick={() => handleCategoryClick(1)}
          >
            Show More
          </button>
        </div>
      </div>

      {/* <section class="px-4">
    <div
        class="bg-gradient-to-br from-sky-400 via-sky-400 to-violet-400 p-6 sm:p-10 rounded-2xl w-full text-white flex items-center justify-between max-w-2xl mx-auto mt-20">
        <div class="flex flex-col gap-6">
            <div class="">
                <span class="text-gray-200">Black friday sale</span>
                
                <span class=" text-4xl text-white font-semibold">20% off every Product</span>
            </div>
            <a href="" target="_blank" rel="noreferrer"
                class="text-black bg-white hover:bg-gray-50 px-4 py-2 rounded-lg w-fit  ease duration-300 flex gap-1 items-center group">
                <span>Buy now</span>
                <svg data-v-e660a7a7="" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                    aria-hidden="true" role="img"
                    class="group-hover:translate-x-1 transition-transform ease duration-200" width="1em" height="1em"
                    viewBox="0 0 256 256">
                    <path fill="currentColor"
                        d="m221.66 133.66l-72 72a8 8 0 0 1-11.32-11.32L196.69 136H40a8 8 0 0 1 0-16h156.69l-58.35-58.34a8 8 0 0 1 11.32-11.32l72 72a8 8 0 0 1 0 11.32Z">
                    </path>
                </svg>
            </a>
        </div>
        <div>
            <svg xmlns="http://www.w3.org/2000/svg" class="w-20 h-20 text-gray-100" viewBox="0 0 15 15">
                <path fill="currentColor" fill-rule="evenodd"
                    d="M4.5 0A2.5 2.5 0 0 0 2 2.5v.286c0 .448.133.865.362 1.214H1.5A1.5 1.5 0 0 0 0 5.5v1A1.5 1.5 0 0 0 1.5 8H7V4h1v4h5.5A1.5 1.5 0 0 0 15 6.5v-1A1.5 1.5 0 0 0 13.5 4h-.862c.229-.349.362-.766.362-1.214V2.5A2.5 2.5 0 0 0 10.5 0c-1.273 0-2.388.68-3 1.696A3.498 3.498 0 0 0 4.5 0ZM8 4h2.786C11.456 4 12 3.456 12 2.786V2.5A1.5 1.5 0 0 0 10.5 1A2.5 2.5 0 0 0 8 3.5V4ZM7 4H4.214C3.544 4 3 3.456 3 2.786V2.5A1.5 1.5 0 0 1 4.5 1A2.5 2.5 0 0 1 7 3.5V4Z"
                    clip-rule="evenodd"></path>
                <path fill="currentColor" d="M7 9H1v3.5A2.5 2.5 0 0 0 3.5 15H7V9Zm1 6h3.5a2.5 2.5 0 0 0 2.5-2.5V9H8v6Z">
                </path>
            </svg>
        </div>
    </div>
</section> */}
    
      
    <div dir="rtl" className=' w-full h-12 mb-4 '>
        <div className='flex flex-col items-start justify-end mt-8'>
          <h2 className='flex items-center gap-2 font-black text-primary text-xl'>
            <Star size={20} color="#214C4F" /> فئة مميزة
          </h2>
        </div>
      </div>
    
      <div className=" p-2 relative">
        {/* <button className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-secondaryLight text-white p-3 rounded-md shadow-lg z-10">
        <ArrowLeft size={20} color="#fff" />
        </button>
        
        <button 
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-secondaryLight text-white p-3 rounded-md shadow-lg z-10">
        <ArrowRight size={20} color="#fff" />
        </button> */}
    
       
        {/* <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-l from-white via-transparent to-white opacity-50 pointer-events-none"></div> */}
    
       
        <Pcard products={{ products: { data: category3Products } }} />
        
        <div className="flex justify-center my-8">
          <button
            className="bg-secondaryLight text-white px-4 py-2 rounded-lg shadow-md hover:bg-secondary transition"
            onClick={() => handleCategoryClick(2)}
          >
            Show More
          </button>
        </div>
      </div>
    
      {/* Third Section */}
      <div dir="rtl" className=' w-full h-12 mb-4 '>
        <div className='flex flex-col items-start justify-end mt-8'>
          <h2 className='flex items-center gap-2 font-black text-primary text-xl'>
            <Star size={20} color="#214C4F" /> فئة مميزة
          </h2>
        </div>
      </div>
    
      <div className=" p-2 ">
        
        {/* <button className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-secondaryLight text-white p-3 rounded-md shadow-lg z-10">
        <ArrowLeft size={20} color="#fff" />
        </button>
        
        <button className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-secondaryLight text-white p-3 rounded-md shadow-lg z-10">
        <ArrowRight size={20} color="#fff" />
        </button>
     */}
      
        {/* <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-l from-white via-transparent to-white opacity-50 pointer-events-none"></div> */}
   
        <Pcard products={{ products: { data: category1Products } }} />
        
        <div className="flex justify-center my-8">
          <button
            className="bg-secondaryLight text-white px-4 py-2 rounded-lg shadow-md hover:bg-secondary transition"
            onClick={() => handleCategoryClick(3)}
          >
            Show More
          </button>
        </div>
      </div>
    </div>
    
    );
  };

  export default CategoryProducts;
