import React, { useState } from "react";
import { useAuth } from "../context/authcontext";
import { Link } from "react-router-dom";
import logo from '../assets/imgs/masa.svg';
import { LockSimpleOpen , EnvelopeSimple, WhatsappLogo ,ArrowLeft } from '@phosphor-icons/react';

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

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
<div className="min-h-screen flex justify-center items-center  bg-gray-100 px-4">
  <div className="flex gap-8 w-[800px] h-fit">

    <div className="w-full bg-white shadow-lg items-center justify-center p-8 rounded-lg">
    <div className="flex justify-between items-center ">
      <a href="" className="flex items-center text-primary font-bold text-xl gap-2"><ArrowLeft size={20} color="#027384" /> Home</a>
<img src={logo} className="w-20 h-20" alt="" srcset="" />
</div>
<div className="text-center space-y-2">
  <h2 className="text-lg font-semibold text-gray-700">Sign in</h2>
  <h2 className="text-3xl text-primary font-bold">Welcome back, Elmasa Customer</h2>
  <h2 className="text-base text-gray-600">Sign in to your account</h2>
</div>

      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={handleSubmit}>
  
        <div className="mb-4">
          <label htmlFor="email" className="flex text-sm items-center font-medium text-gray-700">
          <EnvelopeSimple size={16} color="#000" /> Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>
        
        <div className="mb-4">
       
          <label htmlFor="password" className="flex text-sm items-center font-medium text-gray-700">
          <LockSimpleOpen size={16} color="#000" />  Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
          <div className="flex justify-end">
          <a className="text-primary underline my-2 hover:text-primary hover:underline cursor-pointer">
          Forgot password?
        </a>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-primary text-white p-2 rounded hover:bg-secondary transition duration-300"
        >
          Sign in 
        </button>
      </form>
    
  
      <div class="flex items-center my-4">
    <div class="border-t  border-gray-200 flex-grow"></div>
    <div class="px-3 text-primary font-extrabold">OR</div>
    <div class="border-t  border-gray-200 flex-grow"></div>
</div>
<div className="flex flex-col  sm:flex-row items-center justify-center gap-4 mt-4 text-sm text-gray-600">
        <a className="    cursor-pointer flex  items-center space-x-4">
       <Link to="/signup">  <span className="bg-blue-200 mx-4 font-bold text-primary ">  New, You do not have elmasa account? </span> <sapn className="font-bold    hover:underline text-xl text-primary">Register</sapn> </Link>
        </a>
      </div>
<div className="flex flex-col  sm:flex-row items-center justify-center gap-4 mt-4 text-sm text-gray-600">
        <a className=" cursor-pointer items-cener gap-2">
        <Link to="/signup" className="flex items-center gap-2">
  <span>contact us via</span>
  <span className="flex items-center gap-2 font-bold text-white bg-green-500 px-4 py-2 rounded-lg">
    <WhatsappLogo size={24} color="#fff" />
    Whatsapp
  </span>
  <span>for more assistant</span>

</Link>        </a>
      </div>

    </div>
  </div>
</div>

  );
};

export default Login;
