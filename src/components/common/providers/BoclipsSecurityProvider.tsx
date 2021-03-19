import { BoclipsSecurity } from 'boclips-js-security/dist/BoclipsSecurity';
import React, { createContext, useContext } from 'react';

interface Props {
  boclipsSecurity: BoclipsSecurity;
  children: React.ReactNode;
}

const boclipsSecurityContext = createContext<BoclipsSecurity>(null);

export const BoclipsSecurityProvider = ({
  children,
  boclipsSecurity,
}: Props) => {
  return (
    <boclipsSecurityContext.Provider value={boclipsSecurity}>
      {children}
    </boclipsSecurityContext.Provider>
  );
};

export const useBoclipsSecurity = () => {
  const context = useContext(boclipsSecurityContext);

  if (!context) {
    throw 'No boclips security found. Try wrapping your component with <BoclipsSecurityProvider boclipsSecurity={someSecurityImplementation}>';
  }

  return context;
};
