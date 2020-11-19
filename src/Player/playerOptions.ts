import { PlayerOptions } from 'boclips-player';

const playerOptions: Partial<PlayerOptions> = {
  interface: {
    controls: [
      'play-large',
      'play',
      'progress',
      'current-time',
      'mute',
      'volume',
      'captions',
      'fullscreen',
      'settings',
    ],
    ratio: '16:9',
  },
};

export default playerOptions;
