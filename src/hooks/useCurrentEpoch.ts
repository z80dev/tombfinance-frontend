import { useCallback, useEffect, useState } from 'react';
import useTombFinance from './useTombFinance';
import config from '../config';
import { BigNumber } from 'ethers';

const useCurrentEpoch = () => {
  const [currentEpoch, setCurrentEpoch] = useState<BigNumber>(BigNumber.from(0));
  const tombFinance = useTombFinance();

  const fetchCurrentEpoch = useCallback(async () => {
    setCurrentEpoch(await tombFinance.getCurrentEpoch());
  }, [tombFinance]);

  useEffect(() => {
    fetchCurrentEpoch().catch((err) => console.error(`Failed to fetch TOMB price: ${err.stack}`));
    const refreshInterval = setInterval(fetchCurrentEpoch, config.refreshInterval);
    return () => clearInterval(refreshInterval);
  }, [setCurrentEpoch, tombFinance, fetchCurrentEpoch]);

  return currentEpoch;
};

export default useCurrentEpoch;
