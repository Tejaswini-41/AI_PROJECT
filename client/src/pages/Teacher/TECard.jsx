import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import './TCard.css'; // Adjust the path if necessary

const Card = ({ title, description }) => {
    const navigate = useNavigate(); // Use the useNavigate hook

    const handleClick = () => {
        navigate('/manage-task'); // Navigate to the assigned tasks route
    };

    return (
        <div className="card" onClick={handleClick}>
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    );
};
    
export default Card;
