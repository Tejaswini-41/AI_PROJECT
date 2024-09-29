
import React from 'react';
import Card from './Card'; 
import Sidebar from './Sidebar'; 
import './Dashboard.css'; 
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaBell } from 'react-icons/fa'; 

const Dashboard = () => {
    // Static user profile data
 
const userProfile = {
    image: null, // Placeholder image
    name: 'Tejaswini Durge',
    email: 'tejaswini@gmail.com',
    };
    const navigate = useNavigate();


    // Static subject list
    const subjects = [
        { title: 'Artificial Intelligence', description: 'Dr. Chaitali Shewale' },
        { title: 'Operating System', description: 'Dr. Mandar Mokashi' },
        { title: 'Database Management System', description: 'Mahesh Bhandari' },
        { title: 'Mainframe Technology', description: 'Swati Patil' },
    ];

    const handleCardClick = () => {
        navigate('/assigned-tasks');
    };

    return (
        <div className="dashboard">
            {/* Pass static user profile to Sidebar */}
            <Sidebar userProfile={userProfile} />
            <div className="main-content">
                <div className="navbar">
                    <h1 className="dashboard-title">Student Dashboard</h1>
                    <div className="navbar-icons">
                        <FaBell size={24} />
                        <FaPlus size={24} />
                    </div>
                </div>
                <div className="card-container">
                    {/* Render the static subject cards */}
                    {subjects.map((subject, index) => (
                        <Card 
                            key={index} 
                            title={subject.title} 
                            description={subject.description} 
                            onclick = {handleCardClick}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Card from './Card';
// import Sidebar from './Sidebar';
// import './Dashboard.css';
// import { FaPlus, FaBell } from 'react-icons/fa';

// const Dashboard = () => {
//     const [userProfile, setUserProfile] = useState({
//         image: null,
//         name: '',
//         email: '',
//     });

//     const [loading, setLoading] = useState(true); // State to manage loading
//     const [error, setError] = useState(null); // State to manage errors

//     const subjects = [
//         { title: 'Artificial Intelligence', description: ' Dr. Chaitali Shewale' },
//         { title: 'Operating System', description: 'Dr. Mandar Mokashi' },
//         { title: 'Database Management System', description: 'Mahesh Bhandari' },
//         { title: 'Mainframe Technology', description: 'Swati Patil' },
//     ];

//     // Function to fetch user data from API
//     const fetchUserData = async () => {
//         try {
//             const token = localStorage.getItem('authToken'); // Assuming you store the JWT in localStorage
//             const config = {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             };
//             const response = await axios.get('http://localhost:3000/api/user/profile', config);
//             setUserProfile(response.data); // Set the user profile dynamically
//         } catch (error) {
//             setError('Failed to fetch user data.'); // Set the error message
//             console.error('Error fetching user data:', error);
//         } finally {
//             setLoading(false); // Set loading to false once the request is complete
//         }
//     };
    

//     // Fetch user data when the component loads
//     useEffect(() => {
//         fetchUserData();
//     }, []);

//     if (loading) {
//         return <div className="loading">Loading...</div>; // Display loading message
//     }

//     if (error) {
//         return <div className="error">{error}</div>; // Display error message
//     }

//     return (
//         <div className="dashboard">
//             <Sidebar userProfile={userProfile} />
//             <div className="main-content">
//                 <div className="navbar">
//                     <h1 className="dashboard-title">Student Dashboard</h1>
//                     <div className="navbar-icons">
//                         <FaBell size={24} />
//                         <FaPlus size={24} />
//                     </div>
//                 </div>
//                 <div className="card-container">
//                     {subjects.map((subject, index) => (
//                         <Card
//                             key={index}
//                             title={subject.title}
//                             description={subject.description}
//                         />
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Dashboard;


