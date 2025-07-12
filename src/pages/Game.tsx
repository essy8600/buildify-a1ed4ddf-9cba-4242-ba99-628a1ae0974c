
import React from 'react';
import { GameProvider } from '../context/GameContext';
import AviatorGame from '../components/game/AviatorGame';
import BettingPanel from '../components/game/BettingPanel';
import GameHistory from '../components/game/GameHistory';
import Wallet from '../components/game/Wallet';
import GameNavbar from '../components/game/GameNavbar';

const Game: React.FC = () => {
  return (
    <GameProvider>
      <div className="min-h-screen bg-gray-900 text-white">
        <GameNavbar />
        
        <div className="container mx-auto px-4 py-6 space-y-6">
          <AviatorGame />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <BettingPanel />
              <GameHistory />
            </div>
            
            <div>
              <Wallet />
            </div>
          </div>
        </div>
        
        <footer className="bg-gray-800 py-4 px-6 text-center text-gray-400 text-sm mt-12">
          <p>© 2025 Aviator Bet. All rights reserved.</p>
          <p className="mt-1">This is a demo application. No real money is involved.</p>
        </footer>
      </div>
    </GameProvider>
  );
};

export default Game;