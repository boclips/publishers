import { fireEvent } from '@testing-library/react';
import { FakeBoclipsClient } from 'boclips-api-client/dist/test-support';
import React from 'react';
import { render } from 'src/testSupport/render';
import { AnalyticsService } from 'src/services/analytics/AnalyticsService';
import AppcuesProvider from 'src/services/analytics/AppcuesProvider';
import { analyticsMock } from 'src/services/analytics/AnalyticsServiceMock';
import SearchHero from './SearchHero';
import { BoclipsClientProvider } from '../common/BoclipsClientProvider';

describe('SearchHero', () => {
  it('renders a search input and a button', () => {
    const wrapper = render(
      <BoclipsClientProvider client={new FakeBoclipsClient()}>
        <SearchHero />
      </BoclipsClientProvider>,
    );

    expect(
      wrapper.getByRole('button', { name: /search/i }),
    ).toBeInTheDocument();

    expect(
      wrapper.getByRole('combobox', { name: /search/i }),
    ).toBeInTheDocument();
  });

  it('can take user input', () => {
    const wrapper = render(
      <BoclipsClientProvider client={new FakeBoclipsClient()}>
        <SearchHero />
      </BoclipsClientProvider>,
    );

    const searchBar = wrapper.getByRole('combobox', {
      name: /search/i,
    }) as HTMLInputElement;

    fireEvent.change(searchBar, { target: { value: 'help' } });
    expect(searchBar.value).toEqual('help');
  });

  xit(`sends a search event on search`, () => {
    AppcuesProvider.getAppcues = jest.fn(
      () => new AnalyticsService(analyticsMock),
    );

    const wrapper = render(
      <BoclipsClientProvider client={new FakeBoclipsClient()}>
        <SearchHero />
      </BoclipsClientProvider>,
    );

    const searchBar = wrapper.getByRole('button', { name: /search/i });
    fireEvent.change(searchBar, { target: { value: 'help' } });
    fireEvent.click(searchBar);

    expect(analyticsMock.track).toHaveBeenCalled();
  });
});
