import { useState, useEffect, useRef } from "react";
import { useAuth } from "../../../context/authcontext";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
function Brand() {
    const [brands, setBrands] = useState([]);
    const { token } = useAuth();
    const [name, setName] = useState("");
    const [editBrands, setEditBrands] = useState(null);
    const [loading, setLoading] = useState(true);
    const effectRan = useRef(false)
    const fetchBrands = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/brand/list`);
            const data = await response;
            console.log("Fetched brands:", data);
            setLoading(false);
            setBrands(Array.isArray(response.data.data) ? response.data.data : []);
        } catch (error) {
            console.error("Error fetching brands:", error);
        }
    };
    useEffect(() => {
    
        if (!effectRan.current) {
            effectRan.current = true 
            fetchBrands();
        }
    }, []);

    const handelCreateBrand = async (e) => {
        e.preventDefault();
        const brand = { name };
        console.log(brand);
      
        try {
          const response = await axios.post(
            `${API_BASE_URL}/brand/create`,
            brand,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
      
          // Axios automatically parses JSON, no need for response.json()
          const data = response.data;
      
          // Assuming your API returns the created brand in the response
          toast.success("Brand added successfully!", {
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
      
          setBrands([...brands, data]); // Add the new brand to the existing list
          setName(""); // Reset the input field
          fetchBrands(); // Refresh the brand list
        } catch (error) {
          // Handle the error appropriately
          if (error.response) {
            // Server responded with a status code other than 2xx
            console.error("Error Response:", error.response.data);
          } else if (error.request) {
            // Request was made, but no response received
            console.error("No Response:", error.request);
          } else {
            // Something happened during request setup
            console.error("Request Error:", error.message);
          }
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
            const response = await axios.post(`${API_BASE_URL}/brand/update/${editBrands}`, {
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
            <form
                onSubmit={handelCreateBrand}
                className="bg-white  rounded px-8 pt-6 pb-8 mb-4 grid grid-cols-1 md:grid-cols-2 gap-6"
            >
                <div>
                    <label className="texr-xl mb-6" htmlFor="name">Name EN</label>
                    <input
              className="shadow bg-gray-100 focus:bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-primary-light focus:shadow-xl transition-all"
                        type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="flex justify-end w-full">
                    <button className="bg-primary text-white p-2 rounded-md">
                        Add Brand
                    </button>
                </div>
            </form>

            <div className="overflow-x-scroll max-h-[450px] rounded-lg shadow-lg lg:mx-12">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100 sticky top-0 text-gray-800 text-sm   ">
                        <tr className="hover:bg-gray-50 transition-colors duration-200 ">
                            <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">ID</th>
                            <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 whitespace-nowrap">
                        {brands.map((brand) => (
                            <tr className="hover:bg-gray-50 transition-colors duration-200" key={brand.id}>
                                <td className="px-4 py-4 text-sm text-gray-800">{brand.id}</td>
                                <td className="px-4 py-4 text-sm text-gray-800">{brand.name}</td>
                                <td className="px-4 py-4 text-sm text-gray-800">
                                <button     onClick={() => handleEditClick(brand)} className="mr-4" title="Edit">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 fill-primary "
                  viewBox="0 0 348.882 348.882">
                  <path
                    d="m333.988 11.758-.42-.383A43.363 43.363 0 0 0 304.258 0a43.579 43.579 0 0 0-32.104 14.153L116.803 184.231a14.993 14.993 0 0 0-3.154 5.37l-18.267 54.762c-2.112 6.331-1.052 13.333 2.835 18.729 3.918 5.438 10.23 8.685 16.886 8.685h.001c2.879 0 5.693-.592 8.362-1.76l52.89-23.138a14.985 14.985 0 0 0 5.063-3.626L336.771 73.176c16.166-17.697 14.919-45.247-2.783-61.418zM130.381 234.247l10.719-32.134.904-.99 20.316 18.556-.904.99-31.035 13.578zm184.24-181.304L182.553 197.53l-20.316-18.556L294.305 34.386c2.583-2.828 6.118-4.386 9.954-4.386 3.365 0 6.588 1.252 9.082 3.53l.419.383c5.484 5.009 5.87 13.546.861 19.03z"
                    data-original="#000000" />
                  <path
                    d="M303.85 138.388c-8.284 0-15 6.716-15 15v127.347c0 21.034-17.113 38.147-38.147 38.147H68.904c-21.035 0-38.147-17.113-38.147-38.147V100.413c0-21.034 17.113-38.147 38.147-38.147h131.587c8.284 0 15-6.716 15-15s-6.716-15-15-15H68.904C31.327 32.266.757 62.837.757 100.413v180.321c0 37.576 30.571 68.147 68.147 68.147h181.798c37.576 0 68.147-30.571 68.147-68.147V153.388c.001-8.284-6.715-15-14.999-15z"
                    data-original="#000000" />
                </svg>
              </button>
                                  
                                    {/* <button
                                        onClick={() => handleEditClick(brand)}
                                        className="bg-primary text-white p-2 rounded-md"
                                    >
                                        Edit
                                    </button>
                                    <button className="bg-red-500 text-white p-2 rounded-md">
                                        Delete
                                    </button> */}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {editBrands && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 w-80 rounded shadow-md">
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
                                    className="bg-primary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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