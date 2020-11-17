import { QueryCache } from 'react-query';

export const ourQueryCache = new QueryCache({
  defaultConfig: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});
