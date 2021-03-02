import { fireEvent, render, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from 'src/App';
import React from 'react';
import { VideoFactory } from 'boclips-api-client/dist/test-support/VideosFactory';

import {
  FakeBoclipsClient,
  SubjectFactory,
} from 'boclips-api-client/dist/test-support';
import { Helmet } from 'react-helmet';
import { CartItemFactory } from 'boclips-api-client/dist/test-support/CartsFactory';

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

    const wrapper = render(
      <MemoryRouter initialEntries={['/videos/video-id']}>
        <App apiClient={fakeClient} />
      </MemoryRouter>,
    );

    const button = await wrapper.findByRole('button', { name: 'Copy link' });

    expect(button).toBeInTheDocument();
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
  describe('back button', () => {
    it('does not render back button if user navigates directly to page', async () => {
      const video = VideoFactory.sample({
        id: 'video-3',
        title: 'the coolest video you ever did see',
      });

      const fakeClient = new FakeBoclipsClient();
      fakeClient.videos.insertVideo(video);

      const wrapper = render(
        <MemoryRouter initialEntries={['/videos/video-3']}>
          <App apiClient={fakeClient} />
        </MemoryRouter>,
      );
      expect(wrapper.queryByText('Back')).not.toBeInTheDocument();
    });

    it('navigates back to previous page', async () => {
      const video = VideoFactory.sample({
        id: 'video-4',
        title: 'the coolest video you ever did see',
      });

      const cartItem = CartItemFactory.sample({
        videoId: 'video-4',
      });

      const fakeClient = new FakeBoclipsClient();
      fakeClient.videos.insertVideo(video);
      fakeClient.carts.insertCartItem(cartItem);

      const wrapper = render(
        <MemoryRouter initialEntries={['/cart']}>
          <App apiClient={fakeClient} />
        </MemoryRouter>,
      );

      const title = await wrapper.findByText(
        'the coolest video you ever did see',
      );

      fireEvent.click(title);

      await waitFor(async () => {
        expect(wrapper.getByText('Back')).toBeVisible();
        expect(wrapper.queryByText('Shopping cart')).not.toBeInTheDocument();
      });

      const backButton = await wrapper.findByText('Back');

      fireEvent.click(backButton);

      await waitFor(async () =>
        expect(wrapper.getByText('Shopping cart')).toBeVisible(),
      );
    });
  });
});
