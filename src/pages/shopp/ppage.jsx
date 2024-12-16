import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import LikeButton from '../../components/like';
import { CartContext } from '../../context/cart';

const PPage = () => {
  const location = useLocation();
  const { product } = location.state || {};

  if (!product) {
    return <div className="text-center py-10 text-white">No product details available</div>;
  }

  const { addToCart } = useContext(CartContext);

  return (
    <div className="bg-white text-gray-900">
      <div className="lg:max-w-7xl max-w-2xl mx-auto py-16 px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 bg-transparent p-6 ">
          
          <div className="lg:col-span-3 text-center relative">
            <div className="overflow-hidden rounded-3xl hover:scale-105 transition-all duration-300">
              <img
                src={`http://localhost/masa/storage/uploads${product.image}`}
                alt={product.name}
                className="w-full lg:w-96 rounded-3xl object-cover mx-auto"
              />
            </div>
          </div>

          
          <div className="lg:col-span-2 mt-8 lg:mt-0">
            <h2 className="text-4xl font-semibold text-gray-800">{product.name}</h2>
            <h3 className="text-lg font-light text-gray-600 mt-2">{product.sizes}</h3>

          
            <div className="flex space-x-2 mt-4">
              {[...Array(5)].map((_, index) => (
                <svg
                  key={index}
                  className="w-[20px] fill-gray-400"
                  viewBox="0 0 14 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                </svg>
              ))}
              <h4 className="text-gray-500 text-base ml-2">500 Reviews</h4>
            </div>

            
            <div className="mt-8">
              <h5 className="text-lg font-semibold text-gray-700">Highlights</h5>
              <ul className="list-disc pl-5 text-gray-600 mt-4 space-y-2">
                <li>Rich in amino acids, proteins, vitamins, and minerals.</li>
                <li>Supports overall health and well-being.</li>
                <li>Perfect addition to a healthy diet.</li>
              </ul>
            </div>


            <div className="mt-8">
              <p className="text-3xl font-bold text-gray-800">{product.price} EGP</p>
              <p className="text-gray-400 text-base">
                <strike>{product.originalPrice || ''} EGP</strike> <span className="text-sm ml-1">Tax included</span>
              </p>
            </div>

            
            <div className="mt-10 flex space-x-4">
              <button
                onClick={() => addToCart(product)}
                className="w-full py-4 px-8 bg-primary text-white font-semibold rounded-xl shadow-md hover:scale-105 transition-all duration-300"
              >
                Buy Now
              </button>
              <button
                type="button"
                className="min-w-fit px-6 py-3 border border-gray-600 bg-transparent text-gray-600 text-sm font-semibold rounded-xl hover:bg-gray-200 transition-all"
              >
                <LikeButton />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-5 gap-16">
 
          <div className="lg:col-span-3">
            <h3 className="text-2xl font-semibold text-gray-800">About the Product</h3>
            <p className="text-gray-700 mt-4">
              Our Low Fat Yoghurt contains probiotic culture, which improves the immune system, aids healthy
              digestion, and is a rich source of calcium and vitamin D3. A perfect choice for your healthy diet.
            </p>
          </div>

          <div className="lg:col-span-2">
            <div className="space-y-4">
   
              <h4 className="text-2xl font-semibold text-gray-700">Nutritional Facts</h4>
              <p className="text-gray-600">Per 100g Serving</p>

        
              <div className="space-y-4 mt-6">
                {[
                  { name: 'Calories', value: '240 kcal' },
                  { name: 'Total Fat', value: '12g' },
                  { name: 'Saturated Fat', value: '3.5g' },
                  { name: 'Trans Fat', value: '0g' },
                  { name: 'Cholesterol', value: '45mg' },
                  { name: 'Sodium', value: '430mg' },
                  { name: 'Total Carbohydrate', value: '19g' },
                  { name: 'Dietary Fiber', value: '3g' },
                  { name: 'Sugars', value: '4g' },
                  { name: 'Protein', value: '22g' },
                ].map((nutrient, index) => (
                  <div key={index} className="flex justify-between py-2 border-b border-gray-200">
                    <p className="text-lg text-gray-700">{nutrient.name}</p>
                    <p className="text-lg font-medium text-gray-800">{nutrient.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PPage;
