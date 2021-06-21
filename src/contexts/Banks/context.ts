import { createContext } from 'react';
import { Bank } from '../../tomb-finance';

export interface BanksContext {
  banks: Bank[];
}

const context = createContext<BanksContext>({
  banks: [],
});

export default context;
