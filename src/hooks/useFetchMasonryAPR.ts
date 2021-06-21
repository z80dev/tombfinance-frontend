import { useCallback, useEffect, useState } from 'react';
import useTombFinance from './useTombFinance';
import config from '../config';

const useFetchMasonryAPR = () => {
  const [apr, setApr] = useState<number>(0);
  const tombFinance = useTombFinance();

  const fetchMasonryPR = useCallback(async () => {
    setApr(await tombFinance.getMasonryAPR());
  }, [tombFinance]);

  useEffect(() => {
    fetchMasonryPR().catch((err) => console.error(`Failed to fetch masonry apr: ${err.stack}`));
    const refreshInterval = setInterval(fetchMasonryPR, config.refreshInterval);
    return () => clearInterval(refreshInterval);
  }, [setApr, tombFinance, fetchMasonryPR]);

  return apr;
};

export default useFetchMasonryAPR;
