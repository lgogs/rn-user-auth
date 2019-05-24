import { USER_LOGGED_IN, USER_LOGGED_OUT, USER_UPDATED } from '../actions/actionTypes';

const initState = {
  uid: '',
  email: '',
  displayName: '',
  phone: '',
  address: ''
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case USER_LOGGED_IN:
      return {
        ...state,
        uid: action.uid,
        email: action.info.email,
        displayName: action.info.displayName,
        phone: action.info.phone,
        address: action.info.address
      };
    case USER_LOGGED_OUT:
      return {
        ...state,
        uid: '',
        email: '',
        displayName: '',
        phone: '',
        address: ''
      };
    case USER_UPDATED:
      return {
        ...state,
        displayName: action.newInfo.displayName,
        phone: action.newInfo.phone,
        address: action.newInfo.address
      };
    default:
      return state;
  }
};

export default authReducer;