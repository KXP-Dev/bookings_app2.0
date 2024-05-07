import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LogoutButton from './LogoutButton'; // Update the import path

test('clicking the button triggers the logout action', () => {
  const navigateMock = jest.fn();
  // Mock the useNavigate hook
  jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => navigateMock,
  }));

  render(<LogoutButton />);

  const logoutButton = screen.getByText('Logout');

  fireEvent.click(logoutButton);

  // Assert that localStorage.removeItem('token') was called
  expect(localStorage.removeItem).toHaveBeenCalledWith('token');
  
  // Assert that the navigate function was called with the correct route
  expect(navigateMock).toHaveBeenCalledWith('/login');
});