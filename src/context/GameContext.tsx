
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Bet, GameRound } from '../types';

interface GameContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, phone: string, password: string) => Promise<void>;
  logout: () => void;
  currentRound: GameRound | null;
  roundHistory: GameRound[];
  currentMultiplier: number;
  bets: [Bet | null, Bet | null];
  placeBet: (betIndex: 0 | 1, amount: number, autoCashout?: number) => void;
  cashout: (betIndex: 0 | 1) => void;
  gameStatus: 'waiting' | 'in-progress' | 'completed';
  roundNumber: number;
  addBonus: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

interface GameProviderProps {
  children: ReactNode;
}

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [currentRound, setCurrentRound] = useState<GameRound | null>(null);
  const [roundHistory, setRoundHistory] = useState<GameRound[]>([]);
  const [currentMultiplier, setCurrentMultiplier] = useState<number>(1);
  const [bets, setBets] = useState<[Bet | null, Bet | null]>([null, null]);
  const [gameStatus, setGameStatus] = useState<'waiting' | 'in-progress' | 'completed'>('waiting');
  const [roundNumber, setRoundNumber] = useState<number>(1);
  const [countdown, setCountdown] = useState<number>(30);
  const [animationId, setAnimationId] = useState<number | null>(null);

  // Mock login function
  const login = async (email: string, password: string) => {
    // In a real app, this would call an API
    setUser({
      id: '1',
      email,
      balance: 1000,
      bonusBalance: 0,
    });
  };

  // Mock register function
  const register = async (email: string, phone: string, password: string) => {
    // In a real app, this would call an API
    setUser({
      id: '1',
      email,
      phone,
      balance: 1000,
      bonusBalance: 0,
    });
  };

  const logout = () => {
    setUser(null);
  };

  const addBonus = () => {
    if (user) {
      setUser({
        ...user,
        bonusBalance: user.bonusBalance + 18000,
      });
    }
  };

  // Calculate crash point based on round number
  const calculateCrashPoint = (round: number): number => {
    if (round >= 1 && round <= 10) return 20;
    if (round >= 11 && round <= 20) return 60;
    if (round >= 21 && round <= 30) return 200;
    if (round >= 31 && round <= 40) return 600;
    return 1000; // rounds 41-50
  };

  // Place a bet
  const placeBet = (betIndex: 0 | 1, amount: number, autoCashout?: number) => {
    if (!user || gameStatus !== 'waiting') return;
    
    // Check if user has enough balance
    if (user.balance < amount) return;
    
    // Create new bet
    const newBet: Bet = {
      id: Math.random().toString(),
      amount,
      autoCashoutMultiplier: autoCashout,
      isActive: true,
      isCashedOut: false,
    };
    
    // Update bets array
    const newBets = [...bets] as [Bet | null, Bet | null];
    newBets[betIndex] = newBet;
    setBets(newBets);
    
    // Deduct amount from user balance
    setUser({
      ...user,
      balance: user.balance - amount,
    });
  };

  // Cash out a bet
  const cashout = (betIndex: 0 | 1) => {
    if (!user || gameStatus !== 'in-progress') return;
    
    const bet = bets[betIndex];
    if (!bet || !bet.isActive || bet.isCashedOut) return;
    
    // Calculate winnings
    const winAmount = bet.amount * currentMultiplier;
    
    // Update bet
    const newBets = [...bets] as [Bet | null, Bet | null];
    newBets[betIndex] = {
      ...bet,
      isCashedOut: true,
      cashoutMultiplier: currentMultiplier,
      winAmount,
    };
    setBets(newBets);
    
    // Add winnings to user balance
    setUser({
      ...user,
      balance: user.balance + winAmount,
    });

    // If both bets are cashed out, end the round
    if ((newBets[0]?.isCashedOut || !newBets[0]) && 
        (newBets[1]?.isCashedOut || !newBets[1])) {
      endRound();
    }
  };

  // Start a new round
  const startRound = () => {
    const crashPoint = calculateCrashPoint(roundNumber);
    
    const newRound: GameRound = {
      id: roundNumber,
      crashPoint,
      startTime: new Date(),
      status: 'in-progress',
    };
    
    setCurrentRound(newRound);
    setGameStatus('in-progress');
    setCurrentMultiplier(1);
    
    // Start multiplier animation
    startMultiplierAnimation(crashPoint);
  };

  // End the current round
  const endRound = () => {
    if (!currentRound) return;
    
    // Stop animation
    if (animationId !== null) {
      cancelAnimationFrame(animationId);
      setAnimationId(null);
    }
    
    // Update current round
    const updatedRound: GameRound = {
      ...currentRound,
      endTime: new Date(),
      status: 'completed',
    };
    
    setCurrentRound(null);
    setRoundHistory(prev => [updatedRound, ...prev].slice(0, 10));
    
    // Handle uncashed bets (they lose)
    const newBets: [Bet | null, Bet | null] = [null, null];
    setBets(newBets);
    
    // Prepare for next round
    setGameStatus('waiting');
    setRoundNumber(prev => (prev % 50) + 1);
    setCountdown(30);
  };

  // Animate multiplier increasing
  const startMultiplierAnimation = (crashPoint: number) => {
    let startTime: number | null = null;
    let lastMultiplier = 1;
    
    // Adjust speed based on crash point
    const speedFactor = crashPoint > 100 ? 2 : 1;
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      
      // Calculate new multiplier (exponential growth)
      // Higher crash points should grow faster
      const newMultiplier = Math.min(
        1 + (Math.pow(elapsed / 1000, 1.5) * 0.1 * speedFactor),
        crashPoint
      );
      
      setCurrentMultiplier(parseFloat(newMultiplier.toFixed(2)));
      
      // Check for auto-cashouts
      bets.forEach((bet, index) => {
        if (bet && bet.isActive && !bet.isCashedOut && bet.autoCashoutMultiplier) {
          if (newMultiplier >= bet.autoCashoutMultiplier) {
            cashout(index as 0 | 1);
          }
        }
      });
      
      // If we've reached the crash point or all bets are cashed out
      if (newMultiplier >= crashPoint) {
        endRound();
        return;
      }
      
      lastMultiplier = newMultiplier;
      const id = requestAnimationFrame(animate);
      setAnimationId(id);
    };
    
    const id = requestAnimationFrame(animate);
    setAnimationId(id);
  };

  // Countdown timer for waiting period
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (gameStatus === 'waiting' && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    } else if (gameStatus === 'waiting' && countdown === 0) {
      startRound();
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [gameStatus, countdown]);

  const value = {
    user,
    setUser,
    isLoggedIn: !!user,
    login,
    register,
    logout,
    currentRound,
    roundHistory,
    currentMultiplier,
    bets,
    placeBet,
    cashout,
    gameStatus,
    roundNumber,
    addBonus,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};