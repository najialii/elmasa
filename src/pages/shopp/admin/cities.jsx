import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../../context/authcontext';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
function Cities() {
    const  [cities, setCities] = useState([]);
    const [editCity, setEditCity] = useState(null);
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const {token} = useAuth();
    const effectRan = useRef(false)

    const handelCreateCities = async (e) => {
        e.preventDefault();

        if (!name || !price) {
            alert("Please fill out all fields");
            return;
        }
        const city = { name, price: Number(price) };
        console.log(city);
        fetch(`${API_BASE_URL}/city/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(city)
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response not ok " + response.statusText);
                }
                return response.json();
            })
            .then((data) => {
                alert("Success:", data);
                setName("");
                setPrice(0);
                fetchCities();
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    const fetchCities = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/city/list`);
            const data = await response.json();
            console.log("Fetched cities:", data);
            setCities(Array.isArray(data.data) ? data.data : []);
        } catch (error) {
            console.error("Error fetching cities:", error);
        }
    };
    useEffect(() => {
        if(!effectRan.current){
            effectRan.current = true
            fetchCities();
        }
    }, []);

    const handleEditClick = (city) => {
        setEditCity(city.id);
        setName(city.name);
        setPrice(city.price);
    };

    const handleUpdateCity = async (e) => {
        e.preventDefault();
        const updatedCity = { name, price: Number(price) };
        try {
            const response = await fetch(`${API_BASE_URL}/update/${editCity}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedCity)
            });
            if (!response.ok) {
                throw new Error("Network response was not ok " + response.statusText);
            }
            const data = await response.json();
            console.log("Updated city:", data);
            setEditCity(null);
            setName("");
            setPrice(0);
            fetchCities();
        } catch (error) {
            console.error("Error updating city:", error);
        }
    };

    return (
        <div  
        
        >
            <form
                onSubmit={handelCreateCities}
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 grid grid-cols-1 md:grid-cols-2 gap-6"
            >
                <div className="mb-4">
                    <label htmlFor="name">Name</label>
                    <input
                        className="shadow bg-gray-100 focus:bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-secondaryLight focus:shadow-xl transition-all duration-300 ease-in-out"
                        type="text" name="name" value={name} 
                        onChange={(e) => setName(e.target.value)}
                        id="name" />
                </div>
                <div>
                    <label htmlFor="price">Price</label>
                    <input
                        className="shadow bg-gray-100 focus:bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-secondaryLight focus:shadow-xl transition-all duration-300 ease-in-out"
                        type="number"
                        value={price} onChange={(e) => setPrice(e.target.value)}
                        name="price" id="price" />
                </div>
                <div className='flex justify-end'>
                    <button className="bg-primary text-white font-bold py-2 px-4 rounded">Create City</button>
                </div>
            </form>

            <div className="overflow-x-scroll max-h-[450px] rounded-lg shadow-lg">
                <table className="min-w-full  table-auto border-collapse border border-gray-300">
                    <thead className='bg-gray-100 sticky top-0 text-gray-800 text-sm    '>
                        <tr>
                            <th className="border px-6 py-3 text-left">ID</th>
                            <th className="border px-6 py-3 text-left">Name</th>
                            <th className="border px-6 py-3 text-left">Price</th>
                            <th className="border px-6 py-3 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cities.map((city) => (
                            <tr className='hover:bg-gray-50 transition-colors duration-200' key={city.id}>
                                <td className="border px-6 py-4 text-sm font-medium text-gray-700">{city.id}</td>
                                <td className="border px-6 py-4 text-sm font-medium text-gray-700">{city.name}</td>
                                <td className="border px-6 py-4 text-sm font-medium text-gray-700">{city.price}</td>
                                <td className="border px-6 py-4 text-sm font-medium text-gray-700 gap-2">
                                    <button
                                        className="bg-primary text-white font-bold py-2 px-4 rounded"
                                        onClick={() => handleEditClick(city)}
                                    >
                                        Edit
                                    </button>
                                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {editCity && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-md">
                        <h2 className="text-xl mb-4">Edit City</h2>
                        <form onSubmit={handleUpdateCity}>
                            <div className="mb-4">
                                <label htmlFor="editName" className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                                <input
                                    className="shadow bg-gray-100 focus:bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-secondaryLight focus:shadow-xl transition-all duration-300 ease-in-out"
                                    type="text" id="editName" value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="editPrice" className="block text-gray-700 text-sm font-bold mb-2">Price</label>
                                <input
                                    className="shadow bg-gray-100 focus:bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-secondaryLight focus:shadow-xl transition-all duration-300 ease-in-out"
                                    type="number" id="editPrice" value={price} onChange={(e) => setPrice(e.target.value)} />
                            </div>
                            <div className="flex items-center justify-between">
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    Update
                                </button>
                                <button
                                    type="button"
                                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    onClick={() => setEditCity(null)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Cities;