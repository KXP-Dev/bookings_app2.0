import React, { createContext, useState, useContext } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isLoggedIn: false,
    user: null,
    token: localStorage.getItem('token') // Retrieve the stored token
  });

  // Function to handle login
  const login = (user, token) => {
    setAuth({ isLoggedIn: true, user, token });
    localStorage.setItem('token', token); // Store the token
  };

  // Function to handle logout
  const logout = () => {
    setAuth({ isLoggedIn: false, user: null, token: null });
    localStorage.removeItem('token'); // Remove the token
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};