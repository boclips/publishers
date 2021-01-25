import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import CartItem from 'src/components/cart/CartItem/CartItem';
import { VideoFactory } from 'boclips-api-client/dist/test-support/VideosFactory';
import { Link } from 'boclips-api-client/dist/sub-clients/common/model/LinkEntity';
import { FakeBoclipsClient } from 'boclips-api-client/dist/test-support';
import { BoclipsClientProvider } from 'src/components/common/BoclipsClientProvider';

describe('CartItem', () => {
  it('displays cart item with title and additional services', async () => {
    const cartItem = {
      id: 'cart-item-id-1',
      videoId: '123',
      additionalServices: null,
      links: {
        self: new Link({ href: 'www.example.com' }),
      },
    };

    const video = VideoFactory.sample({
      id: '123',
      title: 'this is cart item test',
    });

    const wrapper = render(
      <BoclipsClientProvider client={new FakeBoclipsClient()}>
        <CartItem videoItem={video} cartItem={cartItem} />
      </BoclipsClientProvider>,
    );

    expect(
      await wrapper.findByText('this is cart item test'),
    ).toBeInTheDocument();
    expect(await wrapper.findByText('Additional services')).toBeInTheDocument();
    expect(await wrapper.findByText('Trim video')).toBeInTheDocument();
    expect(await wrapper.findByText('Request transcripts')).toBeInTheDocument();

    // queryBy doesn't throw and error when cannot be found
    expect(wrapper.queryByText(/From:/)).not.toBeInTheDocument();
    expect(wrapper.queryByText(/To:/)).not.toBeInTheDocument();
  });

  it('opens trim video options on when checkbox is checked', async () => {
    const cartItem = {
      id: 'cart-item-id-1',
      videoId: '123',
      additionalServices: null,
      transcriptRequested: false,
      links: {
        self: new Link({ href: 'www.example.com' }),
      },
    };

    const video = VideoFactory.sample({
      id: '123',
      title: 'this is cart item test',
    });

    const wrapper = render(
      <BoclipsClientProvider client={new FakeBoclipsClient()}>
        <CartItem videoItem={video} cartItem={cartItem} />
      </BoclipsClientProvider>,
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

    const wrapper = render(
      <BoclipsClientProvider client={fakeClient}>
        <CartItem videoItem={video} cartItem={cartItemFromCart} />
      </BoclipsClientProvider>,
    );

    fireEvent.click(await wrapper.findByText('Trim video'));

    fireEvent.change(await wrapper.findByLabelText('trim-from'), {
      target: { value: '2' },
    });

    fireEvent.blur(await wrapper.findByLabelText('trim-from'));

    fireEvent.change(await wrapper.findByLabelText('trim-to'), {
      target: { value: '3' },
    });

    fireEvent.blur(await wrapper.findByLabelText('trim-to'));

    cart = await fakeClient.carts.getCart();

    const cartItem = cart.items.find((it) => it.videoId === video.id);

    expect(cartItem.additionalServices?.trim.from).toEqual('02:00');
    expect(cartItem.additionalServices?.trim.to).toEqual('03:00');
  });

  it('displays the trim values if cart item has trim info specified', async () => {
    const video = VideoFactory.sample({
      id: '123',
      title: 'this is cart item test',
    });

    const cartItem = {
      id: 'cart-item-id-1',
      videoId: '123',
      additionalServices: {
        trim: {
          from: '01:21',
          to: '02:21',
        },
      },
      links: {
        self: new Link({ href: 'www.example.com' }),
      },
    };

    const wrapper = render(
      <BoclipsClientProvider client={new FakeBoclipsClient()}>
        <CartItem videoItem={video} cartItem={cartItem} />
      </BoclipsClientProvider>,
    );

    expect(wrapper.getByLabelText('trim-from').getAttribute('value')).toEqual(
      '01:21',
    );

    expect(wrapper.getByLabelText('trim-to').getAttribute('value')).toEqual(
      '02:21',
    );
  });

  it('sets trim to null when trim checkbox is unset', async () => {
    const video = VideoFactory.sample({
      id: 'trim-null-id-1',
      title: 'this is cart item test',
    });

    const cartItem = {
      id: 'cart-item-id-1',
      videoId: 'trim-null-id-1',
      additionalServices: {
        trim: {
          from: '2:00',
          to: '3:00',
        },
      },
      links: {
        self: new Link({ href: 'www.example.com' }),
      },
    };

    const fakeClient = new FakeBoclipsClient();

    const wrapper = render(
      <BoclipsClientProvider client={fakeClient}>
        <CartItem videoItem={video} cartItem={cartItem} />
      </BoclipsClientProvider>,
    );

    fireEvent.click(await wrapper.findByText('Trim video'));

    expect(wrapper.queryByText(/From:/)).not.toBeInTheDocument();
    expect(wrapper.queryByText(/To:/)).not.toBeInTheDocument();

    const cart = await fakeClient.carts.getCart();

    const updatedCartItem = cart.items.find(
      (it) => it.videoId === cartItem.videoId,
    );

    expect(updatedCartItem.additionalServices.trim).toEqual(null);
  });

  it('sets transcript request to true when checkbox is checked and to false when is unchecked', async () => {
    const video = VideoFactory.sample({
      id: 'transcript-test',
      title: 'this is cart item test',
    });

    const cartItem = {
      id: 'cart-item-id-1',
      videoId: 'transcript-test',
      additionalServices: {
        trim: {
          from: '2:00',
          to: '3:00',
        },
        transcriptRequested: false,
      },
      links: {
        self: new Link({ href: 'www.example.com' }),
      },
    };

    const fakeClient = new FakeBoclipsClient();

    const wrapper = render(
      <BoclipsClientProvider client={fakeClient}>
        <CartItem videoItem={video} cartItem={cartItem} />
      </BoclipsClientProvider>,
    );

    fireEvent.click(await wrapper.findByText('Request transcripts'));

    let cart = await fakeClient.carts.getCart();

    let updatedCartItem = cart.items.find(
      (it) => it.videoId === cartItem.videoId,
    );

    expect(updatedCartItem.additionalServices.transcriptRequested).toEqual(
      true,
    );

    fireEvent.click(await wrapper.findByText('Request transcripts'));

    cart = await fakeClient.carts.getCart();

    updatedCartItem = cart.items.find((it) => it.videoId === cartItem.videoId);

    expect(updatedCartItem.additionalServices.transcriptRequested).toEqual(
      false,
    );
  });

  it('sets captions request to true when checkbox is checked and to false when is unchecked', async () => {
    const video = VideoFactory.sample({
      id: 'captions-test', // this id must be unique for the test
      title: 'this is cart item test',
    });

    const cartItem = {
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

      links: {
        self: new Link({ href: 'www.example.com' }),
      },
    };

    const fakeClient = new FakeBoclipsClient();

    const wrapper = render(
      <BoclipsClientProvider client={fakeClient}>
        <CartItem videoItem={video} cartItem={cartItem} />
      </BoclipsClientProvider>,
    );

    fireEvent.click(await wrapper.findByText('Request English captions'));

    let cart = await fakeClient.carts.getCart();

    let updatedCartItem = cart.items.find(
      (it) => it.videoId === cartItem.videoId,
    );

    expect(updatedCartItem.additionalServices.captionsRequested).toEqual(true);

    fireEvent.click(await wrapper.findByText('Request English captions'));

    cart = await fakeClient.carts.getCart();

    updatedCartItem = cart.items.find((it) => it.videoId === cartItem.videoId);

    expect(updatedCartItem.additionalServices.captionsRequested).toEqual(false);
  });
});