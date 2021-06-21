import { useEffect, useState } from 'react';
import { BigNumber } from 'ethers';
import useTombFinance from './useTombFinance';

const useTreasuryAmount = () => {
  const [amount, setAmount] = useState(BigNumber.from(0));
  const tombFinance = useTombFinance();

  useEffect(() => {
    if (tombFinance) {
      const { Treasury } = tombFinance.contracts;
      tombFinance.TOMB.balanceOf(Treasury.address).then(setAmount);
    }
  }, [tombFinance]);
  return amount;
};

export default useTreasuryAmount;
