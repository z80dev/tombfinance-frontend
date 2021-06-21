import React, { createContext, useEffect, useState } from 'react';
import { useWallet } from 'use-wallet';
import TombFinance from '../../tomb-finance';
import config from '../../config';

export interface TombFinanceContext {
  tombFinance?: TombFinance;
}

export const Context = createContext<TombFinanceContext>({ tombFinance: null });

export const TombFinanceProvider: React.FC = ({ children }) => {
  const { ethereum, account } = useWallet();
  const [tombFinance, setTombFinance] = useState<TombFinance>();

  useEffect(() => {
    if (!tombFinance) {
      const tomb = new TombFinance(config);
      if (account) {
        // wallet was unlocked at initialization
        tomb.unlockWallet(ethereum, account);
      }
      setTombFinance(tomb);
    } else if (account) {
      tombFinance.unlockWallet(ethereum, account);
    }
  }, [account, ethereum, tombFinance]);

  return <Context.Provider value={{ tombFinance }}>{children}</Context.Provider>;
};
