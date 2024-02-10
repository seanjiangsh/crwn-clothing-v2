import {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import { User } from "firebase/auth";

import {
  createUserDocumentFromAuth,
  onAuthStateChangedListener,
} from "../utils/firebase/firebase";

type Context = {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
};

const defaultContext: Context = {
  user: null,
  setUser: () => {},
};
export const UserContext = createContext<Context>(defaultContext);

type ProviderProps = { children: JSX.Element };
export const UserProvider = ({ children }: ProviderProps) => {
  const [user, setUser] = useState<Context["user"]>(null);
  const value = { user, setUser };

  useEffect(() => {
    const nextFn = (user: User | null) => {
      if (user) createUserDocumentFromAuth(user);
      setUser(user);
    };
    const unsubscribe = onAuthStateChangedListener(nextFn);
    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
