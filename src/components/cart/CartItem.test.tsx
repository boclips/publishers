import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import CartItem from 'src/components/cart/CartItem';
import { VideoFactory } from 'boclips-api-client/dist/test-support/VideosFactory';

describe('CartItem', () => {
  it('displays cart item with title and additional services', async () => {
    const video = VideoFactory.sample({
      id: '123',
      title: 'this is cart item test',
    });
    const wrapper = render(<CartItem videoItem={video} />);

    expect(
      await wrapper.findByText('this is cart item test'),
    ).toBeInTheDocument();
    expect(await wrapper.findByText('Additional services')).toBeInTheDocument();
    expect(await wrapper.findByText('Trim video')).toBeInTheDocument();
  });
  it('opens trim video options on when checkbox is checked', async () => {
    const video = VideoFactory.sample({
      id: '123',
      title: 'this is cart item test',
    });

    const wrapper = render(<CartItem videoItem={video} />);

    fireEvent.click(await wrapper.findByText('Trim video'));

    expect(wrapper.getByText(/From:/)).toBeInTheDocument();
    expect(wrapper.getByText(/To:/)).toBeInTheDocument();
  });
});
