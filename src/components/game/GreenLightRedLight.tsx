import React, { useState, useEffect } from "react";

interface GreenLightRedLightProps {
  user: {
    name: string;
    email: string;
    mobile: string;
    difficulty: string;
  };
  onGameOver: () => void;
  onWin: () => void;
}

const GreenLightRedLight: React.FC<GreenLightRedLightProps> = ({
  user,
  onGameOver,
  onWin,
}) => {
  const [color, setColor] = useState<"red" | "green">("red");
  const [score, setScore] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(40); // Game duration is 40 seconds for all difficulties
  const [hasClickedGreen, setHasClickedGreen] = useState<boolean>(false); // Track whether the user has clicked green in the current round

  const scoreToWin =
    user.difficulty === "Hard" ? 25 : user.difficulty === "Medium" ? 15 : 10; // Adjust score needed to win based on difficulty

  useEffect(() => {
    const changeColorInterval = setInterval(() => {
      const newColor = color === "red" ? "green" : "red";
      setColor(newColor);
      setHasClickedGreen(false); // Reset the color when the color changes
    }, Math.floor(Math.random() * 1000) + 1000);

    return () => clearInterval(changeColorInterval);
  }, [color]);

  useEffect(() => {
    if (timeLeft <= 0 || score === scoreToWin) {
      if (score === scoreToWin) {
        onWin();
      } else {
        onGameOver();
      }
    } else {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, score, scoreToWin, onGameOver, onWin]);

  const handleClick = () => {
    if (color === "green" && !hasClickedGreen) {
      setScore(score + 1);
      setHasClickedGreen(true); // Set the color to prevent multiple clicks in the same round
    } else if (color === "red") {
      onGameOver();
    }
  };

  return (
    <div className="flex flex-col gap-1 items-center mt-16">
      <div className="text-lg font-semibold mt-4">
        {/* Display user name */}
        Welcome, {user.name}! Stay focused otherwise you better know if you
        watched Squid Game😶‍🌫️
      </div>
      <div
        className={`${
          color === "red"
            ? "bg-red-500 w-[10em] h-[10em] rounded-full"
            : "bg-green-500 w-[10em] h-[10em] rounded-full"
        }`}
        onClick={handleClick}
      ></div>
      <div className="text-2xl font-bold mt-4">Score: {score}</div>
      <div className="text-2xl font-bold">Time Left: {timeLeft} seconds</div>

      {/* Display score to win and difficulty mode */}
      <div className="text-lg font-semibold mt-4">
        Score to Win: {scoreToWin}
      </div>
      <div className="text-lg font-semibold">Difficulty: {user.difficulty}</div>
    </div>
  );
};

export default GreenLightRedLight;
