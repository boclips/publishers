import { render } from '@testing-library/react';
import React from 'react';
import { FakeBoclipsClient } from 'boclips-api-client/dist/test-support';
import { BoclipsClientProvider } from 'src/components/common/BoclipsClientProvider';
import { QueryClient, QueryClientProvider } from 'react-query';
import { OrderItemPreviewAdditionalServices } from 'src/components/cart/CartItemOrderPreview/OrderItemPreviewAdditionalServices';

describe('Order item preview', () => {
  it('displays no additional services when non is selected', async () => {
    const fakeClient = new FakeBoclipsClient();
    const client = new QueryClient();

    const cartItem = {
      id: 'cart-item-id',
      videoId: 'video-id',
      additionalServices: {
        trim: null,
        transcriptRequested: false,
        captionsRequested: false,
      },
      links: {
        self: null,
        additionalServices: null,
      },
    };

    const wrapper = render(
      <BoclipsClientProvider client={fakeClient}>
        <QueryClientProvider client={client}>
          <OrderItemPreviewAdditionalServices cartItem={cartItem} />
        </QueryClientProvider>
      </BoclipsClientProvider>,
    );

    expect(
      wrapper.getByText('No additional services selected'),
    ).toBeInTheDocument();
  });

  it('displays all additional services with prices', async () => {
    const fakeClient = new FakeBoclipsClient();
    const client = new QueryClient();

    const cartItem = {
      id: 'cart-item-id',
      videoId: 'video-id',
      additionalServices: {
        trim: { from: '00:00', to: '02:02' },
        transcriptRequested: true,
        captionsRequested: true,
      },
      links: {
        self: null,
        additionalServices: null,
      },
    };

    const wrapper = render(
      <BoclipsClientProvider client={fakeClient}>
        <QueryClientProvider client={client}>
          <OrderItemPreviewAdditionalServices cartItem={cartItem} />
        </QueryClientProvider>
      </BoclipsClientProvider>,
    );

    expect(wrapper.getByText('Trimming: 00:00 - 02:02')).toBeInTheDocument();
    expect(
      wrapper.getByText('Trimming: 00:00 - 02:02').parentElement.nextSibling
        .textContent,
    ).toEqual('Free');
    expect(wrapper.getByText('Requested transcripts')).toBeInTheDocument();
    expect(
      wrapper.getByText('Requested transcripts').parentElement.nextSibling
        .textContent,
    ).toEqual('Free');
    expect(wrapper.getByText('Captions: English')).toBeInTheDocument();
    expect(
      wrapper.getByText('Captions: English').parentElement.nextSibling
        .textContent,
    ).toEqual('Free');
  });

  it('displays only selected additional services', async () => {
    const fakeClient = new FakeBoclipsClient();
    const client = new QueryClient();

    const cartItem = {
      id: 'cart-item-id',
      videoId: 'video-id',
      additionalServices: {
        trim: { from: '00:00', to: '02:02' },
        transcriptRequested: false,
        captionsRequested: true,
      },
      links: {
        self: null,
        additionalServices: null,
      },
    };

    await fakeClient.carts.addItemToCart(cartItem, 'video-id');

    const wrapper = render(
      <BoclipsClientProvider client={fakeClient}>
        <QueryClientProvider client={client}>
          <OrderItemPreviewAdditionalServices cartItem={cartItem} />
        </QueryClientProvider>
      </BoclipsClientProvider>,
    );

    expect(wrapper.getByText('Trimming: 00:00 - 02:02')).toBeInTheDocument();
    expect(
      wrapper.queryByText('Requested transcripts'),
    ).not.toBeInTheDocument();
    expect(wrapper.getByText('Captions: English')).toBeInTheDocument();
  });
});
