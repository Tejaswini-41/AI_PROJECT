import React from 'react';
import './sidebar.css'; // Import the CSS file for sidebar styling

// Default profile image path
const defaultProfileImage = '/default-profile.png';

const Sidebar = ({ userProfile }) => {
    return (
        <div className="sidebar">
            <div className="profile">
                <img 
                    src={userProfile.image || defaultProfileImage} 
                    alt="Profile" 
                    className="profile-image" 
                />
                <h2 className="profile-name">{userProfile.name}</h2>
                <p className="profile-details">Class: {userProfile.class} | Course: {userProfile.course}</p>
            </div>
            <button className="view-receipt">View Receipt</button>
        </div>
    );
};

export default Sidebar;
