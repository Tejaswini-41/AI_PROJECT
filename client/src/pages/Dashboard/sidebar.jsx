import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import './sidebar.css'; // Import the CSS file for sidebar styling

const Sidebar = () => {
    const [userProfile, setUserProfile] = useState(null);
    const token = localStorage.getItem('token'); // Assuming you're storing the token in local storage
    const navigate = useNavigate(); // Initialize the useNavigate hook

    const getProfileImage = () => {
        if (userProfile && userProfile.image) {
            return userProfile.image;
        } else if (userProfile && userProfile.name) {
            return `https://via.placeholder.com/150/000000/FFFFFF/?text=${userProfile.name[0]}`;
        }
        return '/default-profile.png'; // Fallback to default image
    };

    const fetchUserProfile = async () => {
        try {
            const response = await axios.get('http://localhost:3000/auth/profile', {
                headers: {
                    Authorization: `Bearer ${token}`, // Send the token in the authorization header
                },
            });
            setUserProfile(response.data); // Set user profile data
        } catch (error) {
            console.error('Error fetching user profile:', error);
        }
    };

    useEffect(() => {
        fetchUserProfile(); // Fetch user profile when component mounts
    }, []);

    const handleViewReceipt = () => {
        navigate('/receipt'); // Navigate to the receipt route
    };

    if (!userProfile) {
        return <div>Loading...</div>; // Display loading state
    }

    return (
        <div className="sidebar">
            <div className="profile">
                <img src={getProfileImage()} alt="Profile" className="profile-img" />
                <h2 className="profile-name">Name: {userProfile.name || 'xyz xyz'}</h2>
                <p className="profile-email">Email: {userProfile.email || 'xyz@gmail.com'}</p>
            </div>
            <button className="view-receipt-button" onClick={handleViewReceipt}>
                View Receipt
            </button>
        </div>
    );
};

export default Sidebar;
