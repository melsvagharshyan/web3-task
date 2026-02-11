import { ConnectWallet } from './ConnectWallet';
import { BalanceDisplay } from './BalanceDisplay';
import { useWallet } from '../hooks/useWallet';
import { HiOutlineShieldCheck } from 'react-icons/hi';
import { SiEthereum } from 'react-icons/si';

export function LandingPage() {
  const { address, isConnected } = useWallet();

  return (
    <div className="min-h-screen relative bg-linear-to-br from-blue-50 via-indigo-50 to-pink-50 dark:from-gray-900 dark:via-indigo-950 dark:to-gray-900 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-pink-400/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>
      
      <div className="relative container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 mb-6">
              <SiEthereum className="w-12 h-12 text-blue-600 dark:text-blue-400 animate-bounce" />
              <h1 className="text-5xl md:text-6xl font-extrabold bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Web3 Wallet Dashboard
            </h1>
            </div>
            <p className="text-xl text-gray-700 dark:text-gray-300 font-medium">
              Connect your MetaMask wallet to view your Ethereum and USDT balances
            </p>
          </div>

          <div className="bg-white/20 dark:bg-white/5 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 md:p-12 mb-8 border border-white/30 dark:border-white/10">
            <div className="flex flex-col items-center gap-12">
              <div className="w-full">
                <div className="flex items-center justify-center gap-2 mb-8">
                  <HiOutlineShieldCheck className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                    Wallet Connection
                  </h2>
                </div>
                <div className="flex justify-center">
                  <ConnectWallet />
                </div>
              </div>

              {isConnected && address && (
                <div className="w-full border-t border-white/20 dark:border-white/10 pt-12">
                  <BalanceDisplay address={address} />
                </div>
              )}
            </div>
          </div>

          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <HiOutlineShieldCheck className="w-4 h-4" />
              <p className="font-medium">Make sure you're connected to Ethereum Mainnet</p>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-500">
              Powered by MetaMask, wagmi & RainbowKit
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
