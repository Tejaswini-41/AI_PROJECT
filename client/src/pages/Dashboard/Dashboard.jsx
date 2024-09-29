import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
    const navigate = useNavigate();

    // Function to handle subject card click (specifically for Mathematics)
    const handleMathematicsClick = () => {
        navigate('/assignedtask'); // Redirects to AssignedTasks page
    };

    return (
        <div className="dashboard">
            {/* Sidebar */}
            <div className="sidebar">
                <h3>Student Profile</h3>
                <div className="profile-details">
                    <img
                        src="https://via.placeholder.com/150" 
                        alt="Profile"
                        className="profile-image"
                    />
                    <p>Name: John Doe</p>
                    <p>Class: 12</p>
                    <p>Course: Science</p>
                </div>
            </div>

            {/* Main Content */}
            <div className="main-content">
                {/* Top Navbar */}
                <nav className="navbar">
                    <h2>Dashboard</h2>
                    <div className="nav-icons">
                        <i className="fas fa-bell"></i>
                        <i className="fas fa-cog"></i>
                    </div>
                </nav>

                {/* Subjects Section */}
                <h2>Subjects</h2>
                <div className="subjects">
                    {/* Mathematics Card */}
                    <div className="subject-card" onClick={handleMathematicsClick}>
                        <h3>Mathematics</h3>
                        <p>View assigned tasks</p>
                    </div>

                    {/* Science Card */}
                    <div className="subject-card">
                        <h3>Science</h3>
                        <p>Click to view</p>
                    </div>

                    {/* History Card */}
                    <div className="subject-card">
                        <h3>History</h3>
                        <p>Click to view</p>
                    </div>

                    {/* English Card */}
                    <div className="subject-card">
                        <h3>English</h3>
                        <p>Click to view</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
