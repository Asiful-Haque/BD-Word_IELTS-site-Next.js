// import React, { useState, useEffect } from "react";

// const Timer = ({ minutes }) => {
//     const [timeLeft, setTimeLeft] = useState(minutes * 60); // Convert minutes to seconds

//     useEffect(() => {
//         if (timeLeft <= 0) return;

//         const interval = setInterval(() => {
//             setTimeLeft((prevTime) => prevTime - 1);
//         }, 1000);

//         return () => clearInterval(interval);
//     }, [timeLeft]);

//     const formatTime = (seconds) => {
//         const mins = Math.floor(seconds / 60);
//         const secs = seconds % 60;
//         return `${mins}:${secs.toString().padStart(2, "0")}`;
//     };

//     return <div className="p-5 m-auto text-xl font-bold">Time Left: {formatTime(timeLeft)}</div>;
// };

// export default Timer;



import React from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const Timer = ({ minutes }) => {
  const duration = minutes * 60; // Convert minutes to seconds

  return (
    <div className="py-2 flex justify-center items-center">
      <CountdownCircleTimer
        isPlaying
        duration={duration}
        colors={["#4CAF50", "#F7B801", "#A30000"]}
        colorsTime={[duration, duration / 2, 0]}
        size={80}
        strokeWidth={10}
      >
        {({ remainingTime }) => {
          const minutes = Math.floor(remainingTime / 60);
          const seconds = remainingTime % 60;
          return (
              <div className="text-xl font-bold">
                  {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
              </div>
          );
        }}
      </CountdownCircleTimer>
    </div>
  );
};

export default Timer;
