import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        const response = await fetch(
          `http://localhost/masa/api/products?category=${categoryName}?populate=*`
        );
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching category products:", error);
      }
    };

    fetchCategoryProducts();
  }, [categoryName]);

  return (
    <div>
      <h1>{categoryName} Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white shadow-lg rounded-lg p-4">
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p>{product.price} EGP</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
