"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti"; // Import Confetti directly

const ResultPopup = ({ correctAnswers, total, onClose }) => {
  const [isConfettiVisible, setConfettiVisible] = useState(false);

  // Trigger confetti after a slight delay to match the popup's animation
  useEffect(() => {
    setConfettiVisible(true); // Display confetti immediately
    
    // Stop confetti after 10 seconds
    const timer = setTimeout(() => {
      setConfettiVisible(false);
    }, 20000); // 10 seconds

    // Cleanup the timer when the component unmounts or confetti is hidden
    return () => {
      clearTimeout(timer); // Clear the timeout if the component is unmounted or if confetti is hidden
    };
  }, []);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 backdrop-blur-md bg-black/30 flex items-center justify-center z-50">
        {/* Trigger Confetti */}
        {isConfettiVisible && (
          <Confetti width={window.innerWidth} height={window.innerHeight} />
        )}

        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.7, opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }} // Faster animation
          className="py-20 bg-gradient-to-br from-[#1f4037] to-[#99f2c8] p-8 rounded-2xl shadow-2xl w-[90%] max-w-lg text-center space-y-4 border border-white/20 backdrop-blur-xl"
        >
          <h2 className="text-5xl font-extrabold text-white drop-shadow-md">
            🎉 Your Result!
          </h2>
          <p className="text-xl text-white">
            You got{" "}
            <span className="font-bold text-yellow-300">{correctAnswers}</span>{" "}
            out of{" "}
            <span className="font-bold text-yellow-300">{total}</span> correct.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="mt-4 bg-white text-green-700 font-semibold px-6 py-2 rounded-full shadow-lg hover:bg-green-100 transition-all"
          >
            Close
          </motion.button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ResultPopup;
