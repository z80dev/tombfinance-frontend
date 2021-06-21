import { useCallback, useEffect, useState } from 'react';
import useTombFinance from './useTombFinance';
import { TokenStat } from '../tomb-finance/types';
import config from '../config';

const useBondStats = () => {
  const [stat, setStat] = useState<TokenStat>();
  const tombFinance = useTombFinance();

  const fetchBondPrice = useCallback(async () => {
    setStat(await tombFinance.getBondStat());
  }, [tombFinance]);

  useEffect(() => {
    fetchBondPrice().catch((err) => console.error(`Failed to fetch TBOND price: ${err.stack}`));
    const refreshInterval = setInterval(fetchBondPrice, config.refreshInterval);
    return () => clearInterval(refreshInterval);
  }, [setStat, tombFinance, fetchBondPrice]);

  return stat;
};

export default useBondStats;
