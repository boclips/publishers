import { AppcuesEvent } from 'src/types/AppcuesEvent';
import AnalyticsFactory from 'src/services/analytics/AnalyticsFactory';
import React, { ReactNode } from 'react';

interface Props {
  eventType: AppcuesEvent;
  children: ReactNode;
}

export const AnalyticsTrackClick = ({ eventType, children }: Props) => (
  <span
    onClick={() => AnalyticsFactory.getAppcues().sendEvent(eventType)}
    onKeyDown={() => AnalyticsFactory.getAppcues().sendEvent(eventType)}
    role="presentation"
  >
    {children}
  </span>
);
