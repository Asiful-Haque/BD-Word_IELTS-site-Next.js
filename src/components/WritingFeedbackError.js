'use client';

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ErrorPopup = ({ message, onClose }) => {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    }
  }, []);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 backdrop-blur-md bg-black/50 flex items-center justify-center z-50">
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.7, opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="py-20 bg-gradient-to-br from-red-500 to-red-700 p-8 rounded-2xl shadow-2xl w-[90%] max-w-lg text-center space-y-6 border border-white/20 backdrop-blur-xl"
        >
          <h2 className="text-5xl font-extrabold text-white drop-shadow-md">
            ⚠️ Error Occurred!
          </h2>
          <p className="text-2xl text-white font-bold">
            {message}
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="mt-4 bg-white text-red-700 font-semibold px-6 py-2 rounded-full shadow-lg hover:bg-red-100 transition-all"
          >
            Close
          </motion.button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ErrorPopup;
