import React from 'react';
import { UserFeatureKey } from 'boclips-api-client/dist/sub-clients/organisations/model/User';
import useFeatureFlags from 'src/hooks/useFeatureFlags';

interface FeatureGateProps {
  feature: UserFeatureKey;
  children: React.ReactElement;
}

export const FeatureGate = ({ feature, children }: FeatureGateProps) => {
  const flags = useFeatureFlags();
  return <>{flags && flags[feature] && children}</>;
};
