import { render } from '@testing-library/react';
import React from 'react';
import HomeView from './HomeView';

describe('HomeView', () => {
  it('loads the home view text', () => {
    const wrapper = render(<HomeView />);

    expect(
      wrapper.getByText('What video do you need today?'),
    ).toBeInTheDocument();
  });
});
