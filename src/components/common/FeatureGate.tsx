import React from 'react';
import { UserFeatureKey } from 'boclips-api-client/dist/sub-clients/organisations/model/User';
import useFeatureFlags from 'src/hooks/useFeatureFlags';
import { useBoclipsClient } from 'src/components/common/providers/BoclipsClientProvider';
import { AdminLinks } from 'boclips-api-client/dist/types';

interface FeatureGateProps {
  children: React.ReactElement;
}

type OptionalProps =
  | { linkName: keyof AdminLinks; feature?: never }
  | { feature: UserFeatureKey; linkName?: never };

export const FeatureGate = ({
  feature,
  children,
  linkName,
}: FeatureGateProps & OptionalProps) => {
  if (linkName) {
    const links = useBoclipsClient().links;
    return <>{links[linkName] && children}</>;
  }

  const flags = useFeatureFlags();
  return <>{flags && flags[feature] && children}</>;
};
