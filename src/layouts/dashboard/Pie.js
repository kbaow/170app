import React, { useState, useEffect } from "react";
import PropTypes from "prop-types"; // Import PropTypes

const cleanPercentage = (percentage) => {
  const isNegativeOrNaN = !Number.isFinite(+percentage) || percentage < 0; // we can set non-numbers to 0 here
  const isTooHigh = percentage > 100;
  return isNegativeOrNaN ? 0 : isTooHigh ? 100 : +percentage;
};

// Circle Component
const Circle = ({ colour, percentage }) => {
  const r = 70;
  const circ = 2 * Math.PI * r;
  const strokePct = ((100 - percentage) * circ) / 100; // where stroke will start, e.g. from 15% to 100%.

  return (
    <circle
      r={r}
      cx={100}
      cy={100}
      fill="transparent"
      stroke={strokePct !== circ ? colour : ""} // remove colour as 0% sets full circumference
      strokeWidth={"2rem"}
      strokeDasharray={circ}
      strokeDashoffset={percentage ? strokePct : 0}
      strokeLinecap="round" // Round the edges of the stroke
      style={{ transition: "stroke-dashoffset 1s ease-out" }} // Animation for smooth rendering
    ></circle>
  );
};

// PropTypes validation for Circle component
Circle.propTypes = {
  colour: PropTypes.string.isRequired, // colour should be a string
  percentage: PropTypes.number.isRequired, // percentage should be a number
};

// Text Component
const Text = ({ percentage }) => {
  return (
    <text
      x="50%"
      y="50%"
      dominantBaseline="central"
      textAnchor="middle"
      fontSize={"1.5em"}
    >
      {percentage.toFixed(0)}
    </text>
  );
};

// PropTypes validation for Text component
Text.propTypes = {
  percentage: PropTypes.number.isRequired, // percentage should be a number
};

// Pie Component
const Pie = ({ percentage, colour }) => {
  const [currentPercentage, setCurrentPercentage] = useState(0);
  const pct = cleanPercentage(percentage);

  useEffect(() => {
    let progress = 0;
    const interval = setInterval(() => {
      if (progress < pct) {
        progress += 1; // Increment the progress by 1 each frame
        setCurrentPercentage(progress); // Update the state to trigger re-render
      } else {
        clearInterval(interval); // Stop once we reach the target percentage
      }
    }, 10); // You can adjust the interval speed for slower or faster animation
    return () => clearInterval(interval); // Clean up on component unmount
  }, [pct]);

  return (
    <svg width={200} height={200}>
      <g transform={`rotate(-90 ${"100 100"})`}>
        <Circle colour="lightgrey" percentage={currentPercentage * (5 / 3)} />
        <Circle colour={colour} percentage={currentPercentage * (5 / 3)} />
      </g>
      <Text percentage={currentPercentage} />
    </svg>
  );
};

// PropTypes validation for Pie component
Pie.propTypes = {
  percentage: PropTypes.number.isRequired, // percentage should be a number
  colour: PropTypes.string.isRequired, // colour should be a string
};

export default Pie;
