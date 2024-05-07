import React, { createContext, useReducer } from 'react';

export const BookingContext = createContext();

const initialState = {
  bookings: [],
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_BOOKINGS':
      return {
        ...state,
        bookings: action.payload,
      };
    // Add more actions as needed
    default:
      return state;
  }
}

export const BookingProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <BookingContext.Provider value={{ state, dispatch }}>
      {children}
    </BookingContext.Provider>
  );
};