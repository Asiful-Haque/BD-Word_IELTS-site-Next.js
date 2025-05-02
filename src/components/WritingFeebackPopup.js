"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";

const WritingFeedbackPopup = ({ score, feedback, onClose }) => {
  const [isConfettiVisible, setConfettiVisible] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  function formatKey(key) {
    return key
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (l) => l.toUpperCase());
  }
  
  useEffect(() => {
    setConfettiVisible(true);
    if (typeof window !== "undefined") {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    }
    const timer = setTimeout(() => {
      setConfettiVisible(false);
    }, 20000);
    return () => clearTimeout(timer);
  }, []);
  

  return (
    <AnimatePresence>
      <div className="fixed inset-0 backdrop-blur-md bg-black/30 flex items-center justify-center z-50">
        {isConfettiVisible && (
          <Confetti width={windowSize.width} height={windowSize.height} />
        )}
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.7, opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="py-20 bg-gradient-to-br from-[#1f4037] to-[#99f2c8] p-8 rounded-2xl shadow-2xl w-[90%] max-w-lg text-center space-y-6 border border-white/20 backdrop-blur-xl"
        >
          <h2 className="text-5xl font-extrabold text-white drop-shadow-md">
            📝 Your Writing Score!
          </h2>
          <p className="text-2xl text-white font-bold">
            Score: <span className="text-yellow-300">{score}/9</span>
          </p>
          <div className="bg-white/90 rounded-lg p-4 shadow-md max-h-60 overflow-y-auto text-left">
            <h3 className="text-lg font-semibold mb-2 text-green-800">
              Feedback (Raw):
            </h3>
            <div className="text-gray-700 space-y-2">
  {feedback &&
    Object.entries(feedback).map(([key, value]) => (
      <p key={key}>
        <strong>{formatKey(key)}:</strong> {value}
      </p>
    ))}
</div>
            {/* <p className="text-gray-700 whitespace-pre-line">
              {feedback}
            </p> */}
          </div>
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

export default WritingFeedbackPopup;