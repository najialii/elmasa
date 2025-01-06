import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Recipage() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/recipes/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch recipe');
                }
                const data = await response.json();
                cobsol,e.log(data)
                setRecipe(data.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRecipe();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="container mx-auto py-10">
            {recipe && (
                <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <h1 className="text-2xl font-bold mb-4">{recipe.name}</h1>
                    <img src={recipe.img[0]} alt={recipe.name} className="w-full h-auto mb-4" />
                    <p className="mb-4"><strong>Description:</strong> {recipe.description}</p>
                    <p className="mb-4"><strong>Time:</strong> {recipe.timeInMinutes} minutes</p>
                    <p className="mb-4"><strong>Serving:</strong> {recipe.serving}</p>
                    <p className="mb-4"><strong>Instructions:</strong> {recipe.instructions}</p>
                </div>
            )}
        </div>
    );
}

export default Recipage;
