import React from 'react';
import Card from './card'; // Import the Card component
import Sidebar from './sidebar'; // Import the Sidebar component
import './Dashboard.css'; // Import the CSS file for dashboard styling
import { FaPlus, FaBell } from 'react-icons/fa'; // Import icons from react-icons

const Dashboard = () => {
    const subjects = [
        { title: 'Mathematics', description: 'Algebra, Geometry, Calculus' },
        { title: 'Science', description: 'Physics, Chemistry, Biology' },
        { title: 'History', description: 'World History, Ancient Civilizations' },
        { title: 'Literature', description: 'Poetry, Novels, Drama' },
    ];

    // Placeholder for user profile data (can be replaced with actual user data)
    const userProfile = {
        name: "John Doe",
        class: "12",
        course: "Science",
        image: null, // Set to null if no image is provided
    };

    return (
        <div className="dashboard">
            <Sidebar userProfile={userProfile} /> {/* Render the Sidebar component */}
            <div className="main-content">
                <div className="navbar">
                    <h1 className="dashboard-title">Student Dashboard</h1>
                    <div className="navbar-icons">
                        <FaBell size={24} />
                        <FaPlus size={24} />
                    </div>
                </div>
                <div className="card-container">
                    {subjects.map((subject, index) => (
                        <Card 
                            key={index} 
                            title={subject.title} 
                            description={subject.description} 
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
