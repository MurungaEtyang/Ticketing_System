import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './dashboard.css';
import Logo from '../images/Logo.png';
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

    const handleLogout = async () => {
        try {
            await fetch("http://localhost:8080/logout", {
                method: "GET",
                headers: {
                    Authorization: 'Basic ' + localStorage.getItem('email_password_credentials')
                },
            });

            const navigate = useNavigate();
            navigate("/");
        } catch (error) {
            alert("Logout failed: " + error);
        }
    };


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

    const handleLogin = () => {
        navigate('/login');
    };


    const handleNotification = (message: string) => {
        setNotificationMessage(message);
    };

    const handleShowMessages = () => {
        setShowMessageDropdown(!showMessageDropdown);
    };



    return (
        <div className="container">

            <nav className="nav-container">


                <div className="nav-right">
                    {email && (
                        <>

                            <button className="btn btn-primary" onClick={handleBookTicket}>
                                {showTicket ? 'Hide Ticket' : 'Book Ticket'}
                            </button>
                            <div className="notification-icon">
                                {/*<FontAwesomeIcon icon={faBell} onClick={handleShowMessages} />*/}
                                {/*{showMessageDropdown && (*/}
                                {/*    <div className="message-dropdown">*/}
                                {/*        {notificationMessage ? (*/}
                                {/*            <span className="message-item">{notificationMessage}</span>*/}
                                {/*        ) : (*/}
                                {/*            <span className="message-item">No new notifications</span>*/}
                                {/*        )}*/}
                                {/*    </div>*/}
                                {/*)}*/}
                                {/*{newNotificationCount > 0 && (*/}
                                {/*    <div className={`badge ${showMessageDropdown ? 'empty' : ''}`}>*/}
                                {/*        {newNotificationCount}*/}
                                {/*    </div>*/}
                                {/*)}*/}


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

                                </div>
                            )}
                        </div>
                    )}
                </div>

            </nav>

            {/*<div className="content-container">*/}
            {/*    */}
            {/*</div>*/}
            {showTicket && <Ticket setNotificationMessage={handleNotification} />}
            <ToastContainer />
        </div>
    );
};

export default Dashboard;