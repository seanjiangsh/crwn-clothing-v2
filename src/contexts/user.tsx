import { createContext, useEffect, useReducer, Reducer } from "react";
import { User } from "firebase/auth";

import {
  createUserDocumentFromAuth,
  onAuthStateChangedListener,
} from "../utils/firebase/firebase";
import { createAction } from "../utils/reducer/reducer";

type UserState = { user: User | null };
type UserActions = { type: "SET_CURRENT_USER"; payload: UserState["user"] };
type Context = {
  userState: UserState;
  setUser: (user: UserState["user"]) => void;
};
type ProviderProps = { children: JSX.Element };

const initialState: UserState = { user: null };

const defaultContext: Context = {
  userState: initialState,
  setUser: () => {},
};

const userReducer: Reducer<UserState, UserActions> = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "SET_CURRENT_USER":
      return { ...state, user: payload };
    default:
      throw new Error(`Unhandled type ${type} in userReducer`);
  }
};

export const UserContext = createContext<Context>(defaultContext);

export const UserProvider = ({ children }: ProviderProps) => {
  const [userState, dispatch] = useReducer(userReducer, initialState);

  const setUser = (user: UserState["user"]) =>
    dispatch(createAction<UserActions["type"]>("SET_CURRENT_USER", user));

  const value = { userState, setUser };

  useEffect(() => {
    const nextFn = (user: UserState["user"]) => {
      if (user) createUserDocumentFromAuth(user);
      setUser(user);
    };
    const unsubscribe = onAuthStateChangedListener(nextFn);
    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
