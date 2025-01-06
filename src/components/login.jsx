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
    <div className="max-h-full flex justify-center items-center bg-gray-100 px-4">
      <div className="w-full my-20 max-w-md sm:max-w-xl bg-white shadow-md shadow-gray-50 p-8 rounded-lg space-y-6">
        <div className="flex justify-between items-center mb-6">
          <Link to="/" className="flex items-center text-primary font-bold text-lg gap-2">
            <ArrowLeft size={20} color="#027384" /> Home
          </Link>
          <img src={logo} className="w-16 h-16" alt="Elmasa Logo" />
        </div>
        
        <div className="text-center space-y-2">
          <h2 className="text-xl font-semibold text-gray-700">Sign in</h2>
          <h2 className="text-3xl text-primary font-bold">Welcome back, Elmasa Customer</h2>
          <h2 className="text-base text-gray-600">Sign in to your account</h2>
        </div>

        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="flex items-center text-sm font-medium text-gray-700">
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
            <label htmlFor="password" className="flex items-center text-sm font-medium text-gray-700">
              <LockSimpleOpen size={16} color="#000" /> Password
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

        <div className="flex items-center my-4">
          <div className="border-t border-gray-200 flex-grow"></div>
          <div className="px-3 text-primary font-extrabold">OR</div>
          <div className="border-t border-gray-200 flex-grow"></div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-4 text-sm text-gray-600">
          <Link to="/signup" className="text-primary font-semibold text-sm">
            New? You do not have an Elmasa account? <span className="font-bold text-primary">Register</span>
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-4 text-sm text-gray-600">
          <Link to="/signup" className="flex items-center gap-2 text-primary">
            <span>Contact us via</span>
            <span className="flex items-center gap-2 font-bold text-white bg-green-500 px-4 py-2 rounded-lg">
              <WhatsappLogo size={24} color="#fff" />
              Whatsapp
            </span>
            <span>for more assistance</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
