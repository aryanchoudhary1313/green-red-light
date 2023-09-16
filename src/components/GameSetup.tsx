"use client";

import React, { useState } from "react";
import RegistrationForm from "./userLogin/RegistrationForm";
import GreenLightRedLight from "./game/GreenLightRedLight";

const App: React.FC = () => {
  const [user, setUser] = useState<{
    name: string;
    email: string;
    mobile: string;
    difficulty: string;
  } | null>(null);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [gameWin, setGameWin] = useState<boolean>(false);
  const [gameState, setGameState] = useState("start");

  // Function to start the game with user data
  const handleStartGame = (userData: {
    name: string;
    email: string;
    mobile: string;
    difficulty: string;
  }) => {
    setUser(userData);
    setGameStarted(true);
  };

  // Function to handle game over
  const handleGameOver = () => {
    setGameStarted(false);
    setGameOver(true);
  };

  // Function to handle game win
  const handleWin = () => {
    setGameStarted(false);
    setGameWin(true);
  };

  // Function to restart the game
  const handleRestartGame = () => {
    setGameOver(false);
    setGameWin(false);
    setGameState("start");
  };
  return (
    <div className="flex justify-center mt-16">
      {!user ? (
        <RegistrationForm onStartGame={handleStartGame} />
      ) : (
        <div>
          {gameOver ? (
            <div className="flex flex-col gap-6  bg-slate-50 p-10 rounded items-center">
              <div className="text-4xl font-bold ">Game Over!💀</div>
              <button
                className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 hover:text-gray-100 transition-colors duration-300"
                onClick={handleRestartGame}
              >
                Restart
              </button>
            </div>
          ) : gameWin ? (
            <div className="flex flex-col gap-6  bg-slate-50 p-10 rounded items-center">
              <div className="text-4xl font-bold ">You Win and Survived!✌️</div>
              <button
                className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 hover:text-gray-100 transition-colors duration-300"
                onClick={handleRestartGame}
              >
                Restart
              </button>
            </div>
          ) : (
            <GreenLightRedLight
              user={user}
              onGameOver={handleGameOver}
              onWin={handleWin}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default App;
