import React from 'react';
import Card from './Card'; 
import Sidebar from './sidebar'; 
import './Dashboard.css'; 
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaBell } from 'react-icons/fa'; 

const Dashboard = () => {
    // Static user profile data
    
    const navigate = useNavigate();

    // Static subject list
    const subjects = [
        { title: 'Artificial Intelligence', description: 'Dr. Chaitali Shewale' },
        { title: 'Operating System', description: 'Dr. Mandar Mokashi' },
        { title: 'Database Management System', description: 'Mahesh Bhandari' },
        { title: 'Mainframe Technology', description: 'Swati Patil' },
    ];

    // Function to handle card clicks (for all subjects)
    const handleCardClick = () => {
        navigate('/assigned-tasks');
    };

    return (
        <div className="dashboard">
            {/* Pass static user profile to Sidebar */}
            <Sidebar />
            <div className="main-content">
                {/* Top Navbar */}
                <nav className="navbar">
                    <h2>Dashboard</h2>
                    <div className="nav-icons">
                        <FaBell size={24} />
                        <FaPlus size={24} />
                    </div>
                </nav>

                {/* Subjects Section */}
                <h2>Subjects</h2>
                <div className="card-container">
                    {/* Render the subject cards dynamically */}
                    {subjects.map((subject, index) => (
                        <Card 
                            key={index} 
                            title={subject.title} 
                            description={subject.description} 
                            onClick={handleCardClick}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
