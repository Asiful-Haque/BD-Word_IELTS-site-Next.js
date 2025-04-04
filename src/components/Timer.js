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
