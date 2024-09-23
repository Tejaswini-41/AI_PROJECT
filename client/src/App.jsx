import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Dashboard from './pages/Dashboard/Dashboard';

const App = () => {
  return (
      <Router>
              <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} /> {/* Default to Login */}
        <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
    </Router>
    
  );
};


export default App
