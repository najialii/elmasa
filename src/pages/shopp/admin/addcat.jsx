import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../context/authcontext';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function Addcat() {
    const [catName, setCatName] = useState("");
    const [categories, setCategories] = useState([]);
    const { token } = useAuth();
    const [loading, setLoading] = useState(true);   

    const handleCreateCat = async (e) => {
        e.preventDefault();
        const cat = { name: catName };
        console.log(cat);
        try {
            const response = await axios.post("http://localhost:8000/api/category/add", cat, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    "Content-Type": "application/json",
                }
            });
            toast.success('Category added successfully!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
            });
            setCategories([...categories, response.data.data]);
            setCatName("");
        } catch (error) {
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true);
            try {
                const response = await axios.get("http://localhost:8000/api/categories");
                const data = response.data;
                console.log("Fetched categories:", data);
                setCategories(Array.isArray(data.data.data) ? data.data.data : []);
            } catch (error) {
                console.error("Error fetching categories:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCategories();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-full">
                <div className="loading">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div>
                <form onSubmit={handleCreateCat} action="">
                    <label htmlFor="name">Name EN</label>
                    <input
                        className="shadow bg-gray-100 focus:bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-secondaryLight focus:shadow-xl transition-all duration-300 ease-in-out"
                        value={catName}
                        onChange={(e) => setCatName(e.target.value)}
                        type="text"
                    />
                    
                    <div className='mt-4 flex justify-end w-full'>
                        <button className='bg-primary text-white p-2 rounded-md'>
                            Create Category
                        </button>
                    </div>
                </form>
            </div>
            <div className="overflow-x-scroll max-h-[450px] rounded-lg shadow-lg mt-4">
                <table className="min-w-full table-auto border-collapse border border-gray-300">
                    <thead className="bg-gray-100 sticky top-0 text-gray-800 text-sm">  
                        <tr>
                            <th className="border px-6 py-3 text-left">ID</th>
                            <th className="border px-6 py-3 text-left">Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((cat) => (
                            <tr key={cat.id} className="hover:bg-gray-50 transition-colors duration-200">
                                <td className="border px-6 py-4 text-sm font-medium text-gray-700">{cat.id}</td>
                                <td className="border px-6 py-4 text-sm font-medium text-gray-700">{cat.name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                transition={Bounce}
            />
        </div>
    );
}

export default Addcat;