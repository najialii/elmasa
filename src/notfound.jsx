import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NotFound = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100"
    >
      <motion.h1
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-9xl font-extrabold text-blue-600 drop-shadow-lg"
      >
        404
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="text-xl text-gray-700 mt-4"
      >
        Oops! The page you're looking for doesn't exist.
      </motion.p>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="mt-6"
      >
        <Link
          to="/"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg text-lg font-medium shadow-md hover:bg-blue-700 transition-all"
        >
          Back to Home
        </Link>
      </motion.div>
      <motion.img
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.8, ease: "easeOut" }}
        src="https://via.placeholder.com/500x300.png?text=Lost+in+Space" // Replace with an actual 404 image
        alt="404 Illustration"
        className="mt-10 max-w-md rounded-lg shadow-lg"
      />
    </motion.div>
  );
};

export default NotFound;
