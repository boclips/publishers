import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from 'src/App';
import React from 'react';
import { VideoFactory } from 'boclips-api-client/dist/test-support/VideosFactory';

import {
  FakeBoclipsClient,
  SubjectFactory,
} from 'boclips-api-client/dist/test-support';
import { Constants } from 'src/AppConstants';
import { UserFactory } from 'boclips-api-client/dist/test-support/UserFactory';
import { Helmet } from 'react-helmet';

describe('Video View', () => {
  it('on video page video details are rendered', async () => {
    const fakeClient = new FakeBoclipsClient();

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
        amount: 600,
      },
    });

    fakeClient.videos.insertVideo(video);

    const wrapper = render(
      <MemoryRouter initialEntries={['/videos/video-id']}>
        <App apiClient={fakeClient} />
      </MemoryRouter>,
    );

    expect(await wrapper.findByText('ID: video-id')).toBeVisible();
    expect(
      await wrapper.findByText('the coolest video you ever did see'),
    ).toBeVisible();
    expect(await wrapper.findByText('this is so cool')).toBeVisible();
    expect(
      await wrapper.findByText('This is an agreed price for your organization'),
    ).toBeVisible();
    expect(await wrapper.findByText('Ages 10-14')).toBeVisible();
    expect(await wrapper.findByText('history')).toBeVisible();
    expect(await wrapper.findByText('cool videos r us')).toBeVisible();
    expect(
      await wrapper.findByText('Released on Dec 17, 2015 by'),
    ).toBeVisible();
    expect(wrapper.getByRole('button', { name: 'Copy link' })).toBeVisible();
    expect(await wrapper.findByText('Additional services')).toBeVisible();
  });

  it('copy to clipboard button is visible in the page', async () => {
    const fakeClient = new FakeBoclipsClient();

    const video = VideoFactory.sample({
      id: 'video-id',
    });

    fakeClient.videos.insertVideo(video);
    fakeClient.users.insertCurrentUser(
      UserFactory.sample({ id: 'referringUserId' }),
    );

    const wrapper = render(
      <MemoryRouter initialEntries={['/videos/video-id']}>
        <App apiClient={fakeClient} />
      </MemoryRouter>,
    );
    const button = await wrapper.findByRole('button', { name: 'Copy link' });

    const copyMock = button.closest(
      `[data-qa="${Constants.HOST}/videos/video-id?referer=referringUserId"]`,
    );
    expect(copyMock).toBeVisible();
  });

  describe('window titles', () => {
    it(`displays video title as window title`, async () => {
      const video = VideoFactory.sample({
        id: 'video-1',
        title: 'the coolest video you ever did see',
      });

      const fakeClient = new FakeBoclipsClient();
      fakeClient.videos.insertVideo(video);

      const wrapper = render(
        <MemoryRouter initialEntries={['/videos/video-1']}>
          <App apiClient={fakeClient} />
        </MemoryRouter>,
      );

      expect(
        await wrapper.findByText('the coolest video you ever did see'),
      ).toBeVisible();

      const helmet = Helmet.peek();
      expect(helmet.title).toEqual('the coolest video you ever did see');
    });

    it('displays default window title when no video available', () => {
      render(
        <MemoryRouter initialEntries={['/videos/video-2']}>
          <App apiClient={new FakeBoclipsClient()} />
        </MemoryRouter>,
      );

      const helmet = Helmet.peek();
      expect(helmet.title).toEqual('Boclips');
    });
  });
});
