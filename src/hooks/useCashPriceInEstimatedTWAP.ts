import { useCallback, useEffect, useState } from 'react';
import useTombFinance from './useTombFinance';
import { TokenStat } from '../tomb-finance/types';
import config from '../config';

const useCashPriceInEstimatedTWAP = () => {
  const [stat, setStat] = useState<TokenStat>();
  const tombFinance = useTombFinance();

  const fetchCashPrice = useCallback(async () => {
    setStat(await tombFinance.getTombStatInEstimatedTWAP());
  }, [tombFinance]);

  useEffect(() => {
    fetchCashPrice().catch((err) => console.error(`Failed to fetch TOMB price: ${err.stack}`));
    const refreshInterval = setInterval(fetchCashPrice, config.refreshInterval);
    return () => clearInterval(refreshInterval);
  }, [setStat, tombFinance, fetchCashPrice]);

  return stat;
};

export default useCashPriceInEstimatedTWAP;
