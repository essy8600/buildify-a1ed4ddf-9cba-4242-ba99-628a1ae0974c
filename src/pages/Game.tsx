
import React from 'react';
import { GameProvider } from '../context/GameContext';
import GameNavbar from '../components/game/GameNavbar';
import AviatorGame from '../components/game/AviatorGame';
import BettingPanel from '../components/game/BettingPanel';
import GameHistory from '../components/game/GameHistory';
import Wallet from '../components/game/Wallet';
import DomainReceipt from '../components/game/DomainReceipt';
import AuthForms from '../components/auth/AuthForms';
import { useGame } from '../context/GameContext';
import { Card, CardContent } from '../components/ui/card';

// This component will be rendered when user is not logged in
const GameLanding: React.FC = () => {
  return (
    <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="md:col-span-2">
        <AviatorGame />
      </div>
      
      <div className="space-y-6">
        <AuthForms />
        <DomainReceipt />
      </div>
      
      <div className="space-y-6">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4">About Aviator Game</h2>
            <p className="mb-4">
              Aviator is an exciting multiplier game where you bet and decide when to cash out before the plane flies away!
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Place your bet before the round starts</li>
              <li>Watch as the multiplier increases</li>
              <li>Cash out before the plane flies away to win</li>
              <li>Wait too long and you lose your bet</li>
            </ul>
          </CardContent>
        </Card>
        <GameHistory />
      </div>
    </div>
  );
};

// This component will be rendered when user is logged in
const GameDashboard: React.FC = () => {
  return (
    <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        <AviatorGame />
      </div>
      
      <div className="space-y-6">
        <Wallet />
        <DomainReceipt />
      </div>
      
      <div className="md:col-span-2 space-y-6">
        <BettingPanel />
        <GameHistory />
      </div>
    </div>
  );
};

// Wrapper component that decides which view to show based on login status
const GameContent: React.FC = () => {
  const { isLoggedIn } = useGame();
  
  return isLoggedIn ? <GameDashboard /> : <GameLanding />;
};

// Main Game page component with provider
const Game: React.FC = () => {
  return (
    <GameProvider>
      <div className="min-h-screen bg-slate-100 dark:bg-slate-950">
        <GameNavbar />
        <main className="py-6">
          <GameContent />
        </main>
        <footer className="bg-slate-900 text-white p-4 text-center">
          <p>&copy; {new Date().getFullYear()} Aviator Game. All rights reserved.</p>
        </footer>
      </div>
    </GameProvider>
  );
};

export default Game;