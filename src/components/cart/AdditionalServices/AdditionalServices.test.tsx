import { render } from '@testing-library/react';
import React from 'react';
import AdditionalServices from 'src/components/cart/AdditionalServices/AdditionalServices';
import { VideoFactory } from 'boclips-api-client/dist/test-support/VideosFactory';
import { CartItemFactory } from 'boclips-api-client/dist/test-support/CartsFactory';
import { BoclipsClientProvider } from 'src/components/common/BoclipsClientProvider';
import { FakeBoclipsClient } from 'boclips-api-client/dist/test-support';

describe('AdditionalServices component', () => {
  it('should displays a price for all of the services', async () => {
    const cartItem = CartItemFactory.sample({
      id: 'cart-item-id-1',
      videoId: '123',
    });

    const video = VideoFactory.sample({
      id: '123',
      title: 'this is cart item test',
    });

    const renderedElement = render(
      <BoclipsClientProvider client={new FakeBoclipsClient()}>
        <AdditionalServices videoItem={video} cartItem={cartItem} />
      </BoclipsClientProvider>,
    );

    expect(await renderedElement.findAllByText('Free')).toHaveLength(4);
  });
});
