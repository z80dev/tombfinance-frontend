import { useCallback, useEffect, useState } from 'react';
import { BigNumber } from 'ethers';
import useTombFinance from './useTombFinance';
import config from '../config';

const useStakedBalanceOnMasonry = () => {
  const [balance, setBalance] = useState(BigNumber.from(0));
  const tombFinance = useTombFinance();
  const isUnlocked = tombFinance?.isUnlocked;

  const fetchBalance = useCallback(async () => {
    setBalance(await tombFinance.getStakedSharesOnMasonry());
  }, [tombFinance]);

  useEffect(() => {
    if (isUnlocked) {
      fetchBalance().catch((err) => console.error(err.stack));

      const refreshBalance = setInterval(fetchBalance, config.refreshInterval);
      return () => clearInterval(refreshBalance);
    }
  }, [setBalance, isUnlocked, tombFinance, fetchBalance]);

  return balance;
};

export default useStakedBalanceOnMasonry;
