import React, { createContext, useContext, useState } from 'react';

interface Props {
  children: React.ReactNode;
}

interface CartItemValidation {
  isTrimValid: boolean;
}

type CartItemValidationMap = { [key in string]: CartItemValidation };

const queryClientContext = createContext<
  [
    CartItemValidationMap,
    React.Dispatch<React.SetStateAction<CartItemValidationMap>>,
  ]
>(null);

export const CartValidationProvider = ({ children }: Props) => {
  const value = useState<CartItemValidationMap>({});
  return (
    <queryClientContext.Provider value={value}>
      {children}
    </queryClientContext.Provider>
  );
};

export const useCartValidation = () => {
  return useContext(queryClientContext);
};
