import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import './Login.css';  // External CSS file for styling

const Login = () => {
    const [role, setRole] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        if (!role) {
            setError('Please select role');
            setLoading(false);
            return;
        }

        if (!email || !password) {
            setError('Both email and password are required.');
            setLoading(false);
            return;
        }

        try {
            // Make POST request to login endpoint
            const result = await axios.post('http://localhost:3000/auth/login', { email, password });
            console.log(result.data);
            setSuccess(true);

            // Store the JWT token in local storage
            localStorage.setItem('token', result.data.token);

            // Display success message and redirect to dashboard
            setSuccess(true);
            setTimeout(() => {
                if (role === 'Student') {
                    navigate('/dashboard');
                } else if (role === 'Teacher') {
                    navigate('/tdashboard');
                }
            }, 2000);
        } catch (err) {
            console.error(err);
            setError('Invalid email or password. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <p className="tagline">Manage Your NOC Portal</p>
            <form onSubmit={handleSubmit} className="login-form">
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
                <button type="submit" className="login-button" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>

            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>Login successful! Redirecting...</p>}

            <p>Don't have an account?</p>
            <Link to="/register" className="register-link">Register</Link>
        </div>
    );
};

export default Login;