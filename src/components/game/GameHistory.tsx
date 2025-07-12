
import React from 'react';
import { useGame } from '../../context/GameContext';

const GameHistory: React.FC = () => {
  const { gameHistory } = useGame();
  
  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <h3 className="text-xl font-bold text-white mb-4">Recent Games</h3>
      
      <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
        {gameHistory.map((game) => (
          <div 
            key={game.id} 
            className={`flex items-center justify-center p-2 rounded-lg ${
              game.crashPoint < 2 ? 'bg-red-500' : 
              game.crashPoint < 10 ? 'bg-yellow-500' : 'bg-green-500'
            }`}
          >
            <span className="font-bold text-sm">
              {game.crashPoint.toFixed(2)}x
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameHistory;