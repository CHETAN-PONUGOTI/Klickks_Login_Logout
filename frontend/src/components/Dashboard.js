import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../index.css'
const API_URL = process.env.REACT_APP_API_BASE_URL;

function Dashboard({ setLoggedIn }) {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
            setLoggedIn(false);
            navigate('/login');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <div className="dashboardStyle">
            <h2 className="headerStyle">Dashboard</h2>
            <p className="paragraphStyle">Welcome! You are successfully logged in.</p>
            <button
                onClick={handleLogout}
                className="logout-button-dashboard"
            >
                Logout
            </button>
        </div>
    );
}

export default Dashboard;