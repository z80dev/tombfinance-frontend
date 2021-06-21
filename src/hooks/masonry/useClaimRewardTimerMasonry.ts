import { useEffect, useState } from 'react';
import useTombFinance from '../useTombFinance';
import { AllocationTime } from '../../tomb-finance/types';

const useClaimRewardTimerMasonry = () => {
  const [time, setTime] = useState<AllocationTime>({
    from: new Date(),
    to: new Date(),
  });
  const tombFinance = useTombFinance();

  useEffect(() => {
    if (tombFinance) {
      tombFinance.getUserClaimRewardTime().then(setTime);
    }
  }, [tombFinance]);
  return time;
};

export default useClaimRewardTimerMasonry;
