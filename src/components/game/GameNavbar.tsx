
import React from 'react';
import { useGame } from '../../context/GameContext';
import AuthForms from '../auth/AuthForms';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import DomainReceipt from './DomainReceipt';

const GameNavbar: React.FC = () => {
  const { user } = useGame();
  
  return (
    <div className="bg-gray-900 py-4 px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold text-yellow-500">Aviator Bet</h1>
      </div>
      
      <div className="flex items-center gap-2">
        {user && (
          <div className="bg-gray-800 px-4 py-2 rounded-lg mr-2">
            <span className="text-gray-400 text-sm">Balance:</span>
            <span className="text-white font-bold ml-2">KES {user.balance.toFixed(2)}</span>
          </div>
        )}
        
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                Settings
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-800 text-white">
              <DialogHeader>
                <DialogTitle>Settings</DialogTitle>
              </DialogHeader>
              
              <Tabs defaultValue="account" className="w-full mt-4">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="account">Account</TabsTrigger>
                  <TabsTrigger value="preferences">Preferences</TabsTrigger>
                </TabsList>
                
                <TabsContent value="account" className="mt-4 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="display-name">Display Name</Label>
                    <Input
                      id="display-name"
                      defaultValue={user?.email?.split('@')[0] || ''}
                      className="bg-gray-700 border-gray-600"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      defaultValue={user?.email || ''}
                      className="bg-gray-700 border-gray-600"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      defaultValue={user?.phone || ''}
                      className="bg-gray-700 border-gray-600"
                    />
                  </div>
                  
                  <Button className="w-full">
                    Save Changes
                  </Button>
                </TabsContent>
                
                <TabsContent value="preferences" className="mt-4 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <Select defaultValue="en">
                      <SelectTrigger className="bg-gray-700 border-gray-600">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="currency">Currency</Label>
                    <Select defaultValue="kes">
                      <SelectTrigger className="bg-gray-700 border-gray-600">
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="kes">Kenyan Shilling (KES)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button className="w-full">
                    Save Preferences
                  </Button>
                </TabsContent>
              </Tabs>
            </DialogContent>
          </Dialog>
          
          <DomainReceipt />
          
          <AuthForms />
        </div>
      </div>
    </div>
  );
};

export default GameNavbar;