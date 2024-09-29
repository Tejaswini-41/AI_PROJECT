import React from 'react';
import './Sidebar.css';

const Sidebar = ({ userProfile }) => {
    const { name, class: studentClass, course, image } = userProfile;

    return (
        <div className="sidebar">
            <div className="profile-section">
                <img 
                    src={image || 'https://via.placeholder.com/150'} 
                    alt="Profile" 
                    className="profile-image"
                />
                <h3>{name}</h3>
                <p>Class: {studentClass}</p>
                <p>Course: {course}</p>
            </div>
            <button className="view-receipt-button">View Receipt</button>
        </div>
    );
};

export default Sidebar;
