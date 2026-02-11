export interface WalletState {
  address: string | null;
  isConnected: boolean;
  isConnecting: boolean;
  error: string | null;
}

export interface TokenBalance {
  symbol: string;
  balance: string;
  formatted: string;
}
