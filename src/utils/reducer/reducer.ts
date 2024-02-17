export const createAction = <Type>(type: Type, payload: any) => ({
  type,
  payload,
});
