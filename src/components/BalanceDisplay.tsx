import { useBalances } from '../hooks/useBalances';
import type { TokenBalance } from '../types/wallet';
import { FaEthereum } from 'react-icons/fa';
import { SiTether } from 'react-icons/si';
import { FiRefreshCw } from 'react-icons/fi';
import { HiOutlineServer } from 'react-icons/hi';

interface BalanceCardProps {
  balance: TokenBalance;
  isLoading: boolean;
}

function BalanceCard({ balance, isLoading }: BalanceCardProps) {
  const isETH = balance.symbol === 'ETH';
  const Icon = isETH ? FaEthereum : SiTether;
  const gradientFrom = isETH ? 'from-blue-500/20' : 'from-green-500/20';
  const gradientTo = isETH ? 'to-purple-500/20' : 'to-emerald-500/20';
  const iconColor = isETH ? 'text-blue-500' : 'text-green-500';

  return (
    <div className="group relative bg-white/10 dark:bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20 dark:border-white/10 hover:border-white/30 transition-all duration-300 hover:scale-105 overflow-hidden">
      <div className={`absolute inset-0 bg-linear-to-br ${gradientFrom} ${gradientTo} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-2xl bg-white/10 dark:bg-white/5 ${iconColor} backdrop-blur-sm`}>
              <Icon className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">
              {balance.symbol}
            </h3>
          </div>
          {isLoading && (
            <FiRefreshCw className="w-5 h-5 text-gray-600 dark:text-gray-400 animate-spin" />
          )}
        </div>
        <div className="mb-2">
          <div className="text-4xl font-extrabold bg-linear-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            {isLoading ? (
              <span className="inline-block animate-pulse">...</span>
            ) : (
              balance.formatted
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/10 dark:border-white/5">
          <HiOutlineServer className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          <p className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
            Ethereum Mainnet
          </p>
        </div>
      </div>
    </div>
  );
}

interface BalanceDisplayProps {
  address: string | null;
}

export function BalanceDisplay({ address }: BalanceDisplayProps) {
  const { ethBalance, usdtBalance, isLoading, error } = useBalances(address);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <h2 className="text-3xl font-extrabold bg-linear-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-8 text-center">
        Your Balances
      </h2>
      {error ? (
        <div className="px-6 py-4 bg-yellow-500/10 dark:bg-yellow-900/20 backdrop-blur-xl border border-yellow-400/30 dark:border-yellow-800/50 rounded-2xl shadow-lg">
          <p className="text-sm text-yellow-700 dark:text-yellow-400 text-center font-medium">
            {error}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <BalanceCard balance={ethBalance} isLoading={isLoading} />
          <BalanceCard balance={usdtBalance} isLoading={isLoading} />
        </div>
      )}
    </div>
  );
}
