import { RootState } from "../store";

export const selectUser = (state: RootState) => {
  const { user } = state.user;
  return user;
};
