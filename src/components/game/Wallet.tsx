
import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';

const Wallet: React.FC = () => {
  const { user, addBonus } = useGame();
  const [depositAmount, setDepositAmount] = useState<string>('');
  const [withdrawAmount, setWithdrawalAmount] = useState<string>('');
  const [paymentProvider, setPaymentProvider] = useState<string>('mpesa');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [isDepositDialogOpen, setIsDepositDialogOpen] = useState<boolean>(false);
  const [isWithdrawDialogOpen, setIsWithdrawDialogOpen] = useState<boolean>(false);
  
  const handleDeposit = () => {
    // In a real app, this would call an API
    alert(`Deposit of KES ${depositAmount} via ${paymentProvider} initiated. You will receive a push notification on ${phoneNumber}.`);
    setIsDepositDialogOpen(false);
  };
  
  const handleWithdraw = () => {
    // In a real app, this would call an API
    alert(`Withdrawal of KES ${withdrawAmount} via ${paymentProvider} initiated to ${phoneNumber}.`);
    setIsWithdrawDialogOpen(false);
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Wallet</CardTitle>
        {user && (
          <CardDescription>
            Available Balance: KES {user.balance.toFixed(2)} | 
            Bonus: KES {user.bonusBalance.toFixed(2)}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        {!user ? (
          <p>Please log in to access your wallet</p>
        ) : (
          <Tabs defaultValue="deposit">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="deposit">Deposit</TabsTrigger>
              <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
              <TabsTrigger value="bonus">Bonus</TabsTrigger>
            </TabsList>
            
            <TabsContent value="deposit">
              <div className="space-y-4">
                <p>Deposit funds to your account using mobile money.</p>
                
                <Dialog open={isDepositDialogOpen} onOpenChange={setIsDepositDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full">Deposit Now</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Deposit Funds</DialogTitle>
                      <DialogDescription>
                        Enter the amount and payment details below.
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="deposit-amount">Amount (KES)</Label>
                        <Input
                          id="deposit-amount"
                          type="number"
                          min="100"
                          value={depositAmount}
                          onChange={(e) => setDepositAmount(e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="payment-provider">Payment Method</Label>
                        <Select value={paymentProvider} onValueChange={setPaymentProvider}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select payment method" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="mpesa">M-PESA</SelectItem>
                            <SelectItem value="airtel">Airtel Money</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone-number">Phone Number</Label>
                        <Input
                          id="phone-number"
                          placeholder="e.g. 07XXXXXXXX"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <DialogFooter>
                      <Button onClick={handleDeposit}>Confirm Deposit</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </TabsContent>
            
            <TabsContent value="withdraw">
              <div className="space-y-4">
                <p>Withdraw your winnings to your mobile money account.</p>
                
                <Dialog open={isWithdrawDialogOpen} onOpenChange={setIsWithdrawDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full">Withdraw Now</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Withdraw Funds</DialogTitle>
                      <DialogDescription>
                        Enter the amount and payment details below.
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="withdraw-amount">Amount (KES)</Label>
                        <Input
                          id="withdraw-amount"
                          type="number"
                          min="100"
                          max={user.balance}
                          value={withdrawAmount}
                          onChange={(e) => setWithdrawalAmount(e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="withdraw-provider">Payment Method</Label>
                        <Select value={paymentProvider} onValueChange={setPaymentProvider}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select payment method" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="mpesa">M-PESA</SelectItem>
                            <SelectItem value="airtel">Airtel Money</SelectItem>
                            <SelectItem value="pesapal">PesaPal</SelectItem>
                            <SelectItem value="intasend">IntaSend</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="withdraw-phone">Phone Number</Label>
                        <Input
                          id="withdraw-phone"
                          placeholder="e.g. 07XXXXXXXX"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <DialogFooter>
                      <Button onClick={handleWithdraw}>Confirm Withdrawal</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </TabsContent>
            
            <TabsContent value="bonus">
              <div className="space-y-4">
                <p>Claim your welcome bonus of 100% up to KES 18,000!</p>
                <Button 
                  className="w-full" 
                  onClick={addBonus}
                  disabled={user.bonusBalance > 0}
                >
                  {user.bonusBalance > 0 ? 'Bonus Already Claimed' : 'Claim Bonus'}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
    </Card>
  );
};

export default Wallet;