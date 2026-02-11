import { useWallet } from '../hooks/useWallet';
import { FaWallet } from 'react-icons/fa';
import { HiOutlineCheckCircle } from 'react-icons/hi';
import { FiRefreshCw } from 'react-icons/fi';
import { MdOutlineLogout } from 'react-icons/md';

export function ConnectWallet() {
  const { address, isConnecting, error, connectWallet, disconnectWallet } = useWallet();

  const formatAddress = (addr: string) => {
    if (!addr) return '';
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  if (address) {
    return (
      <div className="flex flex-col items-center gap-6 w-full">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex items-center gap-3 px-6 py-3 bg-white/10 dark:bg-white/5 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-white/10 shadow-xl">
            <HiOutlineCheckCircle className="w-5 h-5 text-green-400 animate-pulse" />
            <span className="text-sm font-semibold text-gray-800 dark:text-green-400">
              Connected
            </span>
          </div>
          <div className="px-6 py-3 bg-white/10 dark:bg-white/5 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-white/10 shadow-xl">
            <span className="text-sm font-mono font-semibold text-gray-800 dark:text-gray-200">
              {formatAddress(address)}
            </span>
          </div>
        </div>
        <button
          onClick={disconnectWallet}
          className="group flex items-center gap-2 px-8 py-3 bg-linear-to-r from-red-500/90 to-red-600/90 hover:from-red-600 hover:to-red-700 backdrop-blur-xl text-white rounded-2xl transition-all duration-300 font-semibold shadow-lg hover:shadow-2xl transform hover:scale-105 active:scale-95 border border-red-400/30 cursor-pointer"
        >
          <MdOutlineLogout className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
          Disconnect Wallet
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      <button
        onClick={connectWallet}
        disabled={isConnecting}
        className="group relative flex items-center gap-3 px-10 py-4 bg-linear-to-r from-blue-600/90 via-purple-600/90 to-blue-600/90 hover:from-blue-700 hover:via-purple-700 hover:to-blue-700 disabled:from-gray-400 disabled:via-gray-500 disabled:to-gray-400 disabled:cursor-not-allowed backdrop-blur-xl text-white rounded-2xl transition-all duration-300 font-bold text-lg shadow-2xl hover:shadow-blue-500/50 transform hover:scale-105 active:scale-95 border border-white/20 overflow-hidden cursor-pointer"
      >
        <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        {isConnecting ? (
          <>
            <FiRefreshCw className="w-6 h-6 animate-spin" />
            <span>Connecting...</span>
          </>
        ) : (
          <>
            <FaWallet className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
            <span>Connect Wallet</span>
          </>
        )}
      </button>
      {error && (
        <div className="px-6 py-4 bg-red-500/10 dark:bg-red-900/20 backdrop-blur-xl border border-red-400/30 dark:border-red-800/50 rounded-2xl max-w-md shadow-lg">
          <p className="text-sm text-red-700 dark:text-red-400 text-center font-medium">{error}</p>
        </div>
      )}
    </div>
  );
}
