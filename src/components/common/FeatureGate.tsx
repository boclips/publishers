import React from 'react';
import { UserFeatureKey } from 'boclips-api-client/dist/sub-clients/organisations/model/User';
import useFeatureFlags from 'src/hooks/useFeatureFlags';
import { useBoclipsClient } from 'src/components/common/providers/BoclipsClientProvider';
import { AdminLinks } from 'boclips-api-client/dist/types';

interface FeatureGateProps {
  feature?: UserFeatureKey;
  linkName?: keyof AdminLinks;
  children: React.ReactElement;
}

export const FeatureGate = ({
  feature,
  children,
  linkName,
}: FeatureGateProps) => {
  const links = useBoclipsClient().links;
  const flags = useFeatureFlags();

  if (linkName) {
    return links[linkName] && children;
  }

  return <>{flags && flags[feature] && children}</>;
};
