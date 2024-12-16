import React, { useState, useEffect } from 'react';

const CategoriesMenu = () => {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);

    // Fetch categories on component mount
    useEffect(() => {
        async function fetchCategories() {
            try {
                const response = await fetch('http://localhost/masa/api/content/items/categories');
                const data = await response.json();
                setCategories(data.items); // Assuming categories are returned in `items`
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        }

        fetchCategories();
    }, []);

    // Fetch products when a category is selected
    const fetchProducts = async (categoryId) => {
        try {
            const response = await fetch(
                `http://localhost/masa/api/content/items/products?filter[category._id]=${categoryId}&populate=*`
            );
            const data = await response.json();
            setProducts(data.items); // Assuming products are returned in `items`
            setSelectedCategory(categoryId);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    return (
        <div>
            {/* Categories Menu */}
            <nav>
                <ul>
                    {categories.map((category) => (
                        <li key={category._id} onClick={() => fetchProducts(category._id)}>
                            {category.name} {/* Adjust key and name field based on your API */}
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Products Display */}
            <div>
                {selectedCategory ? (
                    products.length > 0 ? (
                        products.map((product) => (
                            <div key={product._id}>
                                <h3>{product.productname}</h3>
                                <p>Price: {product.productprice}</p>
                                <img
                                    src={`http://localhost/masa/${product.productpic.path}`}
                                    alt={product.productpic.altText || product.productname}
                                />
                            </div>
                        ))
                    ) : (
                        <p>No products found for this category.</p>
                    )
                ) : (
                    <p>Please select a category to view products.</p>
                )}
            </div>
        </div>
    );
};

export default CategoriesMenu;
