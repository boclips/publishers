import React from 'react';
import { useBoclipsSecurity } from 'src/components/common/providers/BoclipsSecurityProvider';
import { Role } from 'src/types/Role';

interface Props {
  children: React.ReactNode;
  fallback: React.ReactNode;
  roles: Role[];
}

export const WithValidRoles = ({ children, fallback, roles }: Props) => {
  const security = useBoclipsSecurity();

  if (roles.some((role) => security.hasRole(role))) {
    return <>{children}</>;
  }

  return <>{fallback}</>;
};
