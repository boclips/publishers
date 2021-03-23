import React from 'react';
import { useBoclipsSecurity } from 'src/components/common/providers/BoclipsSecurityProvider';

interface Props {
  children: React.ReactNode;
  fallback: React.ReactNode;
  roles: string[];
}

export const WithValidRoles = ({ children, fallback, roles }: Props) => {
  const security = useBoclipsSecurity();

  if (roles.every((role) => security.hasRole(role))) {
    return <>{children}</>;
  }

  return <>{fallback}</>;
};
