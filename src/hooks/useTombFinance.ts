import { useContext } from 'react';
import { Context } from '../contexts/TombFinanceProvider';

const useTombFinance = () => {
  const { tombFinance } = useContext(Context);
  return tombFinance;
};

export default useTombFinance;
