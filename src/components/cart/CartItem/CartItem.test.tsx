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
        {' '}
        <CartItem videoItem={video} cartItem={cartItem} />
      </BoclipsClientProvider>,
    );

    wrapper.debug(wrapper.baseElement, 20000000);

    expect(
      await wrapper.findByText('this is cart item test'),
    ).toBeInTheDocument();
    expect(await wrapper.findByText('Additional services')).toBeInTheDocument();
    expect(await wrapper.findByText('Trim video')).toBeInTheDocument();
    // queryBy doesn't throw and error when cannot be found
    expect(wrapper.queryByText(/From:/)).not.toBeInTheDocument();
    expect(wrapper.queryByText(/To:/)).not.toBeInTheDocument();
  });

  it('opens trim video options on when checkbox is checked', async () => {
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

    fireEvent.click(await wrapper.findByText('Trim video'));

    expect(wrapper.getByText(/From:/)).toBeInTheDocument();
    expect(wrapper.getByText(/To:/)).toBeInTheDocument();
  });

  it('saves the trim information on onBlur event', async () => {
    const video = VideoFactory.sample({
      id: '123',
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
      target: { value: '00:21' },
    });

    fireEvent.blur(await wrapper.findByLabelText('trim-from'));

    fireEvent.change(await wrapper.findByLabelText('trim-to'), {
      target: { value: '02:21' },
    });

    fireEvent.blur(await wrapper.findByLabelText('trim-to'));

    cart = await fakeClient.carts.getCart();

    expect(cart.items[0].additionalServices?.trim.from).toEqual('00:21');
    expect(cart.items[0].additionalServices?.trim.to).toEqual('02:21');
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
          from: '1:21',
          to: '2:21',
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
      '1:21',
    );

    expect(wrapper.getByLabelText('trim-to').getAttribute('value')).toEqual(
      '2:21',
    );
  });

  it('sets trim to null when trim checkbox is unset', async () => {
    const video = VideoFactory.sample({
      id: '123',
      title: 'this is cart item test',
    });

    const cartItem = {
      id: 'cart-item-id-1',
      videoId: '123',
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

    const updatedCartItem = cart.items.find((it) => it.id === cartItem.id);

    expect(updatedCartItem.additionalServices.trim).toEqual(null);
  });
});
