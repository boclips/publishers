import { AppcuesEvent } from 'src/types/AppcuesEvent';
import AnalyticsFactory from 'src/services/analytics/AnalyticsFactory';
import React, { ReactElement } from 'react';

interface Props {
  eventType: AppcuesEvent;
  children: ReactElement;
}

export const AnalyticsTrackClick = ({ eventType, children }: Props) => (
  <>
    {React.cloneElement(children, {
      onClick: () => AnalyticsFactory.getAppcues().sendEvent(eventType),
      onKeyDown: () => AnalyticsFactory.getAppcues().sendEvent(eventType),
    })}
  </>
);
