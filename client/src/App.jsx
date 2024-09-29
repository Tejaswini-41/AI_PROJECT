import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login/Login';           // Import Login component
import Register from './pages/Register/Register';   // Import Register component
import Dashboard from './pages/Dashboard/Dashboard'; // Import Dashboard component
import AssignedTasks from './pages/Dashboard/AssignedTasks';

const App = () => {
    return (
        <Router>
            <div>
                <h1>Welcome to Classroom</h1>
                <Routes>
                    <Route path="/" element={<Login />} />                {/* Default route to Login */}
                    <Route path="/register" element={<Register />} />     {/* Registration route */}
                    <Route path="/login" element={<Login />} />           {/* Login route */}
                    <Route path="/dashboard" element={<Dashboard />} />   {/* Dashboard route */}
                    <Route path="/assigned-tasks" element={<AssignedTasks />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;