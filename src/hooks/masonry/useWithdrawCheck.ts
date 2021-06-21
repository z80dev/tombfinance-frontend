import { useCallback, useEffect, useState } from 'react';
import useTombFinance from './../useTombFinance';
import config from '../../config';

const useWithdrawCheck = () => {
  const [canWithdraw, setCanWithdraw] = useState(false);
  const tombFinance = useTombFinance();
  const isUnlocked = tombFinance?.isUnlocked;

  const canUserWithdraw = useCallback(async () => {
    setCanWithdraw(await tombFinance.canUserUnstakeFromMasonry());
  }, [tombFinance]);

  useEffect(() => {
    if (isUnlocked) {
      canUserWithdraw().catch((err) => console.error(err.stack));

      const checkButton = setInterval(canUserWithdraw, config.refreshInterval);
      return () => clearInterval(checkButton);
    }
  }, [isUnlocked, canUserWithdraw, tombFinance]);

  return canWithdraw;
};

export default useWithdrawCheck;
