
import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';

const BettingPanel: React.FC = () => {
  const { gameState, placeBet, user } = useGame();
  
  // Bet 1 state
  const [bet1Amount, setBet1Amount] = useState<string>('100');
  const [bet1AutoCashout, setBet1AutoCashout] = useState<string>('2.00');
  const [bet1AutoCashoutEnabled, setBet1AutoCashoutEnabled] = useState<boolean>(false);
  
  // Bet 2 state
  const [bet2Amount, setBet2Amount] = useState<string>('200');
  const [bet2AutoCashout, setBet2AutoCashout] = useState<string>('3.00');
  const [bet2AutoCashoutEnabled, setBet2AutoCashoutEnabled] = useState<boolean>(false);
  
  // Handle bet 1 submission
  const handleBet1Submit = () => {
    if (!user || gameState !== 'waiting') return;
    
    const amount = parseFloat(bet1Amount);
    if (isNaN(amount) || amount <= 0 || amount > user.balance) return;
    
    const autoCashoutAt = bet1AutoCashoutEnabled ? parseFloat(bet1AutoCashout) : null;
    
    placeBet(amount, autoCashoutAt, 1);
  };
  
  // Handle bet 2 submission
  const handleBet2Submit = () => {
    if (!user || gameState !== 'waiting') return;
    
    const amount = parseFloat(bet2Amount);
    if (isNaN(amount) || amount <= 0 || amount > user.balance) return;
    
    const autoCashoutAt = bet2AutoCashoutEnabled ? parseFloat(bet2AutoCashout) : null;
    
    placeBet(amount, autoCashoutAt, 2);
  };
  
  // Calculate potential winnings
  const calculatePotentialWinnings = (betAmount: string, autoCashout: string): string => {
    const amount = parseFloat(betAmount);
    const multiplier = parseFloat(autoCashout);
    
    if (isNaN(amount) || isNaN(multiplier)) return '0.00';
    
    return (amount * multiplier).toFixed(2);
  };
  
  return (
    <div className="bg-gray-800 rounded-lg p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Bet 1 */}
      <div className="bg-gray-700 rounded-lg p-4">
        <h3 className="text-xl font-bold text-white mb-4">Bet 1</h3>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="bet1Amount" className="text-white">Bet Amount (KES)</Label>
            <Input
              id="bet1Amount"
              type="number"
              value={bet1Amount}
              onChange={(e) => setBet1Amount(e.target.value)}
              className="bg-gray-600 text-white border-gray-500"
              disabled={gameState !== 'waiting'}
              min="10"
              step="10"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch
              id="bet1AutoCashoutEnabled"
              checked={bet1AutoCashoutEnabled}
              onCheckedChange={setBet1AutoCashoutEnabled}
              disabled={gameState !== 'waiting'}
            />
            <Label htmlFor="bet1AutoCashoutEnabled" className="text-white">Auto Cash Out</Label>
          </div>
          
          {bet1AutoCashoutEnabled && (
            <div>
              <Label htmlFor="bet1AutoCashout" className="text-white">Auto Cash Out At (x)</Label>
              <Input
                id="bet1AutoCashout"
                type="number"
                value={bet1AutoCashout}
                onChange={(e) => setBet1AutoCashout(e.target.value)}
                className="bg-gray-600 text-white border-gray-500"
                disabled={gameState !== 'waiting'}
                min="1.01"
                step="0.01"
              />
            </div>
          )}
          
          <div className="bg-gray-600 p-3 rounded-lg">
            <p className="text-gray-300">Potential Win:</p>
            <p className="text-2xl font-bold text-green-400">
              KES {bet1AutoCashoutEnabled 
                ? calculatePotentialWinnings(bet1Amount, bet1AutoCashout) 
                : '0.00'}
            </p>
          </div>
          
          <Button
            onClick={handleBet1Submit}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold"
            disabled={gameState !== 'waiting' || !user}
          >
            Place Bet
          </Button>
        </div>
      </div>
      
      {/* Bet 2 */}
      <div className="bg-gray-700 rounded-lg p-4">
        <h3 className="text-xl font-bold text-white mb-4">Bet 2</h3>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="bet2Amount" className="text-white">Bet Amount (KES)</Label>
            <Input
              id="bet2Amount"
              type="number"
              value={bet2Amount}
              onChange={(e) => setBet2Amount(e.target.value)}
              className="bg-gray-600 text-white border-gray-500"
              disabled={gameState !== 'waiting'}
              min="10"
              step="10"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch
              id="bet2AutoCashoutEnabled"
              checked={bet2AutoCashoutEnabled}
              onCheckedChange={setBet2AutoCashoutEnabled}
              disabled={gameState !== 'waiting'}
            />
            <Label htmlFor="bet2AutoCashoutEnabled" className="text-white">Auto Cash Out</Label>
          </div>
          
          {bet2AutoCashoutEnabled && (
            <div>
              <Label htmlFor="bet2AutoCashout" className="text-white">Auto Cash Out At (x)</Label>
              <Input
                id="bet2AutoCashout"
                type="number"
                value={bet2AutoCashout}
                onChange={(e) => setBet2AutoCashout(e.target.value)}
                className="bg-gray-600 text-white border-gray-500"
                disabled={gameState !== 'waiting'}
                min="1.01"
                step="0.01"
              />
            </div>
          )}
          
          <div className="bg-gray-600 p-3 rounded-lg">
            <p className="text-gray-300">Potential Win:</p>
            <p className="text-2xl font-bold text-green-400">
              KES {bet2AutoCashoutEnabled 
                ? calculatePotentialWinnings(bet2Amount, bet2AutoCashout) 
                : '0.00'}
            </p>
          </div>
          
          <Button
            onClick={handleBet2Submit}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold"
            disabled={gameState !== 'waiting' || !user}
          >
            Place Bet
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BettingPanel;