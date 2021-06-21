import { useCallback, useEffect, useState } from 'react';
import useTombFinance from './useTombFinance';
import { LPStat } from '../tomb-finance/types';
import config from '../config';

const useLpStats = (lpTicker: string) => {
  const [stat, setStat] = useState<LPStat>();
  const tombFinance = useTombFinance();

  const fetchCashPrice = useCallback(async () => {
    setStat(await tombFinance.getLPStat(lpTicker));
  }, [tombFinance, lpTicker]);

  useEffect(() => {
    fetchCashPrice().catch((err) => console.error(`Failed to fetch TOMB price: ${err.stack}`));
    const refreshInterval = setInterval(fetchCashPrice, config.refreshInterval);
    return () => clearInterval(refreshInterval);
  }, [setStat, tombFinance, fetchCashPrice]);

  return stat;
};

export default useLpStats;
