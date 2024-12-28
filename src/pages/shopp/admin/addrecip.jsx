import { useState, useEffect } from "react"
import { useAuth } from "../../../context/authcontext"





function Addrecip() {
    const { token } = useAuth();
    const [recipeName, setRecipeName] = useState('');
    const [recipeDescription, setRecipeDescription] = useState('');
    const [recipeImage, setRecipeImage] = useState(null);
    const [serving, setServing] = useState('');
    const [timeInMin, settimeInMin] = useState('');
    const [recipedescription, setrecipedescription] = useState('');
    const [recipeInstructions, setRecipeInstructions] = useState('');
    const [recipeProduct, setProduct] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append('name', recipeName);
        formData.append('img', JSON.stringify([
            "https://via.placeholder.com/640x480.png/000055?text=deleniti",
        ]));
        formData.append('timeInMinutes', timeInMin);
        formData.append('description', recipedescription);
        formData.append('instructions', recipeInstructions);
        formData.append('serving', serving);
        formData.append('product_id', 69);
        
        try {
            const response = await fetch('http://localhost:8000/api/recipes/create', {
                method: 'POST',
                headers: {
                    
                    'Authorization': `Bearer ${token}`, 
                },
                body: formData,
  
          });
    console.log("Response status:", response);
    return;
          if (response.ok) {
            alert('Product added successfully!');
            setRecipeName('');
            setRecipeDescription('');
            setRecipeImage('');
            setServing('');
            settimeInMin('');
            setProduct('');
            setRecipeInstructions('');
          } else {
            const errorData = await response.json();
            console.error('Error Response:', errorData);
            alert('Failed to add product.');
          }
        } catch (error) {
          console.error('Error:', error);
        //  alert('An error occurred while adding the product.');
        }
      };
    
     
    

  return (
    <>
    <div>addrecip</div>
<form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 grid grid-cols-1 md:grid-cols-2 gap-6">
    <label htmlFor="recipeName">Recipe Name</label>
    <input
        className="shadow bg-gray-100 focus:bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-secondaryLight focus:shadow-xl transition-all duration-300 ease-in-out"
        type="text"
        id="recipeName"
        value={recipeName}
        onChange={(e) => setRecipeName(e.target.value)}
    />
    
    <label htmlFor="recipeDescription">Recipe Description</label>
    <input
        className="shadow bg-gray-100 focus:bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-secondaryLight focus:shadow-xl transition-all duration-300 ease-in-out"
        type="text"
        id="recipeDescription"
        value={recipeDescription}
        onChange={(e) => setRecipeDescription(e.target.value)}
    />
    
    <label htmlFor="recipeImage">Recipe Image</label>
    <input
        className="shadow bg-gray-100 focus:bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-secondaryLight focus:shadow-xl transition-all duration-300 ease-in-out"
        type="file"
        id="recipeImage"
        onChange={(e) => setRecipeImage(e.target.files[0])}
    />
    
    <label htmlFor="serving">Serving</label>
    <input
        className="shadow bg-gray-100 focus:bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-secondaryLight focus:shadow-xl transition-all duration-300 ease-in-out"
        type="number"
        id="serving"
        value={serving}
        onChange={(e) => setServing(e.target.value)}
    />
    
    <label htmlFor="timeInMin">Time in Minutes</label>
    <input
        className="shadow bg-gray-100 focus:bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-secondaryLight focus:shadow-xl transition-all duration-300 ease-in-out"
        type="number"
        id="timeInMin"
        value={timeInMin}
        onChange={(e) => settimeInMin(e.target.value)}
    />
    
    <label htmlFor="recipedescription">Recipe Description</label>
    <textarea
        className="shadow bg-gray-100 focus:bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-secondaryLight focus:shadow-xl transition-all duration-300 ease-in-out"
        id="recipedescription"
        value={recipedescription}
        onChange={(e) => setrecipedescription(e.target.value)}
    />
    
    <label htmlFor="recipeInstructions">Recipe Instructions</label>
    <textarea
        className="shadow bg-gray-100 focus:bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-secondaryLight focus:shadow-xl transition-all duration-300 ease-in-out"
        id="recipeInstructions"
        value={recipeInstructions}
        onChange={(e) => setRecipeInstructions(e.target.value)}
    />
    
    <button
        className="bg-primary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="submit"
    >
        Add Recipe
    </button>
</form>

    </>
  )
}

export default Addrecip