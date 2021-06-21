import { useCallback, useEffect, useState } from 'react';
import { BigNumber } from 'ethers';
import useTombFinance from './useTombFinance';
import config from '../config';

const useTotalStakedOnMasonry = () => {
  const [totalStaked, setTotalStaked] = useState(BigNumber.from(0));
  const tombFinance = useTombFinance();
  const isUnlocked = tombFinance?.isUnlocked;

  const fetchTotalStaked = useCallback(async () => {
    setTotalStaked(await tombFinance.getTotalStakedInMasonry());
  }, [tombFinance]);

  useEffect(() => {
    if (isUnlocked) {
      fetchTotalStaked().catch((err) => console.error(err.stack));

      const refreshBalance = setInterval(fetchTotalStaked, config.refreshInterval);
      return () => clearInterval(refreshBalance);
    }
  }, [isUnlocked, fetchTotalStaked, tombFinance]);

  return totalStaked;
};

export default useTotalStakedOnMasonry;
