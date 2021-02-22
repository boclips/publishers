import { BoclipsClient } from 'boclips-api-client';
import React, { createContext, useContext } from 'react';

interface Props {
  client: BoclipsClient;
  children: React.ReactNode;
}

const boclipsClientContext = createContext<BoclipsClient>(null);

export const BoclipsClientProvider = ({ children, client }: Props) => {
  return (
    <boclipsClientContext.Provider value={client}>
      {children}
    </boclipsClientContext.Provider>
  );
};

export const useBoclipsClient = () => {
  const context = useContext(boclipsClientContext);

  if (!context) {
    throw 'No boclips client found. Try wrapping your component with <BoclipsClientProvider client={someClient}>';
  }

  return context;
};
