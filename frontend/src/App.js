// src/App.js
import React from 'react';
import { useState, useEffect } from 'react'; // <-- Add this line
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import Trash from './pages/Trash';

function App() {

  // const isAuthenticated = !!localStorage.getItem('token');
  // console.log('Token in localStorage:', localStorage.getItem('token'));


  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if token exists in localStorage
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token); // If token exists, set to true
    console.log('Token in localStorage:', token); // Debugging line
  }, []); // Only run this once after initial render


  return (
    <Router>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/tasks"
          element={isAuthenticated ? <Tasks /> : <Navigate to="/login" />}
        />
        <Route
          path="/trash"
          element={isAuthenticated ? <Trash /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
