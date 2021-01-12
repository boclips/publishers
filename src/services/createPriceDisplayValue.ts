export const createPriceDisplayValue = (amount?: number, currency?: string) => {
  if (!amount || !currency) {
    return null;
  }
  const language = navigator.language;
  return Intl.NumberFormat(language, {
    style: 'currency',
    currency,
  }).format(amount);
};
