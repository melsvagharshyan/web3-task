import { useMemo } from 'react';
import { useBalance, useReadContract } from 'wagmi';
import type { Address } from 'viem';
import { formatUnits } from 'viem';
import { formatBalance } from '../utils/ethers';
import { USDT_CONTRACT_ADDRESS, USDT_DECIMALS } from '../utils/constants';
import type { TokenBalance } from '../types/wallet';

const ERC20_ABI = [
  {
    type: 'function',
    name: 'balanceOf',
    stateMutability: 'view',
    inputs: [{ name: 'owner', type: 'address' }],
    outputs: [{ name: 'balance', type: 'uint256' }],
  },
] as const;

const EMPTY_ETH_BALANCE: TokenBalance = {
  symbol: 'ETH',
  balance: '0',
  formatted: '0.0000',
};

const EMPTY_USDT_BALANCE: TokenBalance = {
  symbol: 'USDT',
  balance: '0',
  formatted: '0.0000',
};

const REFRESH_INTERVAL = 30_000;

export function useBalances(address: string | null) {
  const hasAddress = Boolean(address);

  const {
    data: ethBalanceData,
    isPending: isEthPending,
    error: ethError,
  } = useBalance({
    address: (address ?? undefined) as Address | undefined,
    query: {
      enabled: hasAddress,
      refetchInterval: REFRESH_INTERVAL,
      staleTime: REFRESH_INTERVAL / 2,
    },
  });

  const {
    data: usdtRawBalance,
    isPending: isUsdtPending,
    error: usdtError,
  } = useReadContract({
    address: USDT_CONTRACT_ADDRESS,
    abi: ERC20_ABI,
    functionName: 'balanceOf',
    args: address ? [(address as Address)] : undefined,
    query: {
      enabled: hasAddress,
      refetchInterval: REFRESH_INTERVAL,
      staleTime: REFRESH_INTERVAL / 2,
    },
  });

  const ethBalance: TokenBalance = useMemo(() => {
    if (!hasAddress || !ethBalanceData) {
      return EMPTY_ETH_BALANCE;
    }

    const normalized = formatUnits(
      ethBalanceData.value,
      ethBalanceData.decimals,
    );

    return {
      symbol: ethBalanceData.symbol ?? 'ETH',
      balance: normalized,
      formatted: formatBalance(normalized),
    };
  }, [ethBalanceData, hasAddress]);

  const usdtBalance: TokenBalance = useMemo(() => {
    if (!hasAddress || usdtRawBalance === undefined) {
      return EMPTY_USDT_BALANCE;
    }

    const normalized = formatUnits(usdtRawBalance as bigint, USDT_DECIMALS);

    return {
      symbol: 'USDT',
      balance: normalized,
      formatted: formatBalance(normalized, 2),
    };
  }, [hasAddress, usdtRawBalance]);

  const error =
    ethError instanceof Error
      ? ethError.message
      : usdtError instanceof Error
        ? usdtError.message
        : null;

  return {
    ethBalance,
    usdtBalance,
    isLoading: hasAddress ? isEthPending || isUsdtPending : false,
    error,
  };
}
