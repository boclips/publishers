import { fireEvent, render, waitFor } from '@testing-library/react';
import React from 'react';
import CartItem from 'src/components/cart/CartItem/CartItem';
import { VideoFactory } from 'boclips-api-client/dist/test-support/VideosFactory';
import { FakeBoclipsClient } from 'boclips-api-client/dist/test-support';
import { stubBoclipsSecurity } from 'src/testSupport/StubBoclipsSecurity';
import { BoclipsClientProvider } from 'src/components/common/providers/BoclipsClientProvider';
import { BoclipsSecurityProvider } from 'src/components/common/providers/BoclipsSecurityProvider';
import { CartItemFactory } from 'boclips-api-client/dist/test-support/CartsFactory';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router } from 'react-router-dom';
import { CartValidationProvider } from 'src/components/common/providers/CartValidationProvider';

describe('CartItem', () => {
  let client: any;

  beforeEach(() => {
    client = new QueryClient();
  });

  function renderCartItem(
    cartItem: React.ReactNode,
    fakeClient: FakeBoclipsClient = new FakeBoclipsClient(),
  ) {
    return render(
      <Router>
        <BoclipsSecurityProvider boclipsSecurity={stubBoclipsSecurity}>
          <BoclipsClientProvider client={fakeClient}>
            <QueryClientProvider client={client}>
              <CartValidationProvider>{cartItem}</CartValidationProvider>
            </QueryClientProvider>
          </BoclipsClientProvider>
        </BoclipsSecurityProvider>
      </Router>,
    );
  }

  it('displays cart item with title and additional services', async () => {
    const cartItem = CartItemFactory.sample({
      id: 'cart-item-id-1',
      videoId: '123',
    });

    const video = VideoFactory.sample({
      id: '123',
      title: 'this is cart item test',
    });

    const wrapper = renderCartItem(
      <CartItem videoItem={video} cartItem={cartItem} />,
    );

    expect(
      await wrapper.findByText('this is cart item test'),
    ).toBeInTheDocument();
    expect(await wrapper.findByText('Additional services')).toBeInTheDocument();
    expect(await wrapper.findByText('Trim video')).toBeInTheDocument();
    expect(await wrapper.findByText('Request transcripts')).toBeInTheDocument();
    expect(
      await wrapper.findByText('Request other type of editing'),
    ).toBeInTheDocument();

    // queryBy doesn't throw and error when cannot be found
    expect(wrapper.queryByText(/From:/)).not.toBeInTheDocument();
    expect(wrapper.queryByText(/To:/)).not.toBeInTheDocument();
  });

  it('opens trim video options on when checkbox is checked', async () => {
    const cartItem = CartItemFactory.sample({
      id: 'cart-item-id-1',
      videoId: '123',
    });

    const video = VideoFactory.sample({
      id: '123',
      title: 'this is cart item test',
    });

    const wrapper = renderCartItem(
      <CartItem videoItem={video} cartItem={cartItem} />,
    );

    fireEvent.click(await wrapper.findByText('Trim video'));

    expect(wrapper.getByText(/From:/)).toBeInTheDocument();
    expect(wrapper.getByText(/To:/)).toBeInTheDocument();
  });

  it('saves the trim information on onBlur event', async () => {
    const video = VideoFactory.sample({
      id: 'test-video-id',
      title: 'this is cart item test',
    });

    const fakeClient = new FakeBoclipsClient();

    let cart = await fakeClient.carts.getCart();

    const cartItemFromCart = await fakeClient.carts.addItemToCart(
      cart,
      video.id,
    );

    const wrapper = renderCartItem(
      <CartItem videoItem={video} cartItem={cartItemFromCart} />,
      fakeClient,
    );

    fireEvent.click(await wrapper.findByText('Trim video'));

    fireEvent.change(await wrapper.findByLabelText('trim-from'), {
      target: { value: '2:00' },
    });

    fireEvent.change(await wrapper.findByLabelText('trim-to'), {
      target: { value: '3:00' },
    });

    fireEvent.blur(await wrapper.findByLabelText('trim-from'));

    cart = await fakeClient.carts.getCart();

    await waitFor(() => {
      expect(cart.items[0].additionalServices?.trim.from).toEqual('2:00');
      expect(cart.items[0].additionalServices?.trim.to).toEqual('3:00');
    });
  });

  it('displays the trim values if cart item has trim info specified', async () => {
    const video = VideoFactory.sample({
      id: '123',
      title: 'this is cart item test',
    });

    const cartItem = CartItemFactory.sample({
      id: 'cart-item-id-1',
      videoId: '123',
      additionalServices: {
        trim: {
          from: '01:21',
          to: '02:21',
        },
      },
    });

    const wrapper = renderCartItem(
      <CartItem videoItem={video} cartItem={cartItem} />,
    );

    expect(wrapper.getByLabelText('From:').closest('input').value).toEqual(
      '01:21',
    );

    expect(wrapper.getByLabelText('To:').closest('input').value).toEqual(
      '02:21',
    );
  });

  it('sets trim to null when trim checkbox is unset', async () => {
    const video = VideoFactory.sample({
      id: 'trim-null-id-1',
      title: 'this is cart item test',
    });

    const cartItem = CartItemFactory.sample({
      id: 'cart-item-id-1',
      videoId: 'trim-null-id-1',
      additionalServices: {
        trim: {
          from: '2:00',
          to: '3:00',
        },
      },
    });

    const fakeClient = new FakeBoclipsClient();
    fakeClient.carts.insertCartItem(cartItem);

    const wrapper = renderCartItem(
      <CartItem videoItem={video} cartItem={cartItem} />,
      fakeClient,
    );

    fireEvent.click(await wrapper.findByText('Trim video'));

    expect(wrapper.queryByText(/From:/)).not.toBeInTheDocument();
    expect(wrapper.queryByText(/To:/)).not.toBeInTheDocument();

    const cart = await fakeClient.carts.getCart();

    await waitFor(() => {
      expect(cart.items[0].additionalServices.trim).toEqual(null);
    });
  });

  it('sets transcript request to true when checkbox is checked and to false when is unchecked', async () => {
    const video = VideoFactory.sample({
      id: 'transcript-test',
      title: 'this is cart item test',
    });

    const cartItem = CartItemFactory.sample({
      id: 'cart-item-id-1',
      videoId: 'transcript-test',
      additionalServices: {
        trim: {
          from: '2:00',
          to: '3:00',
        },
        transcriptRequested: false,
      },
    });

    const fakeClient = new FakeBoclipsClient();
    fakeClient.carts.insertCartItem(cartItem);
    const wrapper = renderCartItem(
      <CartItem videoItem={video} cartItem={cartItem} />,
      fakeClient,
    );
    fireEvent.click(await wrapper.findByText('Request transcripts'));

    let cart = await fakeClient.carts.getCart();

    await waitFor(() => {
      expect(cart.items[0].additionalServices.transcriptRequested).toEqual(
        true,
      );
    });

    fireEvent.click(await wrapper.findByText('Request transcripts'));

    cart = await fakeClient.carts.getCart();

    await waitFor(() => {
      expect(cart.items[0].additionalServices.transcriptRequested).toEqual(
        false,
      );
    });
  });

  it('sets captions request to true when checkbox is checked and to false when is unchecked', async () => {
    const video = VideoFactory.sample({
      id: 'captions-test', // this id must be unique for the test
      title: 'this is cart item test',
    });

    const cartItem = CartItemFactory.sample({
      id: 'cart-item-id-1',
      videoId: 'captions-test', // this needs to be the same as in video.id
      additionalServices: {
        trim: {
          from: '2:00',
          to: '3:00',
        },
        transcriptRequested: false,
        captionsRequested: false,
      },
    });

    const fakeClient = new FakeBoclipsClient();
    fakeClient.carts.insertCartItem(cartItem);

    const wrapper = renderCartItem(
      <CartItem videoItem={video} cartItem={cartItem} />,
      fakeClient,
    );

    await fireEvent.click(await wrapper.findByText('Request English captions'));

    let cart = await fakeClient.carts.getCart();

    await waitFor(() => {
      expect(cart.items[0].additionalServices.captionsRequested).toEqual(true);
    });

    fireEvent.click(await wrapper.findByText('Request English captions'));

    cart = await fakeClient.carts.getCart();

    await waitFor(() => {
      expect(cart.items[0].additionalServices.captionsRequested).toEqual(false);
    });
  });

  it('Opens a input box when you tick edit request', async () => {
    const video = VideoFactory.sample({
      id: 'edit-request-id-1',
      title: 'this is cart item test',
    });

    const cartItem = CartItemFactory.sample({
      id: 'edit-request-id-1',
      videoId: 'captions-test',
      additionalServices: {
        trim: {
          from: '2:00',
          to: '3:00',
        },
        transcriptRequested: false,
        captionsRequested: false,
      },
    });

    const fakeClient = new FakeBoclipsClient();

    const wrapper = renderCartItem(
      <CartItem videoItem={video} cartItem={cartItem} />,
      fakeClient,
    );

    fireEvent.click(await wrapper.findByText('Request other type of editing'));

    expect(
      await wrapper.findByPlaceholderText('eg. Remove front and end credits'),
    ).toBeInTheDocument();

    expect(
      await wrapper.findByText('Specify how you’d like to edit the video'),
    ).toBeInTheDocument();
  });
  it('Saves edit request to cart', async () => {
    const video = VideoFactory.sample({
      id: 'edit-request-id-2',
      title: 'this is cart item test',
    });

    const cartItem = CartItemFactory.sample({
      id: 'edit-request-id-2',
      videoId: 'edit-request-id-2',
    });

    const fakeClient = new FakeBoclipsClient();

    const wrapper = renderCartItem(
      <CartItem videoItem={video} cartItem={cartItem} />,
      fakeClient,
    );

    fireEvent.click(await wrapper.findByText('Request other type of editing'));

    const input = await wrapper.findByPlaceholderText(
      'eg. Remove front and end credits',
    );

    fireEvent.change(input, {
      target: { value: 'please do some lovely editing' },
    });
    const changedInput = await wrapper.findByDisplayValue(
      'please do some lovely editing',
    );

    expect(changedInput).toBeVisible();

    waitFor(async () => {
      const cart = await fakeClient.carts.getCart();
      const updatedCartItem = cart.items.find(
        (it) => it.videoId === cartItem.videoId,
      );
      expect(updatedCartItem?.additionalServices.editRequest).toEqual(
        'please do some lovely editing',
      );
    });
  });

  it('Can set an edit request to null', async () => {
    const video = VideoFactory.sample({
      id: 'edit-request-id-3',
      title: 'this is cart item test',
    });

    const cartItem = CartItemFactory.sample({
      id: 'edit-request-id-3',
      videoId: 'edit-request-id-3',
      additionalServices: {
        editRequest: 'this was a mistake',
      },
    });

    const fakeClient = new FakeBoclipsClient();

    const wrapper = renderCartItem(
      <CartItem videoItem={video} cartItem={cartItem} />,
      fakeClient,
    );

    fireEvent.click(await wrapper.findByText('Request other type of editing'));

    waitFor(async () => {
      const input = await wrapper.findByDisplayValue('this was a mistake');
      fireEvent.change(input, {
        target: { value: null },
      });
      const changedInput = await wrapper.findByDisplayValue(
        'eg. Remove front and end credits',
      );

      expect(changedInput).toBeVisible();

      const cart = await fakeClient.carts.getCart();
      const updatedCartItem = cart.items.find(
        (it) => it.videoId === cartItem.videoId,
      );
      expect(updatedCartItem?.additionalServices.editRequest).toBeNull();
    });
  });
});
