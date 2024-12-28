import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/authcontext";
import { UserGear } from "@phosphor-icons/react";

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
console.log(user)
  const handleEdit = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/user/update", {
        method: "POST",
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
        const response = await fetch('http://localhost:8000/api/user/me', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const result = await response.json();
        // console.log("here are the results ", result);
        setData(result.data); 
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

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/user/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        logout();
        navigate("/login");
      } else {
        throw new Error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
      alert("Failed to log out. Please try again.");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1>User Profile</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 mt-4"
        >
          Logout
        </button>
      </div>
      <div className="mt-8 flex justify-center">
        {data ? (
          <div key={data.id} className="bg-white shadow-xl rounded-md p-8 max-w-lg w-full transition-transform transform">
            <div className="mb-6">
              <h2 className="text-gray-800 font-bold text-4xl">{data.name}</h2>
            </div>
            <div className="mb-6 space-y-4">
              <div className="text-gray-800 text-lg flex justify-between">
                <strong className="text-gray-600">Email:</strong>
                <span className="text-gray-800 font-semibold">{data.email}</span>
              </div>
              <div className="text-gray-800 text-lg flex justify-between">
                <strong className="text-primary">Phone:</strong>
                <span className="text-gray-800 font-semibold">{data.phone}</span>
              </div>
              <div className="text-gray-800 text-lg flex justify-between">
                <strong className="text-primary">Address:</strong>
                <span className="text-gray-800 font-semibold">{data.address}</span>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setEditModal(true)}
                className="flex items-center gap-2 px-6 py-2 bg-secondary text-primary font-semibold rounded-lg shadow-md transition duration-300"
              >
                <UserGear size={20} color="#000" weight="bold" /> <span>Edit</span>
              </button>
              {editModal && (
                <div className="fixed inset-0 backdrop-blur-sm flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
                  <div className="bg-white p-6 rounded-lg shadow-lg w-96">
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
                      <div className="flex justify-between">
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
          </div>
        ) : (
          <div className="bg-gray-300 p-6 rounded-xl text-center text-lg text-gray-800 shadow-lg">
            <p>Please log in to see your account details</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Uprofile;
