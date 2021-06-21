import { useCallback, useEffect, useState } from 'react';
import useTombFinance from './../useTombFinance';
import config from '../../config';

const useClaimRewardCheck = () => {
  const [canClaimReward, setCanClaimReward] = useState(false);
  const tombFinance = useTombFinance();
  const isUnlocked = tombFinance?.isUnlocked;

  const canUserClaimReward = useCallback(async () => {
    setCanClaimReward(await tombFinance.canUserClaimRewardFromMasonry());
  }, [tombFinance]);

  useEffect(() => {
    if (isUnlocked) {
      canUserClaimReward().catch((err) => console.error(err.stack));

      const checkButton = setInterval(canUserClaimReward, config.refreshInterval);
      return () => clearInterval(checkButton);
    }
  }, [isUnlocked, canUserClaimReward, tombFinance]);

  return canClaimReward;
};

export default useClaimRewardCheck;
