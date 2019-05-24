import { USER_LOGGED_IN, USER_LOGGED_OUT, USER_UPDATED } from './actionTypes';

export const userLoggedIn = (info, uid) => {
  return {
    type: USER_LOGGED_IN,
    info,
    uid
  };
};

export const userLoggedOut = () => {
  return {
    type: USER_LOGGED_OUT
  };
};

export const userUpdated = newInfo => {
  return {
    type: USER_UPDATED,
    newInfo
  };
};