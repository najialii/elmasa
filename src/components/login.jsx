import React, { useState } from "react";
import { useAuth } from "../context/authcontext";
import { Link } from "react-router-dom";
import logo from '../assets/imgs/masa.svg';
import { LockSimpleOpen, EnvelopeSimple, WhatsappLogo, ArrowLeft } from '@phosphor-icons/react';

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (email && password) {
      await login(email, password);
    } else {
      setError("Please provide both email and password.");
    }
  };

  return (
    <div className="max-h-full h-full flex flex-col justify-center items-center bg-white px-4">
        <div className="flex justify-center flex-col items-center py-6">
        <h2 className="text-3xl text-primary font-black">مرحبًا بعودتك</h2>
        <p className="text-xl text-primary font-black p-2">
        قم بتسجيل الدخول إلى حسابك
</p>
      </div>
      <div className="w-full  max-w-md  bg-white shadow-md shadow-gray-50 p-8 rounded-lg ">
        <div className="flex justify-center flex-col items-center mb-6">
          {/* <Link to="/" className="flex items-center text-primary font-bold text-lg gap-2">
            <ArrowLeft size={20} color="#027384" /> Home
          </Link> */}
          {/* <img src={logo} className="w-20 h-20" alt="Elmasa Logo" /> */}
          <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
          تسجيل الدخول
          </h1>
        </div>
        
        {/* <div className="text-center space-y-2">
          <h2 className="text-xl font-semibold text-gray-700">Sign in</h2>
          <h2 className="text-3xl text-primary font-bold">Welcome back, Elmasa Customer</h2>
          <h2 className="text-base text-gray-600">Sign in to your account</h2>
        </div> */}

        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        <form dir="rtl" onSubmit={handleSubmit} className="">
          <div className="mb-4">
            <label htmlFor="email" className="flex gap-2 items-center text-sm font-medium mb-2 text-gray-700">
              <EnvelopeSimple size={20} color="#000" /> البريد الإلكتروني
            </label>
            <input
              type="email"
              id="email"
        className="shadow bg-gray-100 mb-4 focus:bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-primarLight focus:shadow-xl transition-all duration-300 ease-in-out"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="flex gap-2 items-center mb-2 text-sm font-medium text-gray-700">
              <LockSimpleOpen size={20} color="#000" />  كلمة المرور
            </label>
            <input
              type="password"
              id="password"
        className="shadow bg-gray-100 mb-4 focus:bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-primarLight focus:shadow-xl transition-all duration-300 ease-in-out"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
            <div className="flex justify-end ">
              {/* <a dis className="text-primary underline my-2 hover:text-primary hover:underline cursor-pointer">
                Forgot password?
              </a> */}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white p-2 rounded  transition duration-300"
          >
            Sign In
          </button>
        </form>

        <div className="flex items-center my-4">
          <div className="border-t border-gray-200 flex-grow"></div>
          <div className="px-3 text-primary font-extrabold">OR</div>
          <div className="border-t border-gray-200 flex-grow"></div>
        </div>

        <div dir="rtl" className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-4 px-4 text-sm text-gray-700">
  <span  className="text-gray-600">
  جديد؟ ليس لديك حساب في الماسة؟
  </span>
  <Link
    to="/signup"
    className="text-primary bg-secondaryLight lg:w-24 text-center w-full text-lg font-bold hover:bg-secondary-dark px-4 py-2 rounded-md transition-all"
  >
    تسجيل 
  </Link>
</div>

<div className="flex flex-col sm:flex-row sm:items-center justify-center gap-4 mt-4 px-4 text-sm text-gray-700 text-center sm:text-left">
  <Link
    to="/signup"
    className="flex flex-wrap items-center gap-2 justify-center sm:justify-start text-gray-600 hover:text-gray-800 transition-all"
  >
    <div className="flex lg:flex-row flex-col items-center gap-2">
    <span>للمزيد من المساعدة
    تواصل معنا عبر
    </span>

    <span className="flex items-center w-24 gap-2 font-bold text-white bg-green-500 hover:bg-green-600 px-4 py-1.5 rounded-lg transition-all">
      <WhatsappLogo size={32} weight="bold" color="#fff" />
      واتساب
    </span>
    </div>
  </Link>
</div>


      </div>
    </div>
  );
};

export default Login;
