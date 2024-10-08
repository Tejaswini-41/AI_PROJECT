import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ReceiptCard.css'; // Import the CSS file for styling
import logo from './logo.png'; // Assuming you have the logo.png in the same folder

const ReceiptCard = () => {
    const [userProfile, setUserProfile] = useState(null);
    const token = localStorage.getItem('token'); // Assuming you're storing the token in local storage

    // Fetch the user profile to get the student's name
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

    if (!userProfile) {
        return <div>Loading...</div>; // Display loading state
    }

    // Get the current date
    const currentDate = new Date().toLocaleDateString();

    return (
        <div className="receipt-card">
            {/* Header with logo and college name */}
            <div className="header">
                <img src={logo} alt="College Logo" className="logo" />
                <div className="college-details">
                    <h1 className="college-name">VISHWAKARMA INSTITUTE OF INFORMATION TECHNOLOGY, PUNE</h1>
                    <p className="college-address">S.No.3/4,Kondhwa Bk., Pune-411048.MAHARASHTRA, INDIA</p>
                </div>
            </div>
            
            <hr className="separator" />

            {/* NOC Receipt Title */}
            <h2 className="receipt-title">NOC RECEIPT</h2>

            {/* Student and course information */}
            <div className="student-info">
                <p><strong>Student Name:</strong> {userProfile.name}</p>
                <p><strong>Department:</strong> Information Technology</p>
                <p><strong>Course:</strong> B.Tech</p>
                <p><strong>Date of Issue:</strong> {currentDate}</p>
            </div>

            <hr className="separator" />

            {/* Conditions Section */}
            <div className="conditions">
                <h3>Conditions for Hall Ticket Issuance</h3>
                <ul>
                    <li>NOC Cleared</li>
                    <li>Minimum Attendance Met</li>
                    <li>Assignments Completed</li>
                    <li>No Dues Pending</li>
                </ul>
            </div>

            <hr className="separator" />

            {/* Approved Section */}
            <div className="approved-section">
                <p className="approved-text">Approved</p>
                <div className="approved-icon">✔</div> {/* Green tick */}
            </div>

            <hr className="separator" />

            {/* Instructions */}
            <div className="instructions">
                <p>Please bring this receipt and get your NOC signed to obtain the Hall ticket.</p>
            </div>
        </div>
    );
};

export default ReceiptCard;
