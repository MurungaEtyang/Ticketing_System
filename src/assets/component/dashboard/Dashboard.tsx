import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './dashboard.css';
import logo from '../images/logo.jpeg';
import Ticket from './Ticket';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

const Dashboard: React.FC = () => {
    const location = useLocation();
    const email = location.state?.email || '';

    const navigate = useNavigate();

    const [showTicket, setShowTicket] = useState(false);
    const [showLogoutDropdown, setShowLogoutDropdown] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [showMessageDropdown, setShowMessageDropdown] = useState(false);

    const [newNotificationCount, setNewNotificationCount] = useState(0);

    useEffect(() => {
        if (notificationMessage) {
            setNewNotificationCount(prevCount => prevCount + 1);
        }
    }, [notificationMessage]);


    const handleBookTicket = () => {
        // Toggle the visibility of the ticket component
        setShowTicket(!showTicket);
    };

    const handleProfile = () => {
        // Toggle the visibility of the logout dropdown
        setShowLogoutDropdown(!showLogoutDropdown);
    };

    const handleLogout = () => {
        navigate('/login');
    };

    const handleLogin = () => {
        navigate('/login');
    };

    const handleRegister = () => {
        navigate('/register');
    };

    const handleNotification = (message: string) => {
        setNotificationMessage(message);
    };

    const handleShowMessages = () => {
        setShowMessageDropdown(!showMessageDropdown);
    };



    return (
        <div className="container">
            <div className="content-container">
                <h1 className="home-title">CUSTOMER SERVICE PORTAL</h1>
                <p className="content-text">
                    Click the profile icon to access your account.
                </p>
                <p className="content-text">
                    If you don't have an account, click "Register" to create one.
                </p>
                <p className="content-text">
                    If you have registered for the first time, you need to verify your account.
                </p>
            </div>
            <nav className="nav-container">
                <div className="nav-left">
                    <img src={logo} alt="Logo" className="logo" />
                </div>

                <div className="nav-right">
                    {email && (
                        <>
                            <button className="btn btn-primary" onClick={handleBookTicket}>
                                {showTicket ? 'Hide Ticket' : 'Book Ticket'}
                            </button>
                            <div className="notification-icon">
                                <FontAwesomeIcon icon={faBell} onClick={handleShowMessages} />
                                {showMessageDropdown && (
                                    <div className="message-dropdown">
                                        {notificationMessage ? (
                                            <span className="message-item">{notificationMessage}</span>
                                        ) : (
                                            <span className="message-item">No new notifications</span>
                                        )}
                                    </div>
                                )}
                                {newNotificationCount > 0 && (
                                    <div className={`badge ${showMessageDropdown ? 'empty' : ''}`}>
                                        {newNotificationCount}
                                    </div>
                                )}
                            </div>

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
            {showTicket && <Ticket setNotificationMessage={handleNotification} />}
            <ToastContainer />
        </div>
    );
};

export default Dashboard;