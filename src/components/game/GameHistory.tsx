
import React from 'react';
import { useGame } from '../../context/GameContext';

const GameHistory: React.FC = () => {
  const { gameHistory } = useGame();
  
  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <h3 className="text-xl font-bold text-white mb-4">Recent Games</h3>
      
      <div className="flex flex-wrap gap-2">
        {gameHistory.map((game) => {
          // Determine color based on crash point
          let bgColor = 'bg-gray-600';
          
          if (game.crashPoint < 1.5) {
            bgColor = 'bg-red-600';
          } else if (game.crashPoint < 3) {
            bgColor = 'bg-yellow-600';
          } else if (game.crashPoint < 10) {
            bgColor = 'bg-green-600';
          } else {
            bgColor = 'bg-blue-600';
          }
          
          return (
            <div 
              key={game.id} 
              className={`${bgColor} rounded-full w-16 h-16 flex items-center justify-center`}
            >
              <span className="text-white font-bold">
                {game.crashPoint.toFixed(2)}x
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GameHistory;