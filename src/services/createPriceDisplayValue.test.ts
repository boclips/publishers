import { createPriceDisplayValue } from './createPriceDisplayValue';

describe('get price display value', () => {
  it('returns null if nothing is passed in', () => {
    expect(createPriceDisplayValue()).toBeNull();
  });
  describe('US Browser', () => {
    it('converts 300.5 GBP', () => {
      expect(createPriceDisplayValue(300.5, 'GBP', 'en-US')).toEqual('£300.50');
    });
    it('converts 300.5 USD', () => {
      expect(createPriceDisplayValue(300.5, 'USD', 'en-US')).toEqual('$300.50');
    });
    it('converts 300.5 EUR', () => {
      expect(createPriceDisplayValue(300.5, 'EUR', 'en-US')).toEqual('€300.50');
    });
  });
  describe('UK Browser', () => {
    it('converts 300.5 GBP', () => {
      expect(createPriceDisplayValue(300.5, 'GBP', 'en-GB')).toEqual('£300.50');
    });
    it('converts 300.5 USD', () => {
      expect(createPriceDisplayValue(300.5, 'USD', 'en-GB')).toEqual('$300.50');
    });
    it('converts 300.5 EUR', () => {
      expect(createPriceDisplayValue(300.5, 'EUR', 'en-GB')).toEqual('€300.50');
    });
  });
  describe('German Browser', () => {
    it('converts 300.5 GBP', () => {
      expect(createPriceDisplayValue(300.5, 'GBP', 'de-DE')).toEqual(
        '300,50 £',
      );
    });
    it('converts 300.5 USD', () => {
      expect(createPriceDisplayValue(300.5, 'USD', 'de-DE')).toEqual(
        '300,50 $',
      );
    });
    it('converts 300.5 EUR', () => {
      expect(createPriceDisplayValue(300.5, 'EUR', 'de-DE')).toEqual(
        '300,50 €',
      );
    });
  });
});
