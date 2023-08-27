import React, { useState, useEffect } from "react";
import { BsFillHeartFill } from "react-icons/bs";

const Test = () => {
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const targetPercentage = 56;
    let currentPercentage = 0;

    const interval = setInterval(() => {
      if (currentPercentage < targetPercentage) {
        currentPercentage++;
        setPercentage(currentPercentage);
      } else {
        clearInterval(interval);
      }
    }, 20); // Adjust the interval speed for smoother animation

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="relative">
      {/* Heart */}
      <span>
        <BsFillHeartFill size={100} color="#dd0d0d" />
      </span>

      {/* Percentage */}
      <span className="absolute text-xl text-white pb-6 font-bold flex top-0 left-0 w-full h-full justify-center items-center">
        {percentage}%
      </span>
    </div>
  );
};

export default Test;
