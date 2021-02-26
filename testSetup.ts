import '@testing-library/jest-dom/extend-expect';
import * as ReactTestingLibrary from '@testing-library/react';

const jestTimeout = 10000;

ReactTestingLibrary.configure({
  testIdAttribute: 'data-qa',
  asyncUtilTimeout: jestTimeout - 2000,
});

jest.setTimeout(jestTimeout);

// JSDom doesn't implement scrollTo
window.scrollTo = jest.fn();

// @ts-ignore
window.matchMedia =
  window.matchMedia ||
  // eslint-disable-next-line func-names
  function () {
    return {
      matches: false,
      addListener() {},
      removeListener() {},
    };
  };

afterEach(() => {
  ReactTestingLibrary.cleanup();
});

// This is mocking the Appcues import from index.html
window.Appcues = {
  page: jest.fn(),
  identify: jest.fn(),
  track: jest.fn(),
};
