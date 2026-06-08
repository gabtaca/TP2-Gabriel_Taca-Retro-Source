import { createContext, useContext } from 'react';

export const CrtContext = createContext({
  crtVariant: null,
  setCrtVariant: () => {},
  startBoot: () => {},
});

export const useCrt = () => useContext(CrtContext);
