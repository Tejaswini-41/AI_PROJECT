import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import './Login.css';  // External CSS file for styling

const Login = () => {
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

        if (!email || !password) {
            setError('Both email and password are required.');
            setLoading(false);
            return;
        }

        try {
            // Make POST request to login endpoint
            const result = await axios.post('http://localhost:3000/auth/login', { email, password });
            
            // Store the token in local storage
            localStorage.setItem('authToken', result.data.token);
            console.log(result.data);
            
            // Display success message and redirect to dashboard
            setSuccess(true);
            setTimeout(() => {
                navigate('/dashboard'); 
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
            <h2>Student Login</h2>
            <p className="tagline">Manage Your NOC Portal</p>
            <form onSubmit={handleSubmit} className="login-form">
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
