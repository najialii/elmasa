import LikeButton from '../../components/like';
import { Basket } from '@phosphor-icons/react';

const Pcard = ({ products, addToCart, handelProductDetails }) => {
  // Check if products exist and ensure data is present
  if (!products?.products?.data || products.products.data.length === 0) {
    return <p>No products available</p>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 sm:gap-1 font-cairo">
      {products.products.data.map((product) => {
        let images = [];
        try {
          images = JSON.parse(product.img); // Parse the images JSON string
        } catch (error) {
          console.error('Invalid JSON format for images:', product.img);
        }

        return (
          <div
            key={product.id}
            className="bg-white shadow hover:shadow-2xl p-4 cursor-pointer lg:rounded-xl border border-gray-200 
            transition-shadow duration-500 flex flex-col lg:w-56"
          >
            <div className="flex justify-end">
              <LikeButton />
            </div>
            <div className="flex justify-center">
              <img
                src={images[0] || 'https://via.placeholder.com/150'} 
                alt={product.name}
                className="w-fit object-cover h-32 sm:h-56 lg:h-fit rounded-md mb-4"
              />
            </div>
            <div onClick={() => handelProductDetails(product)}>
              <h3 className="text-gray-400">Brand: Elmasa</h3>
              <h3 className="cursor-pointer text-gray-700 font-bold hover:underline truncate">
                {product.name}
              </h3>
            </div>
            <p className="text-primary font-bold text-xl">{product.price} EGP</p>
            <div className="flex justify-center items-center mt-4 flex-grow">
              <button
                onClick={() => addToCart(product)}
                className="flex items-center justify-center gap-2 relative h-10 rounded-xl
                w-52 overflow-hidden bg-primary text-white shadow-2xl transition-all"
              >
                <Basket size={20} color="#fff" />
                Buy Now
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Pcard;
