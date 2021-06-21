import { useEffect } from 'react';
// import { connectorLocalStorageKey, ConnectorNames } from '@pancakeswap/uikit'
import { useWallet } from 'use-wallet';

const useEagerConnect = () => {
  // const { login } = useAuth()
  const { account, connect, connector } = useWallet();

  if (account) {
    window.localStorage.setItem('connectorId', connector);
  }

  useEffect(() => {
    const connectorId = window.localStorage.getItem('connectorId');

    if (connectorId && !account) {
      connect(connectorId);
    }
  }, [connect, account]);
};

export default useEagerConnect;
