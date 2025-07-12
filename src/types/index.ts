
export interface User {
  id: string;
  email?: string;
  phone?: string;
  balance: number;
  bonusBalance: number;
  pendingWithdrawals: number;
}

export interface Bet {
  id: string;
  amount: number;
  autoCashoutAt: number | null;
  isActive: boolean;
  isCashedOut: boolean;
  cashoutMultiplier: number | null;
  winAmount: number | null;
  betNumber: 1 | 2;
}

export interface GameRound {
  id: number;
  crashPoint: number;
  startTime: Date;
  endTime: Date | null;
  status: 'waiting' | 'running' | 'completed';
}

export interface GameHistory {
  id: number;
  crashPoint: number;
  timestamp: Date;
}

export interface WithdrawalRequest {
  id: string;
  amount: number;
  status: 'pending' | 'completed' | 'rejected';
  provider: string;
  timestamp: Date;
}

export interface DepositRequest {
  id: string;
  amount: number;
  status: 'pending' | 'completed' | 'rejected';
  provider: string;
  timestamp: Date;
}