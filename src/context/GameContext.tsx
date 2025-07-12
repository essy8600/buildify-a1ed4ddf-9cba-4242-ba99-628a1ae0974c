
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Bet, GameRound, GameHistory } from '../types';

interface GameContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, phone: string, password: string) => Promise<void>;
  logout: () => void;
  currentRound: GameRound | null;
  gameHistory: GameHistory[];
  currentMultiplier: number;
  gameState: 'waiting' | 'running' | 'crashed';
  roundNumber: number;
  bets: Bet[];
  placeBet: (amount: number, autoCashoutAt: number | null, betNumber: 1 | 2) => void;
  cashout: (betNumber: 1 | 2) => void;
  claimBonus: () => void;
  timeUntilNextRound: number;
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
  const [gameHistory, setGameHistory] = useState<GameHistory[]>([]);
  const [currentMultiplier, setCurrentMultiplier] = useState<number>(1);
  const [gameState, setGameState] = useState<'waiting' | 'running' | 'crashed'>('waiting');
  const [roundNumber, setRoundNumber] = useState<number>(1);
  const [bets, setBets] = useState<Bet[]>([]);
  const [timeUntilNextRound, setTimeUntilNextRound] = useState<number>(30);

  // Determine crash point based on round number
  const determineCrashPoint = (round: number): number => {
    if (round <= 10) return 20;
    if (round <= 20) return 60;
    if (round <= 30) return 200;
    if (round <= 40) return 600;
    return 1000;
  };

  // Start a new game round
  const startNewRound = () => {
    setGameState('waiting');
    setTimeUntilNextRound(30);
    
    // Countdown timer for next round
    const countdownInterval = setInterval(() => {
      setTimeUntilNextRound((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          startGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Start the game animation
  const startGame = () => {
    const crashPoint = determineCrashPoint(roundNumber);
    
    setCurrentRound({
      id: roundNumber,
      crashPoint,
      startTime: new Date(),
      endTime: null,
      status: 'running'
    });
    
    setGameState('running');
    setCurrentMultiplier(1);
    
    // Multiplier animation
    const multiplierInterval = setInterval(() => {
      setCurrentMultiplier((prev) => {
        const increment = prev * 0.05; // Faster increase at higher values
        const newValue = prev + increment;
        
        // Check for auto cashouts
        bets.forEach(bet => {
          if (bet.isActive && !bet.isCashedOut && bet.autoCashoutAt && newValue >= bet.autoCashoutAt) {
            cashout(bet.betNumber);
          }
        });
        
        // Check if we've reached the crash point
        if (newValue >= crashPoint) {
          clearInterval(multiplierInterval);
          endRound(crashPoint);
          return crashPoint;
        }
        
        return newValue;
      });
    }, 100);
  };

  // End the current round
  const endRound = (finalMultiplier: number) => {
    setGameState('crashed');
    
    // Update game history
    const historyEntry: GameHistory = {
      id: roundNumber,
      crashPoint: finalMultiplier,
      timestamp: new Date()
    };
    
    setGameHistory(prev => [historyEntry, ...prev].slice(0, 10));
    
    // Mark all active bets as lost
    setBets(prev => 
      prev.map(bet => 
        bet.isActive && !bet.isCashedOut 
          ? { ...bet, isActive: false } 
          : bet
      )
    );
    
    // Update round
    setCurrentRound(prev => 
      prev ? { ...prev, endTime: new Date(), status: 'completed' } : null
    );
    
    // Prepare for next round
    setRoundNumber(prev => prev + 1);
    
    // Start next round after a short delay
    setTimeout(startNewRound, 3000);
  };

  // Place a bet
  const placeBet = (amount: number, autoCashoutAt: number | null, betNumber: 1 | 2) => {
    if (!user || gameState !== 'waiting') return;
    
    // Check if user has enough balance
    if (user.balance < amount) return;
    
    // Create new bet
    const newBet: Bet = {
      id: Math.random().toString(36).substring(2, 9),
      amount,
      autoCashoutAt,
      isActive: true,
      isCashedOut: false,
      cashoutMultiplier: null,
      winAmount: null,
      betNumber
    };
    
    // Remove any existing bet with the same betNumber
    const filteredBets = bets.filter(bet => bet.betNumber !== betNumber);
    
    // Add new bet
    setBets([...filteredBets, newBet]);
    
    // Deduct amount from user balance
    setUser(prev => 
      prev ? { ...prev, balance: prev.balance - amount } : null
    );
  };

  // Cash out a bet
  const cashout = (betNumber: 1 | 2) => {
    if (gameState !== 'running') return;
    
    setBets(prev => 
      prev.map(bet => {
        if (bet.betNumber === betNumber && bet.isActive && !bet.isCashedOut) {
          const winAmount = bet.amount * currentMultiplier;
          
          // Update user balance
          setUser(user => 
            user ? { ...user, balance: user.balance + winAmount } : null
          );
          
          return {
            ...bet,
            isCashedOut: true,
            cashoutMultiplier: currentMultiplier,
            winAmount
          };
        }
        return bet;
      })
    );
    
    // Check if all active bets are cashed out
    const allCashedOut = bets.every(bet => !bet.isActive || bet.isCashedOut);
    
    // If all bets are cashed out, end the round
    if (allCashedOut) {
      endRound(currentMultiplier);
    }
  };

  // Claim bonus
  const claimBonus = () => {
    if (!user) return;
    
    const bonusAmount = 18000; // KES 18,000
    
    setUser(prev => 
      prev ? { 
        ...prev, 
        bonusBalance: prev.bonusBalance + bonusAmount,
        balance: prev.balance + bonusAmount
      } : null
    );
  };

  // Authentication functions
  const login = async (email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock user data
    setUser({
      id: '1',
      email,
      balance: 5000,
      bonusBalance: 0,
      pendingWithdrawals: 0
    });
  };

  const register = async (email: string, phone: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock user data
    setUser({
      id: '1',
      email,
      phone,
      balance: 5000,
      bonusBalance: 0,
      pendingWithdrawals: 0
    });
  };

  const logout = () => {
    setUser(null);
  };

  // Initialize the game
  useEffect(() => {
    // Start with some mock history data
    const mockHistory: GameHistory[] = Array.from({ length: 10 }, (_, i) => ({
      id: i,
      crashPoint: Math.random() * 10 + 1,
      timestamp: new Date(Date.now() - i * 60000)
    }));
    
    setGameHistory(mockHistory);
    startNewRound();
    
    // Cleanup
    return () => {
      // Clear any intervals or timeouts
    };
  }, []);

  const value = {
    user,
    setUser,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    currentRound,
    gameHistory,
    currentMultiplier,
    gameState,
    roundNumber,
    bets,
    placeBet,
    cashout,
    claimBonus,
    timeUntilNextRound
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};