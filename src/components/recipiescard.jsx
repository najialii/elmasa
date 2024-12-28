import LikeButton from '../components/like';
import {MagnifyingGlass, PaperPlaneRight, CheckCircle, UsersThree, ClockCountdown } from "@phosphor-icons/react";

const Rcard = ({data, handleGetRecipe, recipesToShow, pending}) => {
  console.log("the data ",data)
  console.log("data.data:", data.recipes);
    return (
        <div className="grid py-[50px] overflow-x-hidden grid-cols-2 justify-center  sm:grid-cols-2 lg:grid-cols-5 xl:grid-cols-3 sm:gap-1 font-cairo lg:gap-2 ">
            
            {data && data.recipes && data.recipes.data.map((data) => {
                const images = (data.img);
                // data && data.data && data.data.data.map
                return (
//                   <div key={data.id} className='bg-red-200 h-40 w-40 border border-32'>
// <h2 className='text-5xl'>
//   {data.name}
// </h2>
// <button className='bg-green-300 rounded-xl p-4 '>
//   get it
// </button>
//                   </div>
                    <div key={data.id} className="bg-white hover:shadow-2xl p-4 cursor-pointer lg:rounded-xl 
                border border-gray-200 transition-shadow duration-500 flex flex-col lg:w-56">
                        
                   
                        <div className="rounded-full aspect-square size-1/1 mx-auto flex flex-col justify-center items-center">
                            <img
                                src={images[0]}
                                className="lg:w-40 w-32 object-cover h-auto"
                                alt={data.name}
                            />
                        </div>
                        <div className='flex flex-col h-full justify-between truncate'>
                            <h3 className="text-center text-white text-lg font-bold mb-4">{data.name}</h3>
                        </div>

                        <div className="flex justify-between text-white shadow-none">
                            <span className="flex gap-2 p-2 font-bold text-gray-900">
                                {data.timeInMinutes} min
                                <ClockCountdown size={24} color="#5ab4c4" weight="fill" />
                            </span>
                            <span className="text-gray-800 p-2 flex font-bold gap-2">
                                {data.serving}
                                <UsersThree size={24} color="#5ab4c4" weight="fill"/>
                            </span>
                        </div>

                        <div className="flex flex-col justify-between mt-4 transition-shadow duration-500 h-full">
                            <div className="flex justify-center flex-grow mt-4 items-center w-full shadow-none">
                                <a
                                    href="#"
                                    onClick={() => handleGetRecipe(data)}
                                    className="flex items-center justify-center gap-2 relative h-10 rounded-md
                    w-40 overflow-hidden  bg-primary font-bold text-sm text-white"
                                >
                                    Get Recipe
                                </a>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Rcard;
