import { VideoFactory } from 'boclips-api-client/dist/test-support/VideosFactory';
import { PlaybackFactory } from 'boclips-api-client/dist/test-support/PlaybackFactory';
import dayjs from '../../../../day-js/index';
import { isTrimFromValid, isTrimToValid } from './trimValidation';

describe('Trim validation', () => {
  const video = VideoFactory.sample({
    // @ts-ignore
    playback: PlaybackFactory.sample({ duration: dayjs.duration('PT1M10S') }),
  });

  describe('From validation', () => {
    it('is invalid when to and from are the same', () => {
      expect(isTrimFromValid({ from: '1:00', to: '1:00' }, video)).toBeFalsy();
    });

    it('is invalid when from is greater than to', () => {
      expect(isTrimFromValid({ to: '00:00', from: '1:00' }, video)).toBeFalsy();
    });

    it('is invalid when full video length is chosen', () => {
      expect(isTrimFromValid({ from: '00:00', to: '1:10' }, video)).toBeFalsy();
    });

    it('is invalid when from is null', () => {
      expect(isTrimFromValid({ from: null, to: '1:10' }, video)).toBeFalsy();
    });

    it('is valid when to is null', () => {
      expect(isTrimFromValid({ from: '1:00', to: null }, video)).toBeTruthy();
    });

    it('is valid when "to" value is greater than video length', () => {
      expect(
        isTrimFromValid({ from: '00:00', to: '1:20' }, video),
      ).toBeTruthy();
    });
  });

  describe('To validation', () => {
    it('is invalid when to and from are the same', () => {
      expect(isTrimToValid({ from: '1:00', to: '1:00' }, video)).toBeFalsy();
    });

    it('is invalid when from is greater than to', () => {
      expect(isTrimToValid({ from: '1:00', to: '00:00' }, video)).toBeFalsy();
    });

    it('is invalid when full video length is chosen', () => {
      expect(isTrimToValid({ from: '00:00', to: '1:10' }, video)).toBeFalsy();
    });

    it('is valid when from is null', () => {
      expect(isTrimToValid({ from: null, to: '1:10' }, video)).toBeTruthy();
    });

    it('is invalid when to is null', () => {
      expect(isTrimToValid({ from: '1:00', to: null }, video)).toBeFalsy();
    });

    it('is invalid when value is greater than video length', () => {
      expect(isTrimToValid({ from: '00:00', to: '1:20' }, video)).toBeFalsy();
    });
  });
});
