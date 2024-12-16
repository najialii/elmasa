import React, { useState } from "react";
import { Heart } from "@phosphor-icons/react";

const LikeButton = () => {
  const [liked, setLiked] = useState(false);
  const [showPing, setShowPing] = useState(false);

  const handleLike = () => {
    setLiked((prevLiked) => !prevLiked);
    setShowPing(true);

    
    setTimeout(() => setShowPing(false), 900); 
  };

  return (
    <button
      onClick={handleLike}
      className="relative group focus:outline-none transition-transform transform hover:scale-110"
    >
      
      {showPing && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="animate-ping bg-red-500 rounded-full h-10 w-10 opacity-75"></span>
        </div>
      )}
      
      <Heart
        size={24}
        color={liked ? "red" : "gray"}
        weight={liked ? "fill" : "regular"}
        className="transition-all duration-300"
      />
    </button>
  );
};

export default LikeButton;
