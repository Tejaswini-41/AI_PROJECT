import React from 'react';
import Card from './TECard'; 
import Sidebar from './TSidebar'; 
import './Tdashboard.css'; 
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaBell } from 'react-icons/fa'; 

const Tdashboard = () => {
    // Static user profile data
    const userProfile = {
        image: null, // Placeholder image
        name: 'Dr. Chetali Shewale',
        email: 'chetali@gmail.com',
    };

    const navigate = useNavigate();

    // Static subject list
    const subjects = [
        { index:'1',title: 'Artificial Intelligence', description: 'Dr. Chaitali Shewale' },
        { index:'2',title: 'Operating System', description: 'Dr. Mandar Mokashi' },
        { index:'3',title: 'Database Management System', description: 'Mahesh Bhandari' },
        { index:'4',title: 'Mainframe Technology', description: 'Swati Patil' },
    ];

    // Function to handle card clicks (for all subjects)
    const handleCardClick = () => {
        navigate('/manage-tasks');
    };

    return (
        <div className="dashboard">
            {/* Pass static user profile to Sidebar */}
            <Sidebar userProfile={userProfile} />
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
                            key={subject.index} 
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

export default Tdashboard;
