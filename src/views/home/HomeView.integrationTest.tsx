import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import App from 'src/App';
import { VideoFactory } from 'boclips-api-client/dist/test-support/VideosFactory';
import { FakeApiClient } from 'src/testSupport/fakeApiClient';

describe('HomeView', () => {
  it('loads the home view text', async () => {
    const wrapper = render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    );

    expect(
      await wrapper.findByText('What videos do you need today?'),
    ).toBeInTheDocument();
  });

  describe('Navigating to search', () => {
    beforeEach(async () => {
      const fakeVideosClient = (await FakeApiClient).videos;
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
          <App />
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
          <App />
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
