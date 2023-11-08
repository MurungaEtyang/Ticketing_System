import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './dashboard.css';
import logo from '../images/logo.jpeg';

const Dashboard: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const email = location.state?.email || '';

    const [showLogoutDropdown, setShowLogoutDropdown] = useState(false);

    const handleBookTicket = () => {
        // Navigate to the 'Ticket' component (Ticket.tsx)
        if (email) {
            navigate('/ticket');
        } else {
            toast.error('You are not logged in.', {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        }
    };

    const handleProfile = () => {
        // Toggle the visibility of the logout dropdown
        setShowLogoutDropdown(!showLogoutDropdown);
    };

    const handleLogout = () => {
        navigate('./');
    };

    const handleLogin = () => {
        navigate('/login');
    };

    const handleRegister = () => {
        navigate('/register');
    };

    return (
        <div className="container">
            <nav className="nav-container">
                <div className="nav-left">
                    <img src={logo} alt="Logo" className="logo" />
                </div>
                <div className="nav-right">
                    {email && (
                        <>
                            <button className="btn btn-primary" onClick={handleBookTicket}>
                                Book Ticket
                            </button>
                            <div className="profile-dropdown">
                                <button className="profile-button" onClick={handleProfile}>
                                    Profile
                                </button>
                                {showLogoutDropdown && (
                                    <div className="dropdown-content">
                                        <p>{email}</p>
                                        <button className="dropdown-button" onClick={handleLogout}>
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                    {!email && (
                        <div className="profile-dropdown">
                            <button className="profile-button" onClick={handleProfile}>
                                Profile
                            </button>
                            {showLogoutDropdown && (
                                <div className="dropdown-content">
                                    <button className="dropdown-button" onClick={handleLogin}>
                                        Login
                                    </button>
                                    <button className="dropdown-button" onClick={handleRegister}>
                                        Register
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </nav>
            <ToastContainer />
        </div>
    );
};

export default Dashboard;