import React, { useState } from "react";
import { useAuth } from "../context/authcontext";

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
    } else if (username && email && password && phone && address ) {
      register(username, email, password,address,phone);
    } else {
      alert("Please fill in all fields");
    }
  };

  return (
    <div className="register-container bg-gradient-to-b w-screen from-blue-200 flex justify-center items-center">
    <div className="py-[50px]">

    <form
  className="flex flex-col  bg-white w-[600px] p-6 rounded-lg shadow-md max-w-lg mx-auto"
  onSubmit={handleSubmit}
>
  <div className="flex flex-col gap-2">
    <label className="text-gray-700 font-semibold">Username</label>
    <input
      type="text"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      required
      className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary"
    />
  </div>
  <div className="flex flex-col gap-2">
    <label className="text-gray-700 font-semibold">Email</label>
    <input
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      required
      className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary"
    />
  </div>
  <div className="flex flex-col gap-2">
    <label className="text-gray-700 font-semibold">Phone</label>
    <input
      type="text"
      value={phone}
      onChange={(e) => setPhone(e.target.value)}
      required
      className="border border-red-600 border-2 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-400"
    />
  </div>
  <div className="flex flex-col gap-2">
    <label className="text-gray-700 font-semibold">Address</label>
    <input
      type="text"
      value={address}
      onChange={(e) => setAddress(e.target.value)}
      required
      className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary"
    />
  </div>
  <div className="flex flex-col gap-2">
    <label className="text-gray-700 font-semibold">Password</label>
    <input
      type="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required
      className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary"
    />
  </div>
  <div className="flex flex-col gap-2">
    <label className="text-gray-700 font-semibold">Confirm Password</label>
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
</div>

    </div>
  );
};

export default Register;
