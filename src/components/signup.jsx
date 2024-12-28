import React, { useState } from "react";
import { useAuth } from "../context/authcontext";
import logo from '../assets/imgs/masa.svg';
import { Phone, IdentificationCard, LockSimpleOpen, EnvelopeSimple, MapTrifold, ArrowLeft, WhatsappLogo } from "@phosphor-icons/react";
const Register = () => {
  const { register } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
    } else if (username && email && password && phone && address) {
      register(username, email, password, address, phone);
    } else {
      alert("Please fill in all fields");
    }
  };

  return (

    <div className="min-h-full  flex justify-center items-center overflow-y-auto bg-gray-100 px-4">
     
      <div className="  w-[800px] my-20   bg-white shadow-lg p-8 rounded-lg">
      <div className="flex justify-between items-center ">
      <a href="" className="flex items-center text-primary font-bold text-xl gap-2"><ArrowLeft size={20} color="#027384" /> Home</a>
<img src={logo} className="w-20 h-20" alt="" srcset="" />
</div>
        <div className="flex justify-center flex-col gap-4 items-center">
        <h2 className="text-center text-base font-bold ">sign up </h2>
        <h2 className="text-center text-3xl text-primary font-black">New To Elmasa </h2>
        <span className="" >

        <span className="text-center text-xl text-primary font-black bg-blue-100  ">Please, Fill up your info to create new account </span>
        </span>

        </div>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label className="text-gray-700 font-medium flex gap-2"><IdentificationCard size={20} />Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-gray-700 font-medium flex gap-2"> <EnvelopeSimple size={20}  /> Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-gray-700 font-medium flex gap-2"> <Phone size={20} /> Phone</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-gray-700 font-medium flex gap-2"><MapTrifold size={20} />Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-gray-700 font-medium flex gap-2"><LockSimpleOpen size={20} />Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-gray-700 font-medium flex gap-2"><LockSimpleOpen size={20} />Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <button
            type="submit"
            className="bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-4 rounded-md transition-all"
          >
            Register
          </button>
        </form>
        <div class="flex flex-col items-center my-4">
    <div class="border-t  border-gray-200 flex-grow"></div>
    <div class="px-3 text-primary font-extrabold">OR</div>
    <div class="border-t  border-gray-200 flex-grow"></div>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4 text-sm text-gray-600">
          <a className="text-primary hover:underline cursor-pointer">
            Already have an account? Login
          </a>
     
        </div>
        <div className="flex items-center gap-2 mt-2">
        <span className="bg-blue-200 text-primary px-1">contact us via</span> 
        <span className="flex items-center gap-2 font-bold text-primary bg-green-500 px-4 py-2 rounded-lg">
    <WhatsappLogo size={24} color="#fff" />
    Whatsapp
  </span>
  <span className="bg-blue-200 text-primary px-1">for more assistant</span>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
