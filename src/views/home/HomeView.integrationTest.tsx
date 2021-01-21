import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import App from 'src/App';
import { VideoFactory } from 'boclips-api-client/dist/test-support/VideosFactory';
import { FakeBoclipsClient } from 'boclips-api-client/dist/test-support';

describe('HomeView', () => {
  it('loads the home view text', async () => {
    const wrapper = render(
      <MemoryRouter initialEntries={['/']}>
        <App apiClient={new FakeBoclipsClient()} />
      </MemoryRouter>,
    );

    expect(
      await wrapper.findByText('What videos do you need today?'),
    ).toBeInTheDocument();
  });

  describe('Navigating to search', () => {
    let fakeClient: FakeBoclipsClient = null;

    beforeEach(async () => {
      fakeClient = new FakeBoclipsClient();
      const fakeVideosClient = fakeClient.videos;
      fakeVideosClient.insertVideo(
        VideoFactory.sample({
          title: 'elephants',
          description: 'I am an elephant',
        }),
      );
    });

    it('goes to the search results page on enter', async () => {
      const wrapper = render(
        <MemoryRouter initialEntries={['/']}>
          <App apiClient={fakeClient} />
        </MemoryRouter>,
      );

      const searchBar = wrapper.getByRole('combobox', {
        name: /search/i,
      }) as HTMLInputElement;

      fireEvent.change(searchBar, { target: { value: 'elephant' } });
      fireEvent.keyDown(searchBar, { key: 'Enter', code: 'Enter' });

      expect(await wrapper.findByText('I am an elephant'));
    });

    it('goes to the search results page when clicking button', async () => {
      const wrapper = render(
        <MemoryRouter initialEntries={['/']}>
          <App apiClient={fakeClient} />
        </MemoryRouter>,
      );

      const searchBar = wrapper.getByRole('combobox', {
        name: /search/i,
      }) as HTMLInputElement;

      fireEvent.change(searchBar, { target: { value: 'elephant' } });
      fireEvent.click(wrapper.getByRole('button', { name: /search/i }));

      expect(await wrapper.findByText('I am an elephant'));
    });
  });
});
