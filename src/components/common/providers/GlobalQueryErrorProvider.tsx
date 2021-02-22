import React, { createContext, useContext, useState } from 'react';
import { useQueryClient } from 'react-query';

interface Props {
  children: React.ReactNode;
}

const queryClientContext = createContext<{ isError: boolean }>({
  isError: false,
});

export const GlobalQueryErrorProvider = ({ children }: Props) => {
  const isError = useProvideError();
  return (
    <queryClientContext.Provider value={{ isError }}>
      {children}
    </queryClientContext.Provider>
  );
};

export const useGlobalQueryError = () => {
  return useContext(queryClientContext);
};

const useProvideError = () => {
  const [isError, setIsError] = useState<boolean>(false);
  const client = useQueryClient();

  React.useEffect(() => {
    const queryCache = client.getQueryCache();

    queryCache.subscribe(() => {
      setIsError(
        client
          .getQueryCache()
          .getAll()
          .some((query) => query.state.status === 'error'),
      );
    });
  }, [client]);

  return isError;
};