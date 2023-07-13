import { USER_LOGIN, USER_LOGOUT } from "./constants.auth";

export const userLogin = (payload) => {
  return {
    type: USER_LOGIN,
    payload,
  };
};

export const userLogout = () => ({
  type: USER_LOGOUT,
});
