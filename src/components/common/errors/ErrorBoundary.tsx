import React from 'react';
import { JSErrorBoundary } from './JSErrorBoundary';
import { QueryErrorBoundary } from './QueryErrorBoundary';

interface Props {
  fallback: React.ReactNode;
  children: React.ReactNode;
}

export const ErrorBoundary = ({ fallback, children }: Props) => {
  return (
    <JSErrorBoundary fallback={fallback}>
      <QueryErrorBoundary fallback={fallback}>{children}</QueryErrorBoundary>
    </JSErrorBoundary>
  );
};
