import { currencyFormat } from 'simple-currency-format';

export const createPriceDisplayValue = (
  amount?: number,
  currency?: any,
  language?: any,
): string => {
  if (!amount || !currency) {
    return null;
  }
  const isDecimal = amount % 1 !== 0;
  return currencyFormat(
    amount,
    language || 'en-US',
    currency,
    isDecimal ? 2 : 0,
  );
};
