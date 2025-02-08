import React, { useState, useContext, useEffect } from "react";
import { CartContext } from "../../context/cart";
import { useAuth } from "../../context/authcontext";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import { MapPin, Phone , HandArrowDown, SealCheck, ShoppingBag} from "@phosphor-icons/react";
import bank from '../../assets/imgs/bankakk.svg';
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const IMG_BASE_URL = import.meta.env.VITE_IMAGE_STORAGE_URL
export default function Checkout() {
  const { cartItems, clearCart } = useContext(CartContext);
  const { token } = useAuth();
  const [phone, setPhone] = useState(null);
  const [address, setAddress] = useState("");
  const [fullName, setFullName] = useState("");
  const [paymentphone, setPaymentphone] = useState("");
  const [image, setImage] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isfilled, setIsfilled] = useState(false);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/city/list`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("cities", response.data);
        setCities(response.data.data || []);
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };

    fetchCities();
  }, [token]);

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity, 0
  );

  const formattedCartItems = cartItems.map((item) => ({
    id: item.id,
    qty: item.quantity,
  }));

  const handlePlaceOrder = async () => {
    if (!address || !phone || !selectedCity) {
      setIsfilled(true);
      toast.error('Phone number, address, and city are required', {
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
      return;
    }

    const orderData = {
      "cart": formattedCartItems,
      "phone": phone,
      "address": address,
      "fullName": fullName,
      "paymentphone": paymentphone,
      "city_id": selectedCity,
      "img": image, 
    };

    try {
      const response = await axios.post(`${API_BASE_URL}/order/place`, orderData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setIsSuccess(true);
        clearCart();

        
          toast.success('Order placed successfully!', {
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
        // navigate("/dashboard/uorders");
      } else {
        const errorMessage = response.statusText;
        console.error("Failed to place order:", errorMessage);
        setErrorMessage("Failed to place order. Please try again.");
        toast.error('Failed to place order. Please try again', {
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
      }
    } catch (error) {
      console.error("Error while placing order:", error);
      setErrorMessage("An error occurred while placing the order. Please try again.");
      toast.error('🦄 Error while placing order', {
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
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (

    <div className="bg-gray-50  w-full">

    <div  className="max-w-full lg:mx-12  h-full  ">
      <div dir="rtl" className=" flex jsutify-start items-start w-full pt-4">

      <h1 dir="rtl" className="text-2xl font-bold mb-6 text-center text-primary"> اتمام الشراء</h1> 


      </div>
      <div className="grid grid-col-1 lg:grid-cols-3 lg:gap-8 justify-center max-sm:flex-col    w-full h-full">
        <div className="bg-white h-[600px] p-4   shadow-gray-50 border border-gray-200  rounded-md">
        






     <div className="w-full ">
  {/* Header */}
  <h2 dir="rtl" className="text-right text-xl font-semibold text-gray-900 mb-4">
    المنتجات
  </h2>

  {/* Product List Container */}
  <div
    dir="rtl"
    className="bg-white p-6 rounded-md  lg:max-h-[480px] overflow-scroll h-96 sticky sm:top-0 w-full"
  >
    <div className="py-4  sm:overflow-scroll sm:h-[calc(100vh-60px)]">
      {/* Product List */}
      <ul className="space-y-2">
        {cartItems.map((item) => (
          <li
            key={item.id}
            className="flex items-center justify-between gap-4 p-4 bg-white shadow-md rounded-md flex-wrap"
          >
            {/* Product Image */}
            <div className="w-32 h-28 sm:w-24 sm:h-24 flex-shrink-0 rounded-md overflow-hidden">
              <img
                src={(() => {
                  try {
                    const parsedImg = JSON.parse(item.img);
                    const imageUrl = Array.isArray(parsedImg)
                      ? parsedImg[0]
                      : parsedImg;
                    return imageUrl.startsWith("http")
                      ? imageUrl
                      : `${IMG_BASE_URL}/${imageUrl}`;
                  } catch (error) {
                    console.error("Invalid JSON format for images:", item.img);
                    return "http://localhost:8000/storage/default-image.jpg";
                  }
                })()}
                alt={item.name}
                className="w-20 h-20 object-cover"
              />
            </div>

            {/* Product Details */}
            <div className="flex-1 flex flex-col justify-between">
              <p className="text-sm lg:text-base text-gray-800 font-medium">
                {item.name}
              </p>
              <p className="text-gray-600 text-sm">
                الكمية: <span className="text-gray-800 font-semibold">{item.quantity}</span>
              </p>
              <p className="font-semibold text-base text-gray-900">
                السعر: ${item.price * item.quantity}
              </p>
            </div>

            {/* Total Price */}
            <p className="font-semibold text-lg text-primary">
              ${item.price * item.quantity}
            </p>
          </li>
        ))}
      </ul>
    </div>
  </div>
</div>

          
<div
  dir="rtl"
  className="flex flex-col bg-white shadow-md shadow-gray-200 lg:mt-8 p-6 rounded-md border border-gray-200 border-t"
>
  <div className="flex justify-between items-center mb-4">
    <span className="text-base text-gray-900 font-semibold">اجمالي الطلب</span>
    </div>
    <div className="flex justify-between items-center gap-2">
      <span className="text-base text-gray-500 font-semibold">الاجمالي</span>
      <span className="text-gray-900 font-bold text-base" dir="rtl">
        {total} ج.م
      </span>
    </div>
  
</div>

        </div>






          <div dir="rtl" className=" flex flex-col  col-span-2 justify-center mt-6 w-full ">




          <div className=" w-full  h-max rounded-md lg:px-4 px-2 py-8 sticky top-0">
       

       <div className="  justify-center">

       {/* <div

className="mb-12 flex bg-b  max-w-screen-lg w-full py-4 px-4  rounded-lg shadow-lg"
>

  <div className="w-full  flex justify-center items-center">
    <div className="flex flex-col justify-center items-center">
      <div
        className="w-12 h-12 z-50 shrink-0 border-4 border-primary bg-highlight-primary flex items-center justify-center rounded-full"
      >
        <ShoppingBag weight="fill" size={24} color="#014a55" />
      </div>
      <h6 className="text-xs font-bold text-primary mt-2 text-center">
        Shopping cart
      </h6>
    </div>
    <div className="flex-1 h-[4px] bg-gradient-to-r w-full from-primary to-primary-light "></div>
  </div>


  <div className="w-full flex justify-center items-center ">
    <div className="flex flex-col  items-center">
      <div
        className="w-12 h-12 z-50 shrink-0 border-4 border-gray-400 bg-gray-200 flex items-center justify-center rounded-full hover:border-secondary hover:bg-secondary-light transition duration-300"
      >
        <span className="w-3 h-3 bg-gray-400 rounded-full"></span>
      </div>
      <h6 className="text-xs font-bold text-gray-400 mt-2 text-center">
        Checkout
      </h6>
    </div>

  </div>


  <div className="w-full flex justify-center items-center ">
    <div className="flex flex-col items-center">
      <div
        className="w-12 h-12 z-50 shrink-0 border-4 border-primary bg-highlight-primary flex items-center justify-center rounded-full"
      >
        <SealCheck weight="fill" size={24} color="#014a55" />
      </div>
      <h6 className="text-xs font-bold text-primary mt-2 text-center">
        Order complete
      </h6>
    </div>
    
  </div>
</div> */}


</div>

<div className="">
  <div dir="rtl" className="flex flex-col justify-start items-center p-6  border border-gray-200 bg-white rounded-md shadow-lg">
    <div dir="rtl" className="flex gap-8 justify-start w-full items-center">
      <h2 dir="rtl" className="text-right text-xl font-semibold text-gray-900 mb-4">
        الدفع
      </h2>
      <h2 dir="rtl" className="text-right text-sm font-semibold text-gray-500 mb-4">
        اختر الطريقة الافضل لك
      </h2>
    </div>

    <div dir="rtl" className="flex flex-col lg:flex-row justify-center gap-6 p-6 w-full">
      <div dir="rtl" className="flex flex-col lg:flex-row gap-4 w-full">

        {/* Bank Payment Option */}
        <label 
          htmlFor="bank-radio" 
          className="cursor-pointer bg-blue-100 border border-primary shadow-md p-4 lg:w-full w-full rounded-md flex items-center justify-between hover:ring-2 hover:ring-primary transition-all duration-300 ease-in-out"
        >
          <div className="flex items-center">
            <input
              id="bank-radio"
              type="radio"
              name="payment-option"
              className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 focus:ring-primary focus:ring-2"
            />
            <span className="ms-2 text-base font-bold text-gray-900">ادفع عن طريق بنكك</span>
          </div>
          <img src={bank} alt="Bank" className="w-14 h-14 object-cover rounded-full border" />
        </label>

        {/* Cash on Delivery (Disabled Option) */}
        <label 
          htmlFor="hand-radio" 
          className="cursor-pointer bg-gray-100 p-4 lg:w-full w-full rounded-md flex items-center justify-between opacity-60 pointer-events-none"
        >
          <div className="flex items-center">
            <input
              id="hand-radio"
              type="radio"
              name="payment-option"
              className="w-5 h-5 text-primary bg-gray-100 border-gray-300 focus:ring-primary focus:ring-2"
            />
            <span className="ms-2 text-sm font-medium text-gray-900">كاش عند التوصيل</span>
          </div>
        </label>
        
      </div>
    </div>
  </div>
</div>


          <div className="flex flex-col gap-6 p-4  bg-white rounded-lg shadow-md shadow-gray-200">
          <h2 dir="rtl" className="text-xl font-semibold text-gray-900 mb-4">تفاصيل العنوان والتوصيل</h2>
  {/* Full Name */}
  <div>
    <label className="block text-base font-medium mb-2 text-gray-700">الاسم </label>
    <input
      type="text"
      value={fullName}
      onChange={(e) => setFullName(e.target.value)}
      className="px-4 py-3 bg-gray-100 focus:bg-white text-gray-800 w-full text-sm rounded-md border border-gray-300 focus:outline-primary focus:ring-2 focus:ring-primary transition duration-300 ease-in-out"
      placeholder="اسمك ثنائي علي الاقل"
    />
  </div>

  {/* Account Number */}
  <div>
    <label className="block text-base font-medium mb-2 text-gray-700">رقم الحساب</label>
    <input
      type="text"
      value={paymentphone}
      onChange={(e) => setPaymentphone(e.target.value)}
      className="px-4 py-3 bg-gray-100 focus:bg-white text-gray-800 w-full text-sm rounded-md border border-gray-300 focus:outline-primary focus:ring-2 focus:ring-primary transition duration-300 ease-in-out"
      placeholder="ادخل رقم الحساب"
    />
  </div>

  {/* Payment Receipt */}
  <div>
    <label className=" text-base font-medium mb-2 text-gray-700">إيصال الدفع (صورة)</label>
    <input
      type="file"
      onChange={handleImageChange}
      className="px-4 py-3 bg-gray-100 text-gray-800 w-full text-sm rounded-md border border-gray-300 focus:outline-primary focus:ring-2 focus:ring-primary transition duration-300 ease-in-out"
    />
  </div>

  {/* Phone Number */}
  <div>
    <label className=" text-base font-medium mb-2 flex items-center gap-2 text-gray-700">
      {/* <Phone size={16} /> */}
      الهاتف
    </label>
    <input
      type="text"
      value={phone}
      onChange={(e) => setPhone(e.target.value)}
      className="px-4 py-3 bg-gray-100 focus:bg-white text-gray-800 w-full text-sm rounded-md border border-gray-300 focus:outline-primary focus:ring-2 focus:ring-primary transition duration-300 ease-in-out"
      placeholder="Enter your phone number"
    />
  </div>

 {/* City Selection */}
 <div>
    <label className="block text-base font-medium mb-2 text-gray-700">المدينة</label>
    <select
      value={selectedCity}
      onChange={(e) => setSelectedCity(e.target.value)}
      className="px-4 py-3 bg-gray-50 border border-gray-300 text-gray-800 w-full text-sm rounded-md focus:outline-primary focus:ring-2 focus:ring-primary transition duration-300 ease-in-out"
    >
      <option value="">Select your city</option>
      {cities.map((city) => (
        <option key={city.id} value={city.id}>
          {city.name}
        </option>
      ))}
    </select>
  </div>

  {/* Address */}
  <div>
    <label className=" text-base font-medium mb-2 flex items-center gap-2 text-gray-700">
      {/* <MapPin size={16} /> */}
      العنوان بالتفصيل *
    </label>
    <textarea
      type="text"
      value={address}
      onChange={(e) => setAddress(e.target.value)}
      className="px-4 py-3 bg-gray-100 focus:bg-white text-gray-800 w-full text-sm rounded-md border border-gray-300 focus:outline-primary focus:ring-2 focus:ring-primary transition duration-300 ease-in-out"
      placeholder="Enter your address"
    />
  </div>

 
</div>
<div class="flex gap-4 max-md:flex-col w-full">
    
    <button
      onClick={handlePlaceOrder}
      className={`mt-4 w-full p-3 rounded-lg font-semibold ${phone && address && selectedCity ? 'bg-primary text-base text-white' : 'bg-gray-400 text-gray-200 cursor-not-allowed'}`}
      disabled={!phone || !address || !selectedCity}
    >
      تاكيد الطلب
    </button>
    </div> 

              </div>


   

   
       
          {isSuccess && (
  <div className="fixed inset-0 bg-gray-800 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="bg-white mx-3  lg:mx-0 rounded-lg shadow-lg p-8 w-96 text-center">
      <span className="flex justify-center mb-4">
      <SealCheck size={80} color="#00FF00" weight="fill" />

      </span>
      <h2 dir="rtl" className="text-2xl font-semibold text-[#00FF00] mb-4">تم تقديم الطلب بنجاح!</h2>
      <p dir="rtl" className="text-gray-700 mb-6">تم  استلام طلبك وهو قيد المعالجة. شكرًا لتسوقك معنا!</p>
      
      <div className="flex gap-4  justify-center">

      <button
        onClick={() => setIsSuccess(false)}
        className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primaryDark transition-all"
        >
        متابعة التسوق
      </button>
      <button
        onClick={() => {setIsSuccess(false)}}
        className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primaryDark transition-all"
        >
          <Link to={'/dashboard/uorders'}>
    تتبع الطلب
          </Link>
      </button>
        </div>
    </div>
  </div>
)}

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
        </div>
  );
}
