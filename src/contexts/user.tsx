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

type UserState = {
  user: User | null;
};
type Context = {
  userState: UserState;
  setUserState: Dispatch<SetStateAction<UserState>>;
};

const defaultUserState: UserState = { user: null };
const defaultContext: Context = {
  userState: defaultUserState,
  setUserState: () => {},
};
export const UserContext = createContext<Context>(defaultContext);

type ProviderProps = { children: JSX.Element };
export const UserProvider = ({ children }: ProviderProps) => {
  const [userState, setUserState] = useState<UserState>(defaultUserState);
  const value = { userState, setUserState };

  useEffect(() => {
    const nextFn = (user: User | null) => {
      if (user) createUserDocumentFromAuth(user);
      setUserState({ user });
    };
    const unsubscribe = onAuthStateChangedListener(nextFn);
    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
