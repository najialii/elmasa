import React, { useState } from "react";
import { useAuth } from "../context/authcontext";
import logo from '../assets/imgs/masa.svg';
import { Link } from "react-router-dom";
import { Phone, IdentificationCard, LockSimpleOpen, EnvelopeSimple, MapTrifold, ArrowLeft, WhatsappLogo } from "@phosphor-icons/react";

const Register = () => {
  const { register } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const[loading , setLoading] = useState(false)
  console.log({
    username,
    email,
    password,
    confirmPassword,
    address,
    phone,
  });
  const handleSubmit =  (e) => {
    e.preventDefault();
    console.log("Form submitted");
    if (password !== confirmPassword) {
      alert("Passwords do not match");
    } else if (username && email && password && phone && address) {
      setLoading(true);  
      console.log("Attempting to register...");
      console.log({
        username,
        email,
        password,
        confirmPassword,
        address,
        phone,
      });
       register(username, email, password, address, phone);
      
      console.log("hhhhhhhhhh"); 
    } else {
      alert("Please fill in all fields");
    }
  };
  const testSubmit = () => {
    document.querySelector('form').submit();  // This will trigger the onSubmit handler
  };
  
  // You can call this function in the component to test submission.
  
 const Spinner = () => (
  <div className="w-6 h-6 border-4 border-t-4 border-primary border-solid rounded-full animate-spin"></div>
);
 
  return (
    <div className="min-h-full flex h-full flex-col justify-center items-center bg-white px-4" dir="rtl">
      <div className="flex justify-center flex-col items-center py-6">
        <h2 className="text-3xl text-primary font-black">جديد على الماسة</h2>
        <p className="text-xl text-primary font-black p-2">
          يرجى ملء معلوماتك لإنشاء حساب جديد
        </p>
      </div>

      <div className="lg:w-[600px] w-[400px]  bg-white  shadow-lg p-8 rounded-lg">
        <div className="text-center mb-6">
          <h2 className="block text-2xl font-bold text-gray-800 dark:text-white">تسجيل</h2>
        </div>

        <form className="grid grid-cols-1 sm:grid-cols-2 gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label className="text-gray-700 font-medium flex gap-2">
              <IdentificationCard size={20} /> اسم المستخدم
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="shadow bg-gray-100 focus:bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-primary-light focus:shadow-xl transition-all"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-gray-700 font-medium flex gap-2">
              <EnvelopeSimple size={20} /> البريد الإلكتروني
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="shadow bg-gray-100 focus:bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-primary-light focus:shadow-xl transition-all"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-gray-700 font-medium flex gap-2">
              <Phone size={20} /> الهاتف
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="shadow bg-gray-100 focus:bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-primary-light focus:shadow-xl transition-all"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-gray-700 font-medium flex gap-2">
              <MapTrifold size={20} /> العنوان
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className="shadow bg-gray-100  focus:bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-primary-light focus:shadow-xl transition-all"
            />
          </div>

      
          <div className="flex flex-col gap-2 col-span-1 sm:col-span-2">
            <label className="text-gray-700 font-medium flex gap-2">
              <LockSimpleOpen size={20} /> كلمة المرور
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="shadow bg-gray-100 focus:bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-primary-light focus:shadow-xl transition-all"
            />
          </div>

          <div className="flex flex-col gap-2 col-span-1 sm:col-span-2">
            <label className="text-gray-700 font-medium flex gap-2">
              <LockSimpleOpen size={20} /> تأكيد كلمة المرور
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="shadow bg-gray-100 focus:bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-primary-light focus:shadow-xl transition-all"
            />
          </div>
        </form>

        <button
         type="submit"
         onClick={handleSubmit}
          className="bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-4 rounded-md mt-4 w-full transition-all"
        >
{loading ? <Spinner /> : "تسجيل"}
        </button>

        <div className="flex items-center my-6">
          <div className="border-t border-gray-300 flex-grow"></div>
          <span className="px-3 text-primary font-bold">أو</span>
          <div className="border-t border-gray-300 flex-grow"></div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-4 px-4 text-sm text-gray-700">
          <span className="text-gray-600">جديد؟ ليس لديك حساب في الماسة؟</span>
          <Link
            to="/login"
            className="text-primary bg-secondaryLight lg:w-40 text-center w-full text-lg font-bold hover:bg-secondary-dark px-4 py-2 rounded-md transition-all"
          >
            تسجيل الدخول
          </Link>
        </div>

   
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-center gap-4 my-6 px-4 text-sm text-gray-700 text-center sm:text-left">
          <Link
            to="/"
            className="flex flex-wrap items-center gap-2 justify-center sm:justify-start text-gray-600 hover:text-gray-800 transition-all"
          >
            <div className="flex lg:flex-row mt-4 flex-col items-center gap-2">
              <span>للمزيد من المساعدة تواصل معنا عبر</span>
              <span className="flex items-center w-24 gap-2 font-bold text-white bg-green-500 hover:bg-green-600 px-4 py-1.5 rounded-lg transition-all">
                <WhatsappLogo size={32} weight="bold" color="#fff" />
                واتساب
              </span>
            </div>
          </Link>
        </div>

    </div>
  );
};

export default Register;
