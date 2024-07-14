import { createContext, useState } from "react";

export interface GlobalContextProps {
  fieldSize: number;
}

export const defaultGlobalContext: GlobalContextProps = {
  fieldSize: 40,
}

export const GlobalContext = createContext({});

// Create a Provider Component
export function GlobalProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<GlobalContextProps>(defaultGlobalContext);
  return (
    <GlobalContext.Provider value={{ state, setState }}>
      {children}
    </GlobalContext.Provider>
  );
};
