
import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';

const AuthForms: React.FC = () => {
  const { user, login, register, logout, isAuthenticated } = useGame();
  
  const [loginEmail, setLoginEmail] = useState<string>('');
  const [loginPassword, setLoginPassword] = useState<string>('');
  
  const [registerEmail, setRegisterEmail] = useState<string>('');
  const [registerPhone, setRegisterPhone] = useState<string>('');
  const [registerPassword, setRegisterPassword] = useState<string>('');
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState<string>('');
  
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleLogin = async () => {
    if (!loginEmail || !loginPassword) {
      setError('Please fill in all fields');
      return;
    }
    
    setError(null);
    setIsLoading(true);
    
    try {
      await login(loginEmail, loginPassword);
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleRegister = async () => {
    if (!registerEmail || !registerPhone || !registerPassword || !registerConfirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    
    if (registerPassword !== registerConfirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    setError(null);
    setIsLoading(true);
    
    try {
      await register(registerEmail, registerPhone, registerPassword);
    } catch (err) {
      setError('Registration failed');
    } finally {
      setIsLoading(false);
    }
  };
  
  if (isAuthenticated) {
    return (
      <Button 
        onClick={logout} 
        variant="destructive"
        size="sm"
      >
        Logout
      </Button>
    );
  }
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">Login / Register</Button>
      </DialogTrigger>
      <DialogContent className="bg-gray-800 text-white">
        <DialogHeader>
          <DialogTitle>Account Access</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="login" className="w-full mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login" className="mt-4 space-y-4">
            {error && (
              <div className="bg-red-500/20 border border-red-500 p-3 rounded-md text-red-300 text-sm">
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="login-email">Email</Label>
              <Input
                id="login-email"
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="bg-gray-700 border-gray-600"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="login-password">Password</Label>
              <Input
                id="login-password"
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="bg-gray-700 border-gray-600"
              />
            </div>
            
            <Button 
              onClick={handleLogin} 
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
          </TabsContent>
          
          <TabsContent value="register" className="mt-4 space-y-4">
            {error && (
              <div className="bg-red-500/20 border border-red-500 p-3 rounded-md text-red-300 text-sm">
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="register-email">Email</Label>
              <Input
                id="register-email"
                type="email"
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
                className="bg-gray-700 border-gray-600"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="register-phone">Phone Number</Label>
              <Input
                id="register-phone"
                type="tel"
                value={registerPhone}
                onChange={(e) => setRegisterPhone(e.target.value)}
                className="bg-gray-700 border-gray-600"
                placeholder="e.g. 07XXXXXXXX"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="register-password">Password</Label>
              <Input
                id="register-password"
                type="password"
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
                className="bg-gray-700 border-gray-600"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="register-confirm-password">Confirm Password</Label>
              <Input
                id="register-confirm-password"
                type="password"
                value={registerConfirmPassword}
                onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                className="bg-gray-700 border-gray-600"
              />
            </div>
            
            <Button 
              onClick={handleRegister} 
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Registering...' : 'Register'}
            </Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AuthForms;