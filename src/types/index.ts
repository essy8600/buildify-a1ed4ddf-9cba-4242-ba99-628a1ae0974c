
export interface User {
  id: string;
  email?: string;
  phone?: string;
  balance: number;
  bonusBalance: number;
}

export interface Bet {
  id: string;
  amount: number;
  autoCashoutMultiplier?: number;
  isActive: boolean;
  isCashedOut: boolean;
  cashoutMultiplier?: number;
  winAmount?: number;
}

export interface GameRound {
  id: number;
  crashPoint: number;
  startTime: Date;
  endTime?: Date;
  status: 'waiting' | 'in-progress' | 'completed';
}

export interface WithdrawalRequest {
  id: string;
  amount: number;
  status: 'pending' | 'completed' | 'rejected';
  createdAt: Date;
  provider: string;
}