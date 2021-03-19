import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from 'src/App';
import { FakeBoclipsClient } from 'boclips-api-client/dist/test-support';
import { stubBoclipsSecurity } from 'src/testSupport/StubBoclipsSecurity';
import React from 'react';

describe('NotFoundView', () => {
  it('shows not found if route is unknown', async () => {
    const wrapper = render(
      <MemoryRouter initialEntries={['/randompath']}>
        <App
          apiClient={new FakeBoclipsClient()}
          boclipsSecurity={stubBoclipsSecurity}
        />
      </MemoryRouter>,
    );

    expect(await wrapper.findByText('Page not found!')).toBeVisible();
    expect(
      wrapper.getByRole('button', { name: 'Contact Support' }),
    ).toBeVisible();
  });
});
