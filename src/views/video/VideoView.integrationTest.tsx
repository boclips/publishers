import { fireEvent, render, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from 'src/App';
import React from 'react';
import { FakeVideosClient } from 'boclips-api-client/dist/sub-clients/videos/client/FakeVideosClient';
import { FakeApiClient } from 'src/testSupport/fakeApiClient';
import { VideoFactory } from 'boclips-api-client/dist/test-support/VideosFactory';
import { SubjectFactory } from 'boclips-api-client/dist/test-support';

describe('Video View', () => {
  let videosClient: FakeVideosClient = null;
  beforeEach(async () => {
    videosClient = (await FakeApiClient).videos;
    videosClient.clear();
  });

  it('on video page video details are rendered', async () => {
    const subject = SubjectFactory.sample({
      name: 'history',
    });

    const video = VideoFactory.sample({
      id: 'video-id',
      title: 'the coolest video you ever did see',
      description: 'this is so cool',
      subjects: [subject],
      ageRange: {
        min: 10,
        max: 14,
        label: '10 - 14',
      },
      releasedOn: new Date('2015-12-17'),
      createdBy: 'cool videos r us',
      price: {
        currency: 'USD',
        amount: 600.5,
        displayValue: '$600',
      },
    });

    videosClient.insertVideo(video);

    const wrapper = render(
      <MemoryRouter initialEntries={['/videos/video-id']}>
        <App />
      </MemoryRouter>,
    );

    expect(await wrapper.findByText('ID: video-id')).toBeVisible();
    expect(
      await wrapper.findByText('the coolest video you ever did see'),
    ).toBeVisible();
    expect(await wrapper.findByText('this is so cool')).toBeVisible();
    expect(await wrapper.findByText('Ages 10-14')).toBeVisible();
    expect(await wrapper.findByText('$600.50')).toBeVisible();
    expect(await wrapper.findByText('history')).toBeVisible();
    expect(await wrapper.findByText('cool videos r us')).toBeVisible();
    expect(
      await wrapper.findByText('Released on Dec 17, 2015 by'),
    ).toBeVisible();
  });

  it(`directs to video results page when back to search results is clicked`, async () => {
    const video = VideoFactory.sample({
      id: 'video-id',
      title: 'news video',
      types: [{ name: 'NEWS', id: 2 }],
    });

    videosClient.insertVideo(video);

    const wrapper = render(
      <MemoryRouter initialEntries={['/videos/video-id']}>
        <App />
      </MemoryRouter>,
    );

    fireEvent.click(await wrapper.findByText('Back to search results'));

    waitFor(async () => {
      expect(await wrapper.findByTestId('video-card-wrapper')).toBeVisible();
    });
  });
});
