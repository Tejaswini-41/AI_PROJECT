import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Register.css'; // Import the CSS file for styling

const Register = () => {
    const navigate = useNavigate(); // Initialize the navigate function
    const [role, setRole] = useState('Student'); // New state for role
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Basic validation
        if (!role) { // Ensure role is selected
            setError('Please select a role.');
            setLoading(false);
            return;
        }
        if (!name || !email || !password) {
            setError('All fields are required.');
            setLoading(false);
            return;
        }

        // Password validation
        // const passwordValidation = /^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[@$!%?&])[A-Za-z\d@$!%?&]{6,}$/;
        // if (!passwordValidation.test(password)) {
        //     setError('Password must include uppercase, lowercase, number, and special character.');
        //     setLoading(false);
        //     return;
        // }
<<<<<<< Updated upstream

=======
        
>>>>>>> Stashed changes
        try {
            const result = await axios.post('http://localhost:3000/auth/register', { name, email, password, role });
            console.log(result.data);
            setSuccess(true);
            navigate('/login'); // Navigate to the login page after successful registration
        } catch (err) {
            console.error(err);
            setError('Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-container">
            <h2>Registration</h2>
            <p>Sign Up for NOC Portal</p>
            <form onSubmit={handleSubmit} className="register-form">
                {/* New Dropdown for Role Selection */}
                <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="role-select"
                    required
                >
                    <option value="">Select Role</option>
                    <option value="Student">Student</option>
                    <option value="Teacher">Teacher</option>
                </select>

                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    required
                    className="input-field"
                />
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                    className="input-field"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                    className="input-field"
                />
                <button type="submit" disabled={loading} className="register-button">
                    {loading ? 'Registering...' : 'Register'}
                </button>
            </form>

            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">Registration successfull!</p>}

            <p>Already have an Account?</p>
            <Link to="/login" className="login-link">Login</Link>
        </div>
    );
};

export default Register;