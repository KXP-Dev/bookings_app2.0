import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserHomePage from './pages/UserHomePage'; 
import AuthPage from './pages/AuthPage'; // Page for login/register
import AdminPage from './pages/AdminPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} /> {/* Home page */}
        <Route path="/login" element={<AuthPage />} /> {/* Login page */}
        <Route path="/dashboard" element={<UserHomePage />} /> {/* User dashboard */}
        <Route path="/admin" element={<AdminPage />} /> {/* Admin dashboard */}
        {/* ... any other routes */}
      </Routes>
    </Router>
  );
}

export default App;