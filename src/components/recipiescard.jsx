import LikeButton from '../components/like';
import {MagnifyingGlass, PaperPlaneRight, CheckCircle,UsersThree,ClockCountdown } from "@phosphor-icons/react";

const Rcard = ({recipies, handleGetRecipe,recipesToShow,pending})=>{
  
    return (
<div className="  w-screen mx-auto grid grid-cols-1 lg:grid-cols-4 
      md:grid-cols-2 justify-center items-center gap-y-20 gap-x-8 py-[80px]">
        {recipies.slice(0, recipesToShow).map((recipie) => (
          <div key={recipie.id} 
          className="flex flex-col justify-start w-72 w-md hover:shadow-2xl p-4 rounded-xl border border-gray transition-shadow duration-500">
            <div className="flex justify-end">
            <div>
                < LikeButton />
              </div>
            </div>
            <div className="rounded-full aspect-square size-1/1 mx-auto  flex flex-col justify-center items-center">
              <img
                src={recipie.recipesimg.path ? `http://localhost/masa/storage/uploads${recipie.recipesimg.path}` : 'fallback-image-url'}
                className="lg:w-40 w-32 object-cover h-auto"
                alt={recipie.name}
              />
            </div>
            <div className='flex flex-col h-full justify-between truncate '>
            <h3 className="text-center text-white text-lg font-bold mb-4">{recipie.name}</h3>
            <p className=" text-center text-white font-extralight mb-4">{recipie.recipes}</p>
            </div>
            
    <div className="flex justify-between  text-white shadow-none ">
      <span className="flex gap-2 p-2 font-bold text-gray-900">
        {recipie.preparomgtime} min
        <ClockCountdown size={24} color="#5ab4c4" weight="fill" />
      </span>
      <span className="text-gray-800 p-2 flex font-bold gap-2">
        {recipie.people}
      <UsersThree   size={24} color="#5ab4c4" weight="fill"/>
      </span>
    </div>
           <div className="flex flex-col  justify-between mt-4 transition-shadow duration-500 h-full">
  {/* Other content of the card */}

  <div className="flex justify-cener flex-grow mt-4 items-center  w-full shadow-none">
    {/* Button */}
    <a
      href="#"
      onClick={() => handleGetRecipe(recipie)}
      className="flex items-center justify-center gap-2 before:ease relative h-10 rounded-xl w-full p-4
      overflow-hidden bg-secondary text-white shadow-none transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate- before:bg-white before:opacity-10 before:duration-700 hover:before:-translate-x-52"
    >
      Get Recipe
    </a>

  </div>
</div>

          </div>
        ))}
      </div>
      )
}

export default Rcard