import { fireEvent, render } from '@testing-library/react';
import { AnalyticsTrackClick } from 'src/components/common/analytics/AnalyticsTrackClick';
import { AppcuesEvent } from 'src/types/AppcuesEvent';
import React from 'react';
import AnalyticsFactory from 'src/services/analytics/AnalyticsFactory';
import { analyticsMock } from 'src/services/analytics/AnalyticsServiceMock';

describe(`AnalyticsTrackClick`, () => {
  AnalyticsFactory.getAppcues = jest.fn(() => analyticsMock);

  it(`Sends requested event when clicked`, () => {
    const wrapper = render(
      <AnalyticsTrackClick eventType={AppcuesEvent.CART_OPENED}>
        <div>CLICK ME!!</div>
      </AnalyticsTrackClick>,
    );
    fireEvent.click(wrapper.getByText('CLICK ME!!'));

    expect(analyticsMock.sendEvent).toHaveBeenCalledWith('CART_OPENED');
  });
});
