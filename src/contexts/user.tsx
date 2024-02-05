import { createContext, useState, Dispatch, SetStateAction } from "react";
import { User } from "firebase/auth";

type UserState = {
  user?: User;
};
type Context = {
  userState?: UserState;
  setUserState: Dispatch<SetStateAction<UserState>>;
};

const defaultContext = { setUserState: () => {} };
export const UserContext = createContext<Context>(defaultContext);

type ProviderProps = { children: JSX.Element };
export const UserProvider = ({ children }: ProviderProps) => {
  const [userState, setUserState] = useState<UserState>({});
  const value = { userState, setUserState };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
