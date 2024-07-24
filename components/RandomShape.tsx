import React from "react";

interface RandomShapeProps {
  fill: string;
  className: string;
}

const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generateRandomPoints = (
  numPoints: number,
  width: number,
  height: number
): string => {
  let points = "";
  for (let i = 0; i < numPoints; i++) {
    const x = getRandomInt(0, width);
    const y = getRandomInt(0, height);
    points += `${x},${y} `;
  }
  return points.trim();
};

const RandomShape: React.FC<RandomShapeProps> = ({ fill, className }) => {
  const width = 400;
  const height = 400;
  const numPoints = getRandomInt(20, 30);
  const points = generateRandomPoints(numPoints, width, height);

  return (
    <svg width={width} height={height} className={className}>
      <polygon points={points} fill={fill} />
    </svg>
  );
};

export default RandomShape;
