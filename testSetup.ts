import '@testing-library/jest-dom/extend-expect';
import * as ReactTestingLibrary from '@testing-library/react';
import { FakeApiClient } from 'src/testSupport/fakeApiClient';

ReactTestingLibrary.configure({ testIdAttribute: 'data-qa' });

jest.setTimeout(30000);

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
  (await FakeApiClient).clear();
});
