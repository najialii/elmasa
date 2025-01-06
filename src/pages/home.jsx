import React, { useState } from 'react';
import Slideshow from '../components/slideShow';
import Pcard from './shopp/pcards';
import Offers from './shopp/offers';
import Rcard from '../components/recipiescard';
import Homerec from './shopp/homrec';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ShoppingBag, Leaf ,HandHeart, CirclesThree , CheckCircle  } from '@phosphor-icons/react';
import ban from "../assets/imgs/ban3.jpg";
import masagroup from '../assets/imgs/masagroup.png';
import partlogo from '../assets/imgs/masa.svg';
import logo from '../assets/imgs/masa.svg';
import { Link } from 'react-router-dom';

const Home = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const umessage = { name, email, message };
    console.log(umessage);
    fetch("http://localhost/masa/api/content/items/customermessages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(umessage)
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
      })
      .catch((error) => {
          console.error("Error:", error);
      });
  
  }
 

  const sliderSettings = {

    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    margin: 2,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          margin: 0,
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

  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 4,
    slidesToScroll: 1,
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

  const partnerLogos = [partlogo, partlogo, partlogo, partlogo, partlogo, partlogo];


  return (
  <div  className="bg-gray-50">
 <div className="bg-primary">
  <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4 px-4 md:px-8 lg:px-16 py-8 md:py-12">
    

    <div dir='rtl' className="flex justify-center md:justify-end">
      <img
        src={masagroup}
        alt="Masa Group"
        className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg object-cover"
      />
    </div>

  
    <div className="flex flex-col justify-center items-center md:items-start text-center md:text-right">
      <p dir='rtl' className="max-w-2xl text-secondaryLight mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl dark:text-white">
      الماسة - أكثر من مجرد حليب بودرة
      </p>
      <p dir='rtl' className="max-w-2xl mb-6 font-light text-white lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
      الماسة ليست مجرد علامة تجارية... إنها قصة جودة تُكتب بكل منتج.
من حليب البودرة الغني إلى مجموعة متنوعة من المنتجات الغذائية، نضع العائلة السودانية في قلب كل ما نقدمه.
جرب طعم التميز، لأن الماسة ليست فقط غذاء... إنها أسلوب حياة!
      </p>
    </div>

  </div>
</div>


{/* <style>
  {`
    @layer utilities {
      .clip-arch {
        clip-path: polygon(0 0, 100% 0, 100% 85%, 50% 100%, 0 85%);
      }
      @media (min-width: 640px) {
        .clip-arch-md {
          clip-path: polygon(0 0, 100% 0, 100% 80%, 50% 95%, 0 80%);
        }
      }
      @media (min-width: 1024px) {
        .clip-arch-lg {
          clip-path: polygon(0 0, 100% 0, 100% 75%, 50% 90%, 0 75%);
        }
      }
    }
  `}
</style> */}

<section dir='rtl' className="bg-blue-50 py-16">
  <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
 
    <div dir='rtl' className="mt-12  grid grid-cols-1 md:grid-cols-2 gap-10">
   
      <div className="flex flex-col justify-center space-y-6">
        <h2 className='text-4xl font-extrabold text-primaryLight'>
        عن الماسة
        </h2>
      <p className="text-lg text-gray-700 leading-relaxed">
  الماسة هي علامة تجارية سودانية رائدة ومتخصصة في تقديم مسحوق الحليب من أعلى مستويات الجودة. تأسست الماسة بهدف تزويد الأسر السودانية بحليب مغذي وطبيعي، مصنوع من أفضل أنواع الحليب النيوزيلندي المعروف بجودته العالية. نحن ملتزمون بتقديم منتجات تتمتع بالنقاء، حيث نقوم باستخدام أحدث طرق التصنيع للحفاظ على القيمة الغذائية في كل منتج. تهدف الماسة إلى تحسين نمط الحياة الصحي للأسر السودانية من خلال توفير خيار حليب صحي يلبي احتياجات الجميع.
</p>

<div className='flex justify-start items-center gap-4'>  
  <button className='bg-primary text-secondaryLight px-4 py-2 rounded-lg '>
  اكتشف المزيد
  </button>
</div>

      </div>

      <div className="flex justify-center items-center">
        <img
          src="https://via.placeholder.com/400x300.png"
          alt="منتجات الماسة"
          className="rounded-xl shadow-xl transform transition-transform duration-300 hover:scale-105"
        />
      </div>
    </div>
  </div>

  <div className='bg-gradient-to-l from-primary to-primaryLight grid grid-cols-1 md:grid-cols-3 rounded-xl lg:mx-20  p-6 mx-4 mt-12'>
  <div className='flex flex-col'>
    <h2 className='font-extrabold text-xl text-white mb-4'>
      قيمنا
    </h2>
    <p className="text-lg text-white leading-relaxed">
      قيمنا هي الركيزة الأساسية لأعمالنا، والمبادئ التي تشكل ثقافتنا المؤسسية، والتي تتماشى مع جميع ممارساتنا وتوجهاتنا وسياساتنا. نحن في الماسة نسعى من خلالها إلى خلق قيمة لكل من يتعامل معنا، من خلال تقديم منتجات عالية الجودة تساهم في تحسين الحياة الصحية للأسر السودانية.
    </p>
  </div>

  <div className='flex lg:flex-row flex-col items-center justify-center gap-4 col-span-1 md:col-span-2 mt-8 md:mt-0'>
    <div className='bg-blue-200  w-full lg:w-32 h-16 flex justify-center items-center p-4 rounded-lg'>
      <h2 className='flex gap-2 font-bold'> <Leaf size={32} color='#214C4F' /> العناية</h2> 
    </div>
    <div className='bg-blue-200  w-full lg:w-32 h-16 flex justify-center items-center p-4 rounded-lg'>
      <h2 className='flex gap-2 font-bold' ><HandHeart size={32} color='#214C4F' />التفاني </h2> 
    </div>
    <div className='bg-blue-200  w-full lg:w-32 h-16 flex justify-center items-center p-4 rounded-lg'>
      <h2 className='flex gap-2 font-bold'><CirclesThree   size={32} color='#214C4F' />الاهتمام</h2> 
    </div>
    <div className='bg-blue-200  w-full lg:w-32 h-16 flex justify-center items-center p-4 rounded-lg'>
      <h2 className='flex gap-2 font-bold'><CheckCircle  size={32} color='#214C4F' />المسؤولية</h2> 
    </div>
  </div>
</div>

</section>



<div className='bg-white'>

<div className='grid grid-cols-1  md:grid-cols-2 gap-4 lg:gap-8 items-center text-2xl font-black text-gray-800 mx-5 md:mx-20 py-10 md:py-[80px]'>

  <div className='flex  gap-6 mx-0 md:mx-5 justify-center md:justify-start'>
    <div className='flex bg-white h-40  lg:h-80 rounded-xl shadow-md w-72 items-center justify-center p-6'>
      <img src={logo} className='lg:w-52 w-32' alt="" />
    </div>
    <div className='flex bg-white h-40  lg:h-80 rounded-xl shadow-md w-72 items-center justify-center p-6'>
      <img src={logo} className='lg:w-52 w-32' alt="" />
    </div>
  </div>

  <div dir='rtl' className='flex flex-col gap-4 justify-start px-4 md:px-0 mt-12'>
    <h2 className='max-w-2xl text-gray-800 mb-4 text-xl md:text-5xl lg:text-4xl font-extrabold leading-none tracking-tight dark:text-white'>
      منتجاتنا
    </h2>
    <h3 className='max-w-2xl text-gray-800 text-xl md:text-5xl lg:text-2xl font-extrabold leading-none tracking-tight dark:text-white'>
      نتميز بجودة مميزة
    </h3>
    <p className="max-w-2xl mb-6 text-base md:text-lg lg:text-xl font-light text-gray-800 lg:mb-8 dark:text-gray-400">
      علاماتنا التجارية تمثل الهوية الفريدة لمصنعنا و لمنتجاتنا وخدماتنا، وهي تعبر عن قيمنا ورؤيتنا في السوق. 
      تعكس علاماتنا التجارية الجودة والابتكار والتميز في كل جانب من جوانب العمل، وتهدف إلى تقديم تجربة فريدة لعملائنا وإثراء حياتهم بمنتجات تحمل بصمة مميزة.
    </p>

    <button dir='rtl' className='bg-primary flex items-center gap-4 w-40 text-secondaryLight px-4 text-base
     py-2 rounded-lg '> 
    تسوق الآن <ShoppingBag size={28} color="#ADEB76" />
    </button>
  </div>

</div>


</div>





<div className='bg-white-50 py-[50px]'>
<div className="text-center  flex flex-col justify-center ">
        <h2 className="text-4xl font-extrabold text-gray-900 ">وصفات لذيذة</h2>
        <p className='max-w-2xl mx-auto mt-8 text-base leading-relaxed text-gray-500'>
        إكتشف عالماً أتقنت مكرونة بيرفيتو صنعه، وملأته بأشهى الوصفات السهلة واللذيذة باستخدام مجموعة متنوعة من المكرونة، والتي يمكن لأي شخص إعدادها. مكرونة بيرفيتو تقدم لك طرقًا رائعة لتحضير الباستا في المنزل!
        </p>
      </div>
<div className='flex flex-col  justify-center py-[50px]'>
  

  
        <Homerec />
        <div className="flex justify-center mt-12">
      <Link to={'/recipes'}>
        <button className=" bg-primary flex justify-center items-center gap-4 w-40 text-secondaryLight px-4 text-base
     py-2 rounded-lg ">
اكتشف المزيد 
        </button>
      </Link>
      </div>
</div>
</div>
    
   

     
    {/* Promotions Section */}
    {/* <section className="py-16 Light relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-white opacity-50"></div>
      <div className="container mx-auto px-6 text-center relative z-10">
        <h2 className="text-4xl font-bold text-secondaryDark mb-8">Our Latest Promotions</h2>
        <Offers />
      </div>
    </section> */}

    <div className='py-[80px] bg-white'>
<div className='flex justify-center items-center gap-4'>
<h2 className='text-4xl font-extrabold text-gray-800 mb-4'>
  شركاؤنا
</h2>
</div>
  <Slider {...sliderSettings}>

 


  {partnerLogos.map((logo, index) => (
    <img 
    key={index} 
    src={logo} 
    className="mt-12  gap-px-2 w-24 h-32 flex justify-center items-center rounded-lg" 
    alt={`Partner Logo ${index + 1}`} 
    />
  ))}
  



  </Slider>
    </div>

  </div>
  )
};

export default Home;
