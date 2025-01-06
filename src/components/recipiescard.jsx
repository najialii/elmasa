import { motion } from 'framer-motion';
import LikeButton from '../components/like';
import {MagnifyingGlass, PaperPlaneRight, CheckCircle, UsersThree, ClockCountdown } from "@phosphor-icons/react";
import { useParams , useLocation} from 'react-router-dom';
import milk from '../assets/imgs/miokmilk.png';

const Rcard = ({data, handleGetRecipe, recipesToShow, pending}) => {

  console.log("the data ",data)
  console.log("data.data:", data.recipes);
    return (
        <div className="grid py-[50px] overflow-x-hidden grid-cols-2 justify-center sm:grid-cols-2 lg:grid-cols-5 sm:gap-1 font-cairo lg:gap-2">
        {data && data.recipes && data.recipes.data.map((data) => {
          const imageUrl = (() => {
            try {
              // Check if the image path is a JSON string
              const parsedImg = JSON.parse(data.img);
              const imgUrl = Array.isArray(parsedImg) ? parsedImg[0] : parsedImg;
              return imgUrl.startsWith("http") ? imgUrl : `http://localhost:8000/storage/${imgUrl}`;
            } catch (error) {
              // console.error("Invalid JSON format for images:", data.img);
              return data.img.startsWith("http") ? data.img : `http://localhost:8000/storage/${data.img}`;
            }
          })();
          return (
            <motion.div 
              key={data.id} 
              className="bg-white hover:shadow-2xl p-4 lg:h-72 h-80  cursor-pointer lg:rounded-xl border border-gray-200 transition-shadow duration-500 flex flex-col lg:w-56 relative overflow-hidden"
              whileHover={{ scale: 1.05 }}
            >
              <div className="rounded-full aspect-square mx-auto flex justify-center">
              <img
                src={imageUrl}
                alt={data.name}
                className="w-full object-cover h-full lg:h-fit rounded-md mb-4"
              />
            

                {/* <img src={milk} alt="" srcset="" /> */}
              </div>
              
              <div className="flex flex-col justify-start h-1/2 absolute bottom-4 left-0 w-full p-4 bg-white bg-opacity-80 transition-all duration-300 ">
                <h3 className="text-center text-primary text-lg font-bold mb-4">{data.name}</h3>
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
      
                <div className="flex  justify-center mb-2 ">
                  <a
                    href="#"
                    onClick={() => handleGetRecipe(data)}
                    className="flex justify-center items-center gap-2 relative h-10 rounded-md w-40 overflow-hidden bg-primary font-bold text-sm text-white"
                  >
                    Get Recipe
                  </a>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
      
    );
};

export default Rcard;
