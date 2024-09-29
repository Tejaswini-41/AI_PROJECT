// import React from 'react';
// import './Sidebar.css'; // Assuming you have a CSS file for styling

// const Sidebar = ({ userProfile }) => {
//     return (
//         <div className="sidebar">
//             <div className="profile">
//                 {/* Display user profile image */}
//                 <img src={userProfile.image || 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359554_1280.png'} alt="Profile" className="profile-img" />
//                 <h2>{userProfile.name}</h2>
//                 <p>{userProfile.email}</p>
//             </div>
//             {/* <div className="sidebar-links">
//                 <ul>
//                     <li>Dashboard</li>
//                     <li>Courses</li>
//                     <li>Settings</li>
//                     <li>Logout</li>
//                 </ul> */}
//             {/* </div> */}
//         </div>
//     );
// };

// export default Sidebar;


import React from 'react';
import './sidebar.css'; // Import the CSS file for sidebar styling


const Sidebar = ({ userProfile }) => {
    const getProfileImage = () => {
        if (userProfile.image) {
            return userProfile.image;
        } else if (userProfile.name) {
            return `https://via.placeholder.com/150/000000/FFFFFF/?text=${userProfile.name[0]}`;
        }
        return '/default-profile.png'; // Fallback to default image
    };

    return (
        <div className="sidebar">
            <div className="profile">
                <img src={userProfile.image || 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359554_1280.png'} alt="Profile" className="profile-img" />
                
                <h2 className="profile-name">Name: {userProfile.name || 'Tejaswini Durge'}</h2>
                <p className="profile-email">Email: {userProfile.email || 'tejaswini@gmail.com'}</p>
            </div>
            <button className="view-receipt-button">View Receipt</button>
        </div>
    );
};

export default Sidebar;
