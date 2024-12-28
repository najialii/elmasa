import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../context/authcontext';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Addcat() {
    const [catName, setCatName] = useState("");
    const [categories, setCategories] = useState([]);
    const { token } = useAuth();

    const handleCreateCat = async (e) => {
        e.preventDefault();
        const cat = { name: catName };
        console.log(cat);
        try {
            const response = await fetch("http://localhost:8000/api/category/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(cat)
            });
            if (!response.ok) {
                throw new Error("Network response was not ok " + response.statusText);
            }
            const data = await response.json();
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
            setCategories([...categories, data]);
            setCatName("");
        } catch (error) {
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch("http://localhost:8000/api/categories");
                const data = await response.json();
                console.log("Fetched categories:", data);
                setCategories(Array.isArray(data.data.data) ? data.data.data : []);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        fetchCategories();
    }, []);

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