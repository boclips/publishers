import React from 'react';
import { JSErrorBoundary } from './JSErrorBoundary';
import { NetworkErrorBoundary } from './NetworkErrorBoundary';

interface Props {
  fallback: React.ReactNode;
  children: React.ReactNode;
}

export const OmnscientErrorBoundary = ({ fallback, children }: Props) => {
  return (
    <JSErrorBoundary fallback={fallback}>
      <NetworkErrorBoundary fallback={fallback}>
        {children}
      </NetworkErrorBoundary>
    </JSErrorBoundary>
  );
};
