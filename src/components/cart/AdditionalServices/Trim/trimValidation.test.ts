import { isTrimFromValid, isTrimToValid } from './trimValidation';

describe('Trim validation', () => {
  describe('From validation', () => {
    it('is invalid when to and from is at 00:00', () => {
      expect(isTrimFromValid({ to: '00:00', from: '00:00' })).toBeFalsy();
    });

    it('is valid when to is 00:00 and from is bigger ', () => {
      expect(isTrimFromValid({ to: '00:00', from: '1:00' })).toBeTruthy();
    });
  });

  describe('To validation', () => {
    it('is invalid when from is at 00:00', () => {
      expect(isTrimToValid({ to: '10:00', from: '00:00' })).toBeFalsy();
    });

    it('is valid when from is greater than 00:00', () => {
      expect(isTrimToValid({ to: '00:00', from: '1:00' })).toBeFalsy();
    });
  });
});
