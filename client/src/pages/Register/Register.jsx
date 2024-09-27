import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');  // Clear any previous errors
        setLoading(true);  // Start loading
        
        // Basic validation
        if (!name || !email || !password) {
            setError('All fields are required.');
            setLoading(false);
            return;
        }
        
        if (password.length < 4) {
            setError('Password must be at least 6 characters.');
            setLoading(false);
            return;
        }
        
        try {
            const result = await axios.post('http://localhost:3000/auth/register', { name, email, password });
            console.log(result.data);
            setSuccess(true);
        } catch (err) {
            console.error(err);
            setError('Registration failed. Please try again.');
        } finally {
            setLoading(false);  // End loading
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    placeholder="Name" 
                    required 
                />
                <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="Email" 
                    required 
                />
                <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="Password" 
                    required 
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Registering...' : 'Register'}
                </button>
            </form>
            
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>Registration successful!</p>}
            
            <p>Already have an Account?</p>
            <Link to="/login" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">Login</Link>
        </div>
    );
};

export default Register;