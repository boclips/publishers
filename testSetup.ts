import '@testing-library/jest-dom/extend-expect';
import * as ReactTestingLibrary from '@testing-library/react';

const jestTimeout = 5000;

ReactTestingLibrary.configure({
  testIdAttribute: 'data-qa',
  asyncUtilTimeout: jestTimeout - 1000,
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

afterEach(async () => {
  ReactTestingLibrary.cleanup();
});
