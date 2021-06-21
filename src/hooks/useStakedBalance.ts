import { useCallback, useEffect, useState } from 'react';

import { BigNumber } from 'ethers';
import useTombFinance from './useTombFinance';
import { ContractName } from '../tomb-finance';
import config from '../config';

const useStakedBalance = (poolName: ContractName, poolId: Number) => {
  const [balance, setBalance] = useState(BigNumber.from(0));
  const tombFinance = useTombFinance();
  const isUnlocked = tombFinance?.isUnlocked;

  const fetchBalance = useCallback(async () => {
    const balance = await tombFinance.stakedBalanceOnBank(poolName, poolId, tombFinance.myAccount);
    setBalance(balance);
  }, [poolName, poolId, tombFinance]);

  useEffect(() => {
    if (isUnlocked) {
      fetchBalance().catch((err) => console.error(err.stack));

      const refreshBalance = setInterval(fetchBalance, config.refreshInterval);
      return () => clearInterval(refreshBalance);
    }
  }, [isUnlocked, poolName, setBalance, tombFinance, fetchBalance]);

  return balance;
};

export default useStakedBalance;
