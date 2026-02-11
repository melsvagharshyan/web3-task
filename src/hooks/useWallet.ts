import { useCallback, useEffect, useMemo, useState } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';

const PREFERRED_CONNECTORS = ['metaMask', 'injected'];

export function useWallet() {
  const { address, isConnected, isConnecting } = useAccount();
  const {
    connectAsync,
    connectors,
    isPending,
    error: connectError,
  } = useConnect();
  const { disconnect } = useDisconnect();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (connectError) {
      const message =
        connectError instanceof Error
          ? connectError.message
          : 'Failed to connect wallet';
      setError(message);
    }
  }, [connectError]);

  const selectableConnector = useMemo(() => {
    const readyPreferred = connectors.find(
      (connector) =>
        PREFERRED_CONNECTORS.includes(connector.id) && connector.ready,
    );

    if (readyPreferred) {
      return readyPreferred;
    }

    const preferred = connectors.find((connector) =>
      PREFERRED_CONNECTORS.includes(connector.id),
    );

    if (preferred) {
      return preferred;
    }

    const readyConnector = connectors.find((connector) => connector.ready);
    return readyConnector ?? connectors[0] ?? null;
  }, [connectors]);

  const connectWallet = useCallback(async () => {
    setError(null);

    if (!selectableConnector) {
      setError(
        'No wallet connectors are available. Please install MetaMask to continue.',
      );
      return;
    }

    try {
      await connectAsync({ connector: selectableConnector });
    } catch (err) {
      if (
        err instanceof Error &&
        (err.message.includes('Connector not found') ||
          err.message.includes('Connector already connected'))
      ) {
        setError('MetaMask could not be detected. Please ensure it is installed and enabled.');
        return;
      }

      const message =
        err instanceof Error ? err.message : 'Failed to connect wallet';
      setError(message);
    }
  }, [connectAsync, selectableConnector]);

  const disconnectWallet = useCallback(() => {
    setError(null);
    disconnect();
  }, [disconnect]);

  return {
    address: address ?? null,
    isConnected,
    isConnecting: isConnecting || isPending,
    error,
    connectWallet,
    disconnectWallet,
  };
}
