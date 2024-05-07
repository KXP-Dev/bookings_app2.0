import React, { createContext, useContext, useReducer } from 'react';

// Initial state
const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
};

// Create context
const StateContext = createContext(initialState);

// Reducer function to handle state changes
const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
      };
    // Add more cases as needed
    default:
      return state;
  }
};

// Context provider component
export const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};

// Hook to use state in components
export const useStateContext = () => useContext(StateContext);