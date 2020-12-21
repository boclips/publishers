import { fireEvent, render, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from 'src/components/layout/Navbar';
import React from 'react';
import { FakeUsersClient } from 'boclips-api-client/dist/sub-clients/users/client/FakeUsersClient';
import { FakeApiClient } from 'src/testSupport/fakeApiClient';

describe('account button', () => {
  let userClient: FakeUsersClient = null;

  beforeAll(async () => {
    userClient = (await FakeApiClient).users;
  });

  it('opens the tooltip when clicked and close the tooltip when clicked on the body', async () => {
    const user = {
      id: '123',
      firstName: 'Eddie',
      lastName: 'Bravo',
      email: 'eddie@10thplanetjj.com',
      features: {
        LTI_COPY_RESOURCE_LINK: true,
      },
      organisation: {
        id: '321',
        name: '10th planet jj',
      },
    };

    userClient.insertCurrentUser(user);

    const navbar = render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    );

    expect(navbar.getByText('Account')).toBeInTheDocument();

    fireEvent.click(navbar.getByText('Account'));

    await waitFor(() => {
      expect(navbar.getByText('Eddie Bravo')).toBeInTheDocument();
      expect(navbar.getByText('eddie@10thplanetjj.com')).toBeInTheDocument();
      expect(navbar.getByText('Your orders')).toBeInTheDocument();
      expect(navbar.getByText('Log out')).toBeInTheDocument();
    });
  });
});
