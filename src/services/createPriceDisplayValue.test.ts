import { createPriceDisplayValue } from './createPriceDisplayValue';

describe('get price display value', () => {
  it('converts 600 USD', () => {
    expect(createPriceDisplayValue(600, 'USD')).toEqual('$600.00');
  });
  it('converts 300.5 GBP', () => {
    expect(createPriceDisplayValue(300.5, 'GBP')).toEqual('£300.50');
  });
  it('returns null if nothing is passed in', () => {
    expect(createPriceDisplayValue()).toBeNull();
  });
});
