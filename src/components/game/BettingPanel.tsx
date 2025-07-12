
import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

const BettingPanel: React.FC = () => {
  const { user, bets, placeBet, cashout, gameStatus, currentMultiplier } = useGame();
  
  const [betAmounts, setBetAmounts] = useState<[string, string]>(['10', '']);
  const [autoCashout, setAutoCashout] = useState<[boolean, boolean]>([false, false]);
  const [autoCashoutValues, setAutoCashoutValues] = useState<[string, string]>(['2', '2']);
  const [activeTab, setActiveTab] = useState<string>('bet1');
  
  const handleBetAmountChange = (index: 0 | 1, value: string) => {
    const newBetAmounts = [...betAmounts] as [string, string];
    newBetAmounts[index] = value;
    setBetAmounts(newBetAmounts);
  };
  
  const handleAutoCashoutChange = (index: 0 | 1, checked: boolean) => {
    const newAutoCashout = [...autoCashout] as [boolean, boolean];
    newAutoCashout[index] = checked;
    setAutoCashout(newAutoCashout);
  };
  
  const handleAutoCashoutValueChange = (index: 0 | 1, value: string) => {
    const newAutoCashoutValues = [...autoCashoutValues] as [string, string];
    newAutoCashoutValues[index] = value;
    setAutoCashoutValues(newAutoCashoutValues);
  };
  
  const handlePlaceBet = (index: 0 | 1) => {
    const amount = parseFloat(betAmounts[index]);
    if (isNaN(amount) || amount <= 0 || !user) return;
    
    const autoCashoutValue = autoCashout[index] 
      ? parseFloat(autoCashoutValues[index]) 
      : undefined;
      
    placeBet(index, amount, autoCashoutValue);
  };
  
  const handleCashout = (index: 0 | 1) => {
    cashout(index);
  };
  
  const calculatePotentialWin = (index: 0 | 1) => {
    const amount = parseFloat(betAmounts[index]);
    if (isNaN(amount)) return 0;
    
    return amount * currentMultiplier;
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Place Your Bets</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="bet1">Bet 1</TabsTrigger>
            <TabsTrigger value="bet2">Bet 2</TabsTrigger>
          </TabsList>
          
          <TabsContent value="bet1" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="bet-amount-1">Bet Amount</Label>
              <Input
                id="bet-amount-1"
                type="number"
                min="1"
                value={betAmounts[0]}
                onChange={(e) => handleBetAmountChange(0, e.target.value)}
                disabled={gameStatus !== 'waiting' || !!bets[0]}
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="auto-cashout-1"
                checked={autoCashout[0]}
                onCheckedChange={(checked) => handleAutoCashoutChange(0, checked)}
                disabled={gameStatus !== 'waiting' || !!bets[0]}
              />
              <Label htmlFor="auto-cashout-1">Auto Cash Out</Label>
            </div>
            
            {autoCashout[0] && (
              <div className="space-y-2">
                <Label htmlFor="auto-cashout-value-1">At Multiplier</Label>
                <Input
                  id="auto-cashout-value-1"
                  type="number"
                  min="1.1"
                  step="0.1"
                  value={autoCashoutValues[0]}
                  onChange={(e) => handleAutoCashoutValueChange(0, e.target.value)}
                  disabled={gameStatus !== 'waiting' || !!bets[0]}
                />
              </div>
            )}
            
            <div className="pt-2">
              {!bets[0] ? (
                <Button 
                  className="w-full" 
                  onClick={() => handlePlaceBet(0)}
                  disabled={gameStatus !== 'waiting' || !user}
                >
                  Place Bet
                </Button>
              ) : (
                bets[0].isCashedOut ? (
                  <div className="text-center p-2 bg-green-100 dark:bg-green-900 rounded-md">
                    <p>Cashed out at {bets[0].cashoutMultiplier?.toFixed(2)}x</p>
                    <p className="font-bold">Won: {bets[0].winAmount?.toFixed(2)}</p>
                  </div>
                ) : (
                  <Button 
                    className="w-full bg-green-600 hover:bg-green-700" 
                    onClick={() => handleCashout(0)}
                    disabled={gameStatus !== 'in-progress' || !bets[0]?.isActive}
                  >
                    Cash Out ({calculatePotentialWin(0).toFixed(2)})
                  </Button>
                )
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="bet2" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="bet-amount-2">Bet Amount</Label>
              <Input
                id="bet-amount-2"
                type="number"
                min="1"
                value={betAmounts[1]}
                onChange={(e) => handleBetAmountChange(1, e.target.value)}
                disabled={gameStatus !== 'waiting' || !!bets[1]}
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="auto-cashout-2"
                checked={autoCashout[1]}
                onCheckedChange={(checked) => handleAutoCashoutChange(1, checked)}
                disabled={gameStatus !== 'waiting' || !!bets[1]}
              />
              <Label htmlFor="auto-cashout-2">Auto Cash Out</Label>
            </div>
            
            {autoCashout[1] && (
              <div className="space-y-2">
                <Label htmlFor="auto-cashout-value-2">At Multiplier</Label>
                <Input
                  id="auto-cashout-value-2"
                  type="number"
                  min="1.1"
                  step="0.1"
                  value={autoCashoutValues[1]}
                  onChange={(e) => handleAutoCashoutValueChange(1, e.target.value)}
                  disabled={gameStatus !== 'waiting' || !!bets[1]}
                />
              </div>
            )}
            
            <div className="pt-2">
              {!bets[1] ? (
                <Button 
                  className="w-full" 
                  onClick={() => handlePlaceBet(1)}
                  disabled={gameStatus !== 'waiting' || !user}
                >
                  Place Bet
                </Button>
              ) : (
                bets[1].isCashedOut ? (
                  <div className="text-center p-2 bg-green-100 dark:bg-green-900 rounded-md">
                    <p>Cashed out at {bets[1].cashoutMultiplier?.toFixed(2)}x</p>
                    <p className="font-bold">Won: {bets[1].winAmount?.toFixed(2)}</p>
                  </div>
                ) : (
                  <Button 
                    className="w-full bg-green-600 hover:bg-green-700" 
                    onClick={() => handleCashout(1)}
                    disabled={gameStatus !== 'in-progress' || !bets[1]?.isActive}
                  >
                    Cash Out ({calculatePotentialWin(1).toFixed(2)})
                  </Button>
                )
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default BettingPanel;