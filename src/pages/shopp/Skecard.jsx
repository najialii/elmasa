import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ProductCardSkeleton = () => {
  return (
    <div className="hover:shadow-2xl p-4 cursor-pointer lg:rounded-md rounded-md
                shadow-md bg-white transition-shadow duration-500 flex flex-col lg:w-60">
      <div className="flex justify-center">
        <Skeleton height={150} width={150} />
      </div>
      <div>
        <h3 className="cursor-pointer font-extrabold">
          <Skeleton width={100} />
        </h3>
      </div>
      <p className="text-primary font-bold text-xl text-right">
        <Skeleton width={50} />
      </p>
      <div className="flex justify-center items-center mt-4 flex-grow">
        <Skeleton width={120} height={40} />
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
