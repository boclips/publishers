import { render } from '@testing-library/react';
import React from 'react';
import { PageLayout } from './PageLayout';

describe('PageLayout', () => {
  it('renders a navbar, footer by default', () => {
    const page = render(<PageLayout />);

    expect(
      page.getByRole('navigation', { name: 'Bolcips navigation bar' }),
    ).toBeVisible();

    expect(
      page.getByText(
        'All trademarks, service marks, trade names, product names and logos appearing on the site are the property of their respective owners. Any rights not expressly granted herein are reserved.',
      ),
    ).toBeVisible();
  });

  it('renders the child component', () => {
    const page = render(
      <PageLayout>
        <div>Hello World</div>
      </PageLayout>,
    );

    expect(page.getByText('Hello World')).toBeVisible();
  });

  it('can override the default navbar with a custom one', () => {
    const page = render(
      <PageLayout navBar={<div>This is a navbar</div>}>
        <div>Hello World</div>
      </PageLayout>,
    );

    expect(page.getByText('This is a navbar')).toBeVisible();
    expect(
      page.queryByRole('navigation', { name: 'Bolcips navigation bar' }),
    ).not.toBeInTheDocument();
  });
});
