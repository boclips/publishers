import React from 'react';
import { BoclipsClientProvider } from 'src/components/common/BoclipsClientProvider';
import { fireEvent, render } from '@testing-library/react';
import { FakeBoclipsClient } from 'boclips-api-client/dist/test-support';
import { VideoFactory } from 'boclips-api-client/dist/test-support/VideosFactory';
import { VideoInteractedWith } from 'boclips-api-client/dist/sub-clients/events/model/EventRequest';
import { CopyVideoLinkButton } from './CopyVideoLinkButton';

describe('CopyLinkButton', () => {
  it('tracks event when button is pressed', () => {
    const fakeClient = new FakeBoclipsClient();
    const video = VideoFactory.sample({});
    const wrapper = render(
      <BoclipsClientProvider client={fakeClient}>
        <CopyVideoLinkButton video={video} />
      </BoclipsClientProvider>,
    );
    const button = wrapper.getByText(/Copy link/);
    fireEvent.click(button);

    expect(fakeClient.events.getEvents().length).toEqual(1);

    const videoInteractedEvent = fakeClient.events.getEvents()[0] as VideoInteractedWith;
    expect(videoInteractedEvent.type).toEqual('VIDEO_INTERACTED_WITH');
    expect(videoInteractedEvent.subtype).toEqual('COPY_SHARE_LINK');
  });
});
