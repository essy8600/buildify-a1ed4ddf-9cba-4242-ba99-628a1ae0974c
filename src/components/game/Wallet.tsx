
import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';

const Wallet: React.FC = () => {
  const { user, claimBonus } = useGame();
  
  const [depositAmount, setDepositAmount] = useState<string>('1000');
  const [depositProvider, setDepositProvider] = useState<string>('mpesa');
  const [depositPhone, setDepositPhone] = useState<string>('');
  
  const [withdrawAmount, setWithdrawAmount] = useState<string>('1000');
  const [withdrawProvider, setWithdrawProvider] = useState<string>('pesapal');
  
  // Handle deposit
  const handleDeposit = () => {
    // Simulate deposit process
    alert(`USSD push sent to ${depositPhone} for KES ${depositAmount} via ${depositProvider.toUpperCase()}`);
  };
  
  // Handle withdrawal
  const handleWithdrawal = () => {
    // Simulate withdrawal process
    alert(`Withdrawal request of KES ${withdrawAmount} via ${withdrawProvider} has been initiated`);
  };
  
  if (!user) {
    return (
      <div className="bg-gray-800 rounded-lg p-6 text-center">
        <p className="text-white text-lg">Please log in to access your wallet</p>
      </div>
    );
  }
  
  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-700 p-4 rounded-lg">
          <p className="text-gray-400 text-sm">Available Balance</p>
          <p className="text-2xl font-bold text-white">KES {user.balance.toFixed(2)}</p>
        </div>
        
        <div className="bg-gray-700 p-4 rounded-lg">
          <p className="text-gray-400 text-sm">Bonus Balance</p>
          <p className="text-2xl font-bold text-green-400">KES {user.bonusBalance.toFixed(2)}</p>
          {user.bonusBalance === 0 && (
            <Button 
              onClick={claimBonus} 
              className="mt-2 w-full bg-green-500 hover:bg-green-600"
              size="sm"
            >
              Claim 100% Bonus (KES 18,000)
            </Button>
          )}
        </div>
        
        <div className="bg-gray-700 p-4 rounded-lg">
          <p className="text-gray-400 text-sm">Pending Withdrawals</p>
          <p className="text-2xl font-bold text-yellow-400">KES {user.pendingWithdrawals.toFixed(2)}</p>
        </div>
      </div>
      
      <Tabs defaultValue="deposit" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="deposit">Deposit</TabsTrigger>
          <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
        </TabsList>
        
        <TabsContent value="deposit" className="mt-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="deposit-amount" className="text-white">Amount (KES)</Label>
            <Input
              id="deposit-amount"
              type="number"
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
              className="bg-gray-700 border-gray-600 text-white"
              min="100"
              step="100"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="deposit-provider" className="text-white">Payment Method</Label>
            <Select value={depositProvider} onValueChange={setDepositProvider}>
              <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mpesa">M-PESA</SelectItem>
                <SelectItem value="airtel">Airtel Money</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="deposit-phone" className="text-white">Phone Number</Label>
            <Input
              id="deposit-phone"
              type="tel"
              value={depositPhone}
              onChange={(e) => setDepositPhone(e.target.value)}
              className="bg-gray-700 border-gray-600 text-white"
              placeholder="e.g. 07XXXXXXXX"
            />
          </div>
          
          <Button 
            onClick={handleDeposit} 
            className="w-full bg-green-500 hover:bg-green-600"
            disabled={!depositAmount || !depositPhone}
          >
            Deposit Now
          </Button>
        </TabsContent>
        
        <TabsContent value="withdraw" className="mt-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="withdraw-amount" className="text-white">Amount (KES)</Label>
            <Input
              id="withdraw-amount"
              type="number"
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
              className="bg-gray-700 border-gray-600 text-white"
              min="100"
              max={user.balance.toString()}
              step="100"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="withdraw-provider" className="text-white">Withdrawal Method</Label>
            <Select value={withdrawProvider} onValueChange={setWithdrawProvider}>
              <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                <SelectValue placeholder="Select withdrawal method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pesapal">PesaPal</SelectItem>
                <SelectItem value="intasend">IntaSend</SelectItem>
                <SelectItem value="mpesa">M-PESA</SelectItem>
                <SelectItem value="airtel">Airtel Money</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold"
                disabled={parseFloat(withdrawAmount) > user.balance || parseFloat(withdrawAmount) <= 0}
              >
                Withdraw Now
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-800 text-white">
              <DialogHeader>
                <DialogTitle>Confirm Withdrawal</DialogTitle>
              </DialogHeader>
              
              <div className="space-y-4 mt-4">
                <div className="bg-gray-700 p-4 rounded-lg">
                  <p className="text-gray-400">Amount:</p>
                  <p className="text-xl font-bold">KES {withdrawAmount}</p>
                </div>
                
                <div className="bg-gray-700 p-4 rounded-lg">
                  <p className="text-gray-400">Provider:</p>
                  <p className="text-xl font-bold">{withdrawProvider.toUpperCase()}</p>
                </div>
                
                <div className="bg-gray-700 p-4 rounded-lg">
                  <p className="text-gray-400">API Key:</p>
                  <p className="text-sm font-mono truncate">YzQpA6FPAG4dV7UizQOuzCgWhba4HGWW</p>
                </div>
                
                <Button 
                  onClick={handleWithdrawal} 
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold"
                >
                  Confirm Withdrawal
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Wallet;