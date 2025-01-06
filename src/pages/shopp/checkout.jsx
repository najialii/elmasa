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
      <div className=" jsutify-center items-center w-full my-4">

      {/* <h1 dir="rtl" className="text-4xl font-bold mb-6 text-center text-primary">أكمل طلبك</h1> */}


     

    

      </div>
      <div className="flex lg:gap-12 justify-center max-sm:flex-col    w-full h-full">
        <div className="">
        






          
     
        <div className="bg-white  to-white    lg:mt-6 shadow-gray-50 p-6 rounded-md sm:h-64 overflow-auto lg:h-full
         sticky sm:top-0 lg:min-w-[370px] sm:min-w-[300px] lg:max-h-fit max-h-64">
            <h2 dir="rtl" className="flex justify-start text-right ">
            <span dir="rtl" className="text-2xl font-semibold text-primary">العناصر</span>
          </h2>
  <div className=" py-8 sm:overflow-auto sm:h-[calc(100vh-60px)]">
    <ul className="space-y-8 my-8 bg-white   ">
      {cartItems.map((item) => (
        <li key={item.id} className="flex shadow-md  px-2 rounded-md bg-white flex-wrap items-center justify-between text-lg gap-4">
          <div className="w-32 h-28 max-lg:w-24 max-lg:h-24 flex p-3 shrink-0 rounded-md">
            <img
              src={(() => {
                try {
                  const parsedImg = JSON.parse(item.img); 
                  const imageUrl = Array.isArray(parsedImg) ? parsedImg[0] : parsedImg;
                  return imageUrl.startsWith("http")
                    ? imageUrl
                    : `${IMG_BASE_URL}/${imageUrl}`;
                } catch (error) {
                  console.error("Invalid JSON format for images:", item.img);
                  return "http://localhost:8000/storage/default-image.jpg";
                }
              })()}
              alt={item.name}
              className="w-full object-cover h-full rounded-md mb-4"
            />
          </div>

          <div className="flex-1 flex flex-col justify-between px-4">
            <p className="text-sm lg:text-base text-gray-800">{item.name}</p>
            <p className="text-gray-800 text-base">
              Quantity: <span>{item.quantity}</span>
            </p>
          </div>

          <p className="font-semibold text-base">${item.price * item.quantity}</p>
        </li>
      ))}
    </ul>
  </div>
</div>


          
          <div dir="rtl" className="flex  bg-primary shadow-md shadow-gray-50 p-6 rounded-b-xl justify-between items-center border-t pt-4">
            <span className="text-2xl text-white font-semibold">الاجمالى</span>
            <span className="text-secondaryLight text-3xl font-bold" dir="rtl">{total} ج.م</span>
          </div>
        </div>






          <div dir="rtl" className="bg-white flex flex-col  justify-center mt-6 w-full ">




          <div className=" w-full  h-max rounded-md lg:px-4 px-2 py-8 sticky top-0">
       

       <div className="  justify-center">

       <div

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
</div>


</div>



          <h2 dir="rtl" className="text-2xl font-semibold text-primary mb-4">تفاصيل التسليم</h2>
<div className="grid gap-4 p-2 grid-cols-2">

          <div>
            <span className="flex items-center">
              <Phone size={16} color="#000" />
              <label className="block text-lg font-medium mb-2">الهاتف</label>
            </span>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-primary focus:ring-2 focus:ring-primary focus:shadow-xl transition-all duration-300 ease-in-out"
              placeholder="Enter your phone number"
            />
          </div>

          <div>
            <span className="flex items-center">
              <MapPin size={16} color="#000" />
              <label className="block text-lg font-medium mb-2">العنوان</label>
            </span>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="px-4 py-3 bg-gray-100 border border-gray-400 focus:bg-transparent text-gray-800 w-full
               text-sm rounded-md focus:outline-primary focus:ring-2 focus:ring-primary focus:shadow-xl transition-all duration-300 ease-in-out"
              placeholder="Enter your address"
              />
          </div>

          <div>
            <label className="block text-lg font-medium mb-2">المدينة</label>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
                             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
              >
              <option value="">Select your city</option>
              {cities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>
      </div>
              </div>


              <div className="  ">
  <div dir="rtl" className="flex flex-col justify-start items-center p-6 space-x-4">

    <div dir="rtl" className=" justify-start  w-full items-center">
      <h2 dir="rtl" className= "text-right text-2xl font-semibold text-primary mb-4">
        طريقة الدفع
      </h2>
    </div>
    <div dir="rtl" className="flex flex-col lg:flex-col justify-center gap-6 w-full p-6 rounded-xl  bg-white">

  <label
    htmlFor="bank-radio"
    className="cursor-pointer bg-gray-100 shadow-md p-4 lg:w-full w-full rounded-md flex flex-row items-center px-2 justify-between hover:ring-2 hover:ring-primary"
  >
    <img src={bank} alt="Bank" className="w-14 h-14 object-cover rounded-full border" />
    {/* <h2>Bankak</h2> */}
    <div className="flex items-center mt-2">
      <input
        id="bank-radio"
        type="radio"
        name="payment-option"
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-primary focus:ring-2"
      />
      <span className="ms-2 text-sm font-medium text-gray-900">Select Bank</span>
    </div>
  </label>

  {/* Option 2: Disabled */}
  <label
    htmlFor="hand-radio"
    className="cursor-pointer bg-gray-100 p-4 lg:w-full w-full rounded-md flex flex-row items-center justify-between  opacity-60 pointer-events-none"
  >
    <HandArrowDown size={50} color="#81c6ca" weight="fill" />
    <div className="flex items-center mt-2">
    {/* <h2>Option 2</h2> */}
      <input
        id="hand-radio"
        type="radio"
        name="payment-option"
        disabled
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-primary focus:ring-2"
      />
      <span className="ms-2 text-sm font-medium text-gray-900">Disabled Option</span>
    </div>
  </label>


  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
      <div>
        <label className="block text-lg font-medium mb-2">الاسم الكامل</label>
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-primary focus:ring-2 focus:ring-primary focus:shadow-xl transition-all duration-300 ease-in-out"
          placeholder="Enter your full name"
        />
      </div>
      
      <div>
        <label className="block text-lg font-medium mb-2">رقم الحساب</label>
        <input
          type="text"
          value={paymentphone}
          onChange={(e) => setPaymentphone(e.target.value)}
          className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-primary focus:ring-2 focus:ring-primary focus:shadow-xl transition-all duration-300 ease-in-out"
          placeholder="Enter your account number"
        />
      </div>

      <div>
        <label className="block text-lg font-medium mb-2">إيصال الدفع (صورة)</label>
        <input
          type="file"
          onChange={handleImageChange}
          className="px-4 py-3 mb-4 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-primary focus:ring-2 focus:ring-primary focus:shadow-xl transition-all duration-300 ease-in-out"
        />
      </div>
    </div>
</div>

<div class="flex gap-4 max-md:flex-col w-full">
    
    <button
      onClick={handlePlaceOrder}
      className={`mt-4 w-full p-3 rounded-lg font-semibold ${phone && address && selectedCity ? 'bg-primary text-white' : 'bg-gray-400 text-gray-200 cursor-not-allowed'}`}
      disabled={!phone || !address || !selectedCity}
    >
      Place Order
    </button>
    </div> 

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
