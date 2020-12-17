import { VideoFactory } from 'boclips-api-client/dist/test-support/VideosFactory';
import { render } from '@testing-library/react';
import React from 'react';
import { VideoCardWrapper } from 'src/components/videoCard/VideoCardWrapper';
import { PlaybackFactory } from 'boclips-api-client/dist/test-support/PlaybackFactory';

describe('Video card', () => {
  it('displays all the given information on a video card', () => {
    const video = VideoFactory.sample({
      title: 'hello i am a title',
      description: 'wow what a video hansen',
      types: [{ id: 0, name: 'Stock' }],
      ageRange: {
        min: 7,
        max: 9,
      },
      releasedOn: new Date('2019-03-20'),
      createdBy: 'BFI',
      subjects: [
        {
          id: '123',
          name: 'geography',
        },
      ],
      playback: PlaybackFactory.sample({
        type: 'YOUTUBE',
      }),
      price: {
        amount: 100,
        currency: 'USD',
        displayValue: '$ 100',
      },
    });

    const wrapper = render(<VideoCardWrapper video={video} />);

    expect(wrapper.getByText('hello i am a title')).toBeVisible();
    expect(wrapper.getByText('wow what a video hansen')).toBeVisible();
    expect(wrapper.getByText('Released on Mar 20, 2019')).toBeVisible();
    expect(wrapper.getByText('by BFI')).toBeVisible();
    expect(wrapper.getByText('geography')).toBeVisible();
    expect(wrapper.getByText('Ages 7-9')).toBeVisible();
    expect(wrapper.getByText('$ 100')).toBeVisible();
  });
});
