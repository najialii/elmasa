import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../../context/cart";
import LikeButton from "../../components/like";
import { List } from "@phosphor-icons/react";
import Pcard from "./pcards";
import useFetch from "../../components/hooks/usefetch";

function CategoryPage() {
  const { id } = useParams(); 
  console.log("kssom al id ",id)
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  // const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    priceRange: [0, 1000],
    search: "",
    size: "all",
  });

  const {data , loading ,error} = useFetch(`http://localhost:8000/api/products?cid=${id}`)

  const { addToCart } = useContext(CartContext);
//sidebar fun 

  const [isFilterOpen, setIsFilterOpen] = useState(false); 
  console.log("anan el product",data)
  // setProducts(cleanedData);

  // useEffect(() => {
  //   const fetchCategoryDetails = async () => {
  //     try {
  //       const categoryResponse = await fetch(
  //         `http://localhost/masa/api/content/item/category/${id}?populate=*`
  //       );
  //       const categoryData = await categoryResponse.json();

  //       const productIds = categoryData.product?.map((prod) => prod._id) || [];

  //       if (productIds.length > 0) {
  //         const productRequests = productIds.map((productId) =>
  //           fetch(`http://localhost/masa/api/content/item/products/${productId}?populate=*`)
  //         );

  //         const productResponses = await Promise.all(productRequests);
  //         const productData = await Promise.all(
  //           productResponses.map((res) => res.json())
  //         );

  //         const cleanedData = productData.map((product) => ({
  //           id: product._id,
  //           name: product.productname?.trim() || "Unnamed Product",
  //           price: Number(product.productprice || 0), 
  //           image:
  //             Array.isArray(product.productpic) && product.productpic[0]
  //               ? product.productpic[0].path
  //               : "",
  //           size: product.sizes || [],
  //         }));

  //         setProducts(cleanedData);
  //         setFilteredProducts(cleanedData);
  //       } else {
  //         console.warn("No products found in the category.");
  //       }
  //     } catch (error) {
  //       console.error("Error fetching products:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchCategoryDetails();
  // }, [id]);

  const applyFilters = () => {
    const { priceRange, search, size } = filters;
    const filtered = products.filter((product) => {
      const price = product.price;
      const matchesPrice = price >= priceRange[0] && price <= priceRange[1];
      const matchesSearch = product.name
        ?.toLowerCase()
        .includes(search.toLowerCase());
      const matchesSize =
        size === "all" || product.size.includes(size);
      return matchesPrice && matchesSearch && matchesSize;
    });
    setFilteredProducts(filtered);
  };

  useEffect(() => {
    applyFilters();
  }, [filters, products]);

  const handleSearchChange = (e) => {
    setFilters((prev) => ({ ...prev, search: e.target.value }));
  };

  const handlePriceChange = (e) => {
    const [min, max] = e.target.value.split("-").map(Number);
    setFilters((prev) => ({ ...prev, priceRange: [min, max] }));
  };

  const handleSizeChange = (e) => {
    setFilters((prev) => ({ ...prev, size: e.target.value }));
  };

  if (loading)
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-10 animate-[spin_0.8s_linear_infinite] fill-blue-600 block mx-auto"
          viewBox="0 0 24 24"
        >
          <path
            d="M12 22c5.421 0 10-4.579 10-10h-2c0 4.337-3.663 8-8 8s-8-3.663-8-8c0-4.336 3.663-8 8-8V2C6.579 2 2 6.58 2 12c0 5.421 4.579 10 10 10z"
          />
        </svg>
      </div>
    );

  const handelProductDetails = (product) => {
    navigate(`/product/${product.id}`, { state: { product } });
  };

  return (
    <div className="flex flex-col lg:flex-row">
     
      <button
        className="lg:hidden p-4  flex justify-start items-center gap-2 text-gray-800 rounded-lg mb-4"
        onClick={() => setIsFilterOpen((prev) => !prev)}>
        <List size={30} color="#000" />
       <span className="font-bold text-xl"> {isFilterOpen ? "Close" : "Filter"}</span>
      </button>
      
      <aside
        className={`w-full lg:w-64 p-4 bg-white rounded-l-lg shadow-lg lg:h-screen mb-6 lg:mb-0 transition-all duration-500 ease-in-out transform ${
          isFilterOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        } lg:opacity-100 lg:max-h-screen`}
      >
        <h2 className="text-xl font-bold mb-4">Filter Products</h2>
        <div className="mb-4">
          <label className="block font-semibold mb-2">Search</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            placeholder="Search products..."
            value={filters.search}
            onChange={handleSearchChange}
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-2">Price Range</label>
          <select
            className="w-full border rounded px-3 py-2"
            onChange={handlePriceChange}
          >
            <option value="0-1000">All</option>
            <option value="0-100">0 - 100</option>
            <option value="100-500">100 - 500</option>
            <option value="500-1000">500 - 1000</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-2">Size</label>
          <select
            className="w-full border rounded px-3 py-2"
            value={filters.size}
            onChange={handleSizeChange}
          >
            <option value="all">All Sizes</option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
            <option value="XL">Extra Large</option>
          </select>
        </div>
      </aside>

      <main className="flex-1 px-2 py-2 bg-gray-100">
        <h1 className="text-2xl font-bold mb-5">Products in</h1>

        <div className="mt-12">
          <Pcard
            products={filteredProducts}
            addToCart={addToCart}
            handelProductDetails={handelProductDetails}
          />
        </div>
      </main>
    </div>
  );
}

export default CategoryPage;
