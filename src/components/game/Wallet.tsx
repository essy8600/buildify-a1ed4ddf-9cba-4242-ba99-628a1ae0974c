
import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

const Wallet: React.FC = () => {
  const { user, claimBonus } = useGame();
  
  const [depositAmount, setDepositAmount] = useState<string>('1000');
  const [withdrawAmount, setWithdrawAmount] = useState<string>('1000');
  const [depositProvider, setDepositProvider] = useState<string>('mpesa');
  const [withdrawProvider, setWithdrawProvider] = useState<string>('pesapal');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  
  // Handle deposit
  const handleDeposit = () => {
    // In a real app, this would integrate with payment providers
    alert(`Deposit request of KES ${depositAmount} via ${depositProvider} initiated. You would receive a USSD push to ${phoneNumber}.`);
  };
  
  // Handle withdrawal
  const handleWithdrawal = () => {
    // In a real app, this would integrate with PesaPal API
    alert(`Withdrawal request of KES ${withdrawAmount} via ${withdrawProvider} initiated.`);
  };
  
  if (!user) {
    return (
      <div className="bg-gray-800 rounded-lg p-6 text-center">
        <p className="text-white text-lg">Please log in to access your wallet.</p>
      </div>
    );
  }
  
  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-700 p-4 rounded-lg">
          <h4 className="text-gray-400 mb-1">Available Balance</h4>
          <p className="text-2xl font-bold text-white">KES {user.balance.toFixed(2)}</p>
        </div>
        
        <div className="bg-gray-700 p-4 rounded-lg">
          <h4 className="text-gray-400 mb-1">Bonus Balance</h4>
          <p className="text-2xl font-bold text-green-400">KES {user.bonusBalance.toFixed(2)}</p>
        </div>
        
        <div className="bg-gray-700 p-4 rounded-lg">
          <h4 className="text-gray-400 mb-1">Pending Withdrawals</h4>
          <p className="text-2xl font-bold text-yellow-400">KES {user.pendingWithdrawals.toFixed(2)}</p>
        </div>
      </div>
      
      <Tabs defaultValue="deposit" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="deposit">Deposit</TabsTrigger>
          <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
        </TabsList>
        
        <TabsContent value="deposit" className="p-4 bg-gray-700 rounded-lg mt-2">
          <div className="space-y-4">
            <div>
              <label className="block text-white mb-2">Amount (KES)</label>
              <Input
                type="number"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                className="bg-gray-600 text-white border-gray-500"
                min="100"
                step="100"
              />
            </div>
            
            <div>
              <label className="block text-white mb-2">Phone Number</label>
              <Input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="bg-gray-600 text-white border-gray-500"
                placeholder="e.g. 254712345678"
              />
            </div>
            
            <div>
              <label className="block text-white mb-2">Payment Method</label>
              <Select value={depositProvider} onValueChange={setDepositProvider}>
                <SelectTrigger className="bg-gray-600 text-white border-gray-500">
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mpesa">M-PESA</SelectItem>
                  <SelectItem value="airtel">Airtel Money</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button 
              onClick={handleDeposit} 
              className="w-full bg-green-600 hover:bg-green-700"
            >
              Deposit Now
            </Button>
            
            <div className="border-t border-gray-600 pt-4 mt-4">
              <Button 
                onClick={claimBonus} 
                className="w-full bg-yellow-600 hover:bg-yellow-700"
              >
                Claim 100% Bonus (KES 18,000)
              </Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="withdraw" className="p-4 bg-gray-700 rounded-lg mt-2">
          <div className="space-y-4">
            <div>
              <label className="block text-white mb-2">Amount (KES)</label>
              <Input
                type="number"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                className="bg-gray-600 text-white border-gray-500"
                min="100"
                max={user.balance}
                step="100"
              />
            </div>
            
            <div>
              <label className="block text-white mb-2">Withdrawal Method</label>
              <Select value={withdrawProvider} onValueChange={setWithdrawProvider}>
                <SelectTrigger className="bg-gray-600 text-white border-gray-500">
                  <SelectValue placeholder="Select withdrawal method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pesapal">PesaPal</SelectItem>
                  <SelectItem value="intasend">IntaSend</SelectItem>
                  <SelectItem value="mpesa">M-PESA</SelectItem>
                  <SelectItem value="airtel">Airtel Money</SelectItem>
                  <SelectItem value="bank">Bank Transfer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  disabled={parseFloat(withdrawAmount) > user.balance}
                >
                  Request Withdrawal
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-gray-800 text-white">
                <DialogHeader>
                  <DialogTitle>Confirm Withdrawal</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                  <p>You are about to withdraw KES {withdrawAmount} via {withdrawProvider}.</p>
                  <p className="mt-2">PesaPal API will be used to process this transaction.</p>
                  <p className="mt-4 text-sm text-gray-400">
                    Consumer Key: YzQpA6FPAG4dV7UizQOuzCgWhba4HGWW
                  </p>
                  <p className="text-sm text-gray-400">
                    Endpoint: https://www.pesapal.com/
                  </p>
                </div>
                <Button 
                  onClick={handleWithdrawal} 
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  Confirm Withdrawal
                </Button>
              </DialogContent>
            </Dialog>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Wallet;