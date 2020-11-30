import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';

export const renderWithLocation = (component: React.ReactElement) =>
  render(<BrowserRouter>{component}</BrowserRouter>);
