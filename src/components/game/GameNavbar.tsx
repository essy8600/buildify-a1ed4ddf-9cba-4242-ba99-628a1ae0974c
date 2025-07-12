
import React from 'react';
import { useGame } from '../../context/GameContext';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import AuthForms from '../auth/AuthForms';

const GameNavbar: React.FC = () => {
  const { user, isLoggedIn, logout } = useGame();
  
  return (
    <nav className="bg-slate-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="h-6 w-6 text-red-500"
          >
            <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>
          </svg>
          <span className="font-bold text-xl">Aviator</span>
        </div>
        
        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <>
              <span className="hidden md:inline">
                Welcome, {user?.email || 'Player'}
              </span>
              <Button 
                variant="ghost" 
                className="text-white hover:text-white hover:bg-slate-800"
                onClick={logout}
              >
                Logout
              </Button>
            </>
          ) : (
            <Dialog>
              <DialogTrigger asChild>
                <Button>Login / Register</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Authentication</DialogTitle>
                  <DialogDescription>
                    Login or create an account to start playing
                  </DialogDescription>
                </DialogHeader>
                <AuthForms />
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
    </nav>
  );
};

export default GameNavbar;