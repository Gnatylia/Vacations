import { createStore } from 'redux';


const userReducer = (state = {}, action) => {
  console.debug("userReducer: action = ", action);
  switch (action.type) {
    case "LOGIN":
      return action.payload;
    case "LOGOUT":
      return {};
    default:
      return state;
  }
};




export const store = createStore(userReducer);
