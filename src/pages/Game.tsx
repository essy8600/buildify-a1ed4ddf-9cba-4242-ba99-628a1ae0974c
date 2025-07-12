
import React from 'react';
import { GameProvider } from '../context/GameContext';
import GameNavbar from '../components/game/GameNavbar';
import AviatorGame from '../components/game/AviatorGame';
import BettingPanel from '../components/game/BettingPanel';
import GameHistory from '../components/game/GameHistory';
import Wallet from '../components/game/Wallet';

const Game: React.FC = () => {
  return (
    <GameProvider>
      <div className="min-h-screen bg-gray-900 text-white">
        <GameNavbar />
        
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <AviatorGame />
              <BettingPanel />
            </div>
            
            <div className="space-y-6">
              <GameHistory />
              <Wallet />
            </div>
          </div>
        </div>
      </div>
    </GameProvider>
  );
};

export default Game;