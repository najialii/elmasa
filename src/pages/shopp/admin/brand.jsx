import { useState, useEffect } from "react";
import { useAuth } from "../../../context/authcontext";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

function Brand() {
    const [brands, setBrands] = useState([]);
    const { token } = useAuth();
    const [name, setName] = useState("");
    const [editBrands, setEditBrands] = useState(null);

    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const response = await fetch("http://localhost:8000/api/brand/list");
                const data = await response.json();
                console.log("Fetched brands:", data);
                setBrands(Array.isArray(data.data) ? data.data : []);
            } catch (error) {
                console.error("Error fetching brands:", error);
            }
        };
        fetchBrands();
    }, []);

    const handelCreateBrand = async (e) => {
        e.preventDefault();
        const brand = { name };
        console.log(brand);
        try {
            const response = await fetch("http://localhost:8000/api/brand/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(brand)
            });
            if (!response.ok) {
                throw new Error("Network response was not ok " + response.statusText);
            }
            const data = await response.json();
           toast.success('city added successfully!', {
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
            setBrands([...brands, data]);
            setName("");
            fetchBrands();
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleEditClick = (brand) => {
        setEditBrands(brand.id);
        setName(brand.name);
    };

    const handleUpdateBrand = async (e) => {
        e.preventDefault();
        const updatedBrand = { name };
        try {
            const response = await fetch(`http://localhost:8000/api/brand/update/${editBrands}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    
                },
                body: JSON.stringify(updatedBrand)
            });
            if (!response.ok) {
                throw new Error("Network response was not ok " + response.statusText);
            }
            const data = await response.json();
            console.log("Updated brand:", data);
            setEditBrands(null);
            setName("");
            const fetchBrands = async () => {
                try {
                    const response = await fetch("http://localhost:8000/api/brand/list");
                    const data = await response.json();
                    setBrands(Array.isArray(data.data) ? data.data : []);
                } catch (error) {
                    console.error("Error fetching brands:", error);
                }
            };
            fetchBrands();
        } catch (error) {
            console.error("Error updating brand:", error);
        }
    };

    return (
        <div>
            <form
                onSubmit={handelCreateBrand}
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 grid grid-cols-1 md:grid-cols-2 gap-6"
            >
                <div>
                    <label htmlFor="name">Name EN</label>
                    <input
                        className="shadow bg-gray-100 focus:bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-secondaryLight focus:shadow-xl transition-all duration-300 ease-in-out"
                        type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="flex justify-end w-full">
                    <button className="bg-primary text-white p-2 rounded-md">
                        Add Brand
                    </button>
                </div>
            </form>

            <div className="overflow-x-scroll max-h-[450px] rounded-lg shadow-lg">
                <table className="min-w-full  table-auto border-collapse border border-gray-300">
                    <thead className="bg-gray-100 sticky top-0 text-gray-800 text-sm">
                        <tr className="hover:bg-gray-50 transition-colors duration-200 ">
                            <th className="py-2">ID</th>
                            <th className="py-2">Name</th>
                            <th className="py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {brands.map((brand) => (
                            <tr className="hover:bg-gray-50 transition-colors duration-200" key={brand.id}>
                                <td className="border px-6 py-4 text-sm font-medium text-gray-700">{brand.id}</td>
                                <td className="border px-6 py-4 text-sm font-medium text-gray-700">{brand.name}</td>
                                <td className="border px-6 py-4 text-sm font-medium text-gray-700 flex gap-4">
                                    <button
                                        onClick={() => handleEditClick(brand)}
                                        className="bg-primary text-white p-2 rounded-md"
                                    >
                                        Edit
                                    </button>
                                    <button className="bg-red-500 text-white p-2 rounded-md">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {editBrands && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-md">
                        <h2 className="text-xl mb-4">Edit Brand</h2>
                        <form onSubmit={handleUpdateBrand}>
                            <div className="mb-4">
                                <label htmlFor="editName" className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                                <input
                                    className="shadow bg-gray-100 focus:bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-secondaryLight focus:shadow-xl transition-all duration-300 ease-in-out"
                                    type="text" id="editName" value={name} onChange={(e) => setName(e.target.value)} />
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
                                    onClick={() => setEditBrands(null)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

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

export default Brand;