import { useState, useEffect } from "react";
import { useAuth } from "../../../context/authcontext";
import { Image } from "@phosphor-icons/react";
import axios from "axios";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function Addrecip() {
  const { token } = useAuth();
  const [file , setFile] = useState()
  const [recipeName, setRecipeName] = useState('');
  const [recipeDescription, setRecipeDescription] = useState('');
  const [recipeImage, setRecipeImage] = useState(null);
  const [serving, setServing] = useState('');
  const [timeInMin, settimeInMin] = useState('');
  const [recipedescription, setrecipedescription] = useState('');
  const [recipeInstructions, setRecipeInstructions] = useState('');
  const [recipeProduct, setProduct] = useState([]);
  const [products , setProducts] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);


  const handleImgChange = (e) => {
    console.log(e.target.files[0])
    setRecipeImage(e.target.files[0]);
    const file = e.target.files[0];
    console.log("joiii",e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));  
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append('name', recipeName);
    formData.append('img', recipeImage);
    formData.append('timeInMinutes', timeInMin);
    formData.append('description', recipedescription);
    formData.append('instructions', recipeInstructions);
    formData.append('serving', serving);
    formData.append('product_id', selectedProduct);
    try {
      const response = await axios.post(`${API_BASE_URL}/recipe/create`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      console.log("form data " ,formData)

      console.log("Response status:", response);
      if (response.status === 201) {
        toast.success('Recipe  added successfully!', {
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
        setRecipeName('');
        setRecipeDescription('');
        setRecipeImage(null);
        setServing('');
        settimeInMin('');
        setProduct([]);
        setRecipeInstructions('');
      } else {
        console.error('Error Response:', response.data);
        alert('Failed to add recipe.');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/products`);
      const productList = response.data.products.data; 
      console.log(productList)
      setProducts(productList); 
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);


const handelUpdateImg =()=>{
  setFile()
}

  return (
    <>
      <div className="flex flex-col items-start mt-8 h-fit bg-white w-full p-6">
        <div className="flex justify-start px-4">

        <h1 className="text-4xl font-bold ">
          Add Recipies
        </h1>
        </div>

      </div>
      <form onSubmit={handleSubmit} className="px-8 pt-6 pb-8 mb-4">
        <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <div className="bg-white rounded-xl p-6">
              <label htmlFor="recipeName">Recipe Name</label>
              <input
                className="shadow bg-white  focus:bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-primaryLight focus:shadow-xl transition-all duration-300 ease-in-out"
                type="text"
                id="recipeName"
                value={recipeName}
                onChange={(e) => setRecipeName(e.target.value)}
              />

              <label htmlFor="recipeDescription">Recipe Description</label>
              <textarea
                className="shadow bg-white focus:bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-primaryLight focus:shadow-xl transition-all duration-300 ease-in-out"
                type="text"
                id="recipeDescription"
                value={recipeDescription}
                onChange={(e) => setRecipeDescription(e.target.value)}
              />
            </div>

            <div className="bg-white p-6 my-6 rounded-xl">
              <label htmlFor="recipedescription">Recipe Description</label>
              <textarea
                className="shadow bg-white focus:bg-white appearance-none border m-4 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-primaryLight focus:shadow-xl transition-all duration-300 ease-in-out"
                id="recipedescription"
                value={recipedescription}
                onChange={(e) => setrecipedescription(e.target.value)}
              />

              <label htmlFor="recipeInstructions">Recipe Instructions</label>
              <textarea
                className="shadow bg-white focus:bg-white mb-4 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-primaryLight focus:shadow-xl transition-all duration-300 ease-in-out"
                id="recipeInstructions"
                value={recipeInstructions}
                onChange={(e) => setRecipeInstructions(e.target.value)}
              />

              <label htmlFor="productSelect">Product</label>
              <select
                id="productSelect"
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
                className="shadow bg-white focus:bg-white border rounded w-full py-2 px-3"
              >
                <option value="">Select a product</option>
                {products.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div  className="flex flex-col items-center justify-start  w-full h-full  ">
            <div className="flex flex-col  items-center justify-center   relative border-2  border-dashed border-gray-300 p-6 space-y-4">
              { file? (
               <div>

              <img src={file} alt="" srcset="" />
              <div className="flex justify-end mt-4">
              <button onClick={handelUpdateImg} className='bg-orange-400 text-white p-2 rounded-md '>
    change image
   </button>
              </div>
              </div>) :


             ( <div>

              
              <label htmlFor="recipeImage">Recipe Image</label>
              <Image size={100} weight="thin" color="#000" />
              <input
                className="absolute inset-0 mb-4 w-full h-full opacity-0 cursor-pointer"
                type="file"
                id="recipeImage"
                onChange={handleImgChange}
                />
                </div>
)}
            </div>

            <div className="flex flex-col mt-6 p-6 bg-white sm:flex-row items-center gap-4 w-full">
              <div className="flex flex-col w-full sm:w-1/2">
                <label
                  htmlFor="serving"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Serving
                </label>
                <input
                  className="shadow bg-white mb-4 focus:bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-primaryLight focus:shadow-xl transition-all duration-300 ease-in-out"
                  type="number"
                  id="serving"
                  value={serving}
                  onChange={(e) => setServing(e.target.value)}
                />
              </div>

              <div className="flex flex-col w-full sm:w-1/2">
                <label
                  htmlFor="timeInMin"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Time in Minutes
                </label>
                <input
                  className="shadow bg-white mb-4 focus:bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-primaryLight focus:shadow-xl transition-all duration-300 ease-in-out"
                  type="number"
                  id="timeInMin"
                  value={timeInMin}
                  onChange={(e) => settimeInMin(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button 
            className="bg-primary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Adding..." : "Add Recipe"}
          </button>
        </div>
      </form>

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
    </>
  );
}

export default Addrecip;