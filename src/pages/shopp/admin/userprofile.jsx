import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/authcontext";
import { UserGear, UserCircle } from "@phosphor-icons/react";
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/user/me`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

      
        if (response.status >= 200 && response.status < 300) {
          console.log("Fetched Data:", response.data);
          setData(response.data);
        } else {
          throw new Error('Failed to fetch data');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchData();
    }
  }, [token]); 

 

  return (
    <div className="container ">
      {data  ? (
        <div className="bg-white w-1/2 p-6 rounded-lg shadow-md shadow-gray-50  mx-auto">
          <div className="flex items-center  mb-6   p-4 rounded-md">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 flex justify-center items-center  rounded-full">
                <UserCircle size={40} />
              </div>
              <h2 className="text-3xl font-bold text-gray-800">Welcome back, {data.name}</h2>
            </div>
          </div>
          <div className="space-y-4 mb-6 grid grid-cols-2">
            <div className="flex  text-lg">
              <span className="text-gray-600">Email:</span>
              <span className="font-semibold text-gray-800">{data.email}</span>
            </div>
            <div className="flex  text-lg">
              <span className="text-primary">Phone:</span>
              <span className="font-semibold text-gray-800">{data.phone}</span>
            </div>
            <div className="flex  text-lg">
              <span className="text-primary">Address:</span>
              <span className="font-semibold text-gray-800">{data.address}</span>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              onClick={() => setEditModal(true)}
              className="flex items-center gap-2 px-6 py-2 bg-secondary text-primary font-semibold rounded-lg shadow-md transition duration-300 hover:bg-primary hover:text-white"
            >
              <UserGear size={20} /> <span>Edit</span>
            </button>
          </div>

          {editModal && (
            <div className="fixed inset-0 backdrop-blur-sm flex justify-center items-center bg-black bg-opacity-50 z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-96">
                <h3 className="text-2xl font-bold mb-4">Edit Profile</h3>
                <form onSubmit={(e) => { e.preventDefault(); handleEdit(); }}>
                  <div className="mb-4">
                    <label className="block text-lg font-semibold">Name</label>
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-lg font-semibold">Phone</label>
                    <input
                      type="text"
                      value={editPhone}
                      onChange={(e) => setEditPhone(e.target.value)}
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-lg font-semibold">Address</label>
                    <input
                      type="text"
                      value={editAddress}
                      onChange={(e) => setEditAddress(e.target.value)}
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-lg font-semibold">Email</label>
                    <input
                      type="email"
                      value={editEmail}
                      onChange={(e) => setEditEmail(e.target.value)}
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                  <div className="flex  mt-6">
                    <button
                      type="submit"
                      className="bg-primary text-white px-4 py-2 rounded-md"
                    >
                      Save Changes
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditModal(false)}
                      className="bg-red-500 text-white px-4 py-2 rounded-md"
                    >
                      Cancel
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
