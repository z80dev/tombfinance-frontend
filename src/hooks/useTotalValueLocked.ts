import { useCallback, useEffect, useState } from 'react';
import useTombFinance from './useTombFinance';
import config from '../config';
const useTotalValueLocked = () => {
  const [totalValueLocked, setTotalValueLocked] = useState<Number>(0);
  const tombFinance = useTombFinance();

  const fetchTVL = useCallback(async () => {
    setTotalValueLocked(await tombFinance.getTotalValueLocked());
  }, [tombFinance]);

  useEffect(() => {
    fetchTVL().catch((err) => console.error(`Failed to fetch Total value locked: ${err.stack}`));
    const refreshInterval = setInterval(fetchTVL, config.refreshInterval);
    return () => clearInterval(refreshInterval);
  }, [setTotalValueLocked, tombFinance, fetchTVL]);

  return totalValueLocked;
};

export default useTotalValueLocked;
