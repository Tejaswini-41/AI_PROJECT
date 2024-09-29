import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import './Card.css'; // Adjust the path if necessary

const Card = ({ title, description }) => {
    const navigate = useNavigate(); // Use the useNavigate hook

    const handleClick = () => {
        navigate('/assigned-tasks'); // Navigate to the assigned tasks route
    };

    return (
        <div className="card" onClick={handleClick}>
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    );
};

export default Card;
