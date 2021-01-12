import { getPriceDisplayValue } from 'src/services/getPriceDisplayValue';

describe('get price display value', () => {
  it('converts 600 USD', () => {
    expect(getPriceDisplayValue(600, 'USD')).toEqual('$600.00');
  });
  it('converts 300.5 GBP', () => {
    expect(getPriceDisplayValue(300.5, 'GBP')).toEqual('£300.50');
  });
  it('returns null if nothing is passed in', () => {
    expect(getPriceDisplayValue()).toBeNull();
  });
});
