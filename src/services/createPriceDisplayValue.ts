import { CurrencyCode, currencyFormat } from 'simple-currency-format';

export const createPriceDisplayValue = (
  amount?: number,
  currency?: string,
): string => {
  if (!amount || !currency) {
    return null;
  }

  const isDecimal = amount % 1 !== 0;
  return currencyFormat(
    amount,
    'en-US',
    currency as CurrencyCode,
    isDecimal ? 2 : 0,
  );
};
