import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/authcontext";
import { UserGear, User  , PencilSimple } from "@phosphor-icons/react";
import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const Uprofile = () => {
  const navigate = useNavigate();
  const { user, token, logout } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [editName, setEditName] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editAddress, setEditAddress] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editModal, setEditModal] = useState(false);
  const effectRan = useRef(false)
  const handleEdit = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/user/update`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: editName,
          phone: editPhone,
          address: editAddress,
          email: editEmail,
        }),
      });

      if (response.ok) {
        setEditModal(false);
        alert("Profile updated successfully!");
      } else {
        throw new Error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error during profile update:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/user/me`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

    
      if (response.status >= 200 && response.status < 300) {
        console.log("Fetched Data:", response.data.data);
        setData(response.data.data);
        console.log("hhhhhhh")
      } else {
        throw new Error('Failed to fetch data');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
      
    if (!effectRan.current) {
      effectRan.current = true
      if (token) {
        fetchData();
      }
    }
  }, [token]); 

 

  return (
    <div className=" ">
      {data  ? (
        <div dir="rtl" className="bg w-full p-6 rounded-lg shadow-md shadow-gray-50  mx-auto">
          <div className="flex flex-col items-center  mb-6   p-4 rounded-md">
              <div className="w-24 h-24 mb-4 bg-gradient-to-br  from-primary to-primaryLight p-2 flex justify-center items-center  rounded-full">
                <User weight="fill" color="#fff" size={60}  />
              </div>
            <div className="flex items-center space-x-4">
              <h2 className="text-3xl font-bold text-gray-800">مرحبا بعودتك, {data.name}</h2>
            </div>
          </div>
          <div className="space-y-6 p-4 flex flex-col items-start md:items-center">

  <div className="flex flex-col w-full space-y-2">
    <span className="text-gray-600">البريد الالكتروني</span>
    <div className="flex justify-between items-center w-full">
      <span className="font-semibold text-gray-800">{data.email}</span>
      <PencilSimple size={24}  color="#29008a" />
    </div>
  </div>


  <div className="flex flex-col w-full space-y-2">
    <span className="text-primary">رقم الجوال</span>
    <div className="flex justify-between items-center w-full">
      <span className="font-semibold text-gray-800">{data.phone}</span>
      <PencilSimple size={24} color="#29008a" />
    </div>
  </div>

  <div className="flex flex-col w-full space-y-2">
    <span className="text-primary">العنوان</span>
    <div className="flex justify-between items-center w-full">
      <span className="font-semibold text-gray-800">{data.address}</span>
      <PencilSimple size={24} color="#29008a" />
    </div>
  </div>
</div>

          <div dir="rtl" className="flex justify-start mt-6">
            <button
            dir="rtl"
              onClick={() => setEditModal(true)}
              className="flex items-center gap-2 px-6 py-2 bg-gray-200 text-orange-400 font-semibold rounded-lg shadow-md transition duration-300 hover:bg-primary hover:text-white"
            >
<span>  تعذيل</span>
              <UserGear size={20} /> 
            </button>
          </div>

          {editModal && (
            <div className="fixed inset-0 backdrop-blur-sm flex justify-center items-center bg-black bg-opacity-50 z-50 ">
              <div className="animate-fadeIn bg-white p-6 rounded-lg shadow-lg w-full sm:w-96 mx-4">
                <h3 className="text-2xl font-bold mb-4">Edit Profile</h3>
                <form onSubmit={(e) => { e.preventDefault(); handleEdit(); }}>
                  <div className="mb-4">
                    <label className="block text-lg font-semibold">الاسم</label>
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-lg font-semibold">رقم الهاتف</label>
                    <input
                      type="text"
                      value={editPhone}
                      onChange={(e) => setEditPhone(e.target.value)}
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-lg font-semibold">العنوان 
                    </label>
                    <input
                      type="text"
                      value={editAddress}
                      onChange={(e) => setEditAddress(e.target.value)}
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-lg font-semibold">البريد الالكتروني</label>
                    <input
                      type="email"
                      value={editEmail}
                      onChange={(e) => setEditEmail(e.target.value)}
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                  <div className="flex justify-between mt-6">
                    <button
                      type="submit"
                      className="bg-primary text-white px-4 py-2 rounded-md"
                    >
                     حفظ
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditModal(false)}
                      className="bg-gray-500 text-white px-4 py-2 rounded-md"
                    >
                     &gt; الغاء
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-gray-300 p-6 rounded-xl text-center text-lg text-gray-800 shadow-lg">
          <p>Please log in to see your account details</p>
        </div>
      )}
    </div>
  );
};

export default Uprofile;
