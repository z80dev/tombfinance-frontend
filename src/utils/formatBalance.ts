import { BigNumber } from 'ethers';

export const getDisplayBalance = (
  balance: BigNumber,
  decimals = 18,
  fractionDigits = 4,
  isTruncated: boolean = false,
) => {
  if (decimals === 0) {
    fractionDigits = 0;
  }
  const number = getBalance(balance, decimals - fractionDigits);
  const ret = (number / 10 ** fractionDigits).toFixed(fractionDigits);
  if (ret.length > 12 && isTruncated) {
    return ret.slice(0, 12) + '...';
  }
  return ret;
};

export const getFullDisplayBalance = (balance: BigNumber, decimals = 18, isTruncated = false) => {
  return getDisplayBalance(balance, decimals, 4, isTruncated);
};

export function getBalance(balance: BigNumber, decimals = 18): number {
  return Number(balance.div(BigNumber.from(10).pow(decimals)));
}
