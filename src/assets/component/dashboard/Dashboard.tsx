import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../stylesheeet/dashboard.css';
import Logo from "../images/Logo.png"
import Ticket from './ticketHandle/Ticket';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import AllSentTickets from "./ticketHandle/AllSentTickets";
import TicketTrackProgress from "./ticketHandle/TicketTrackProgress";

const Dashboard: React.FC = () => {
    const location = useLocation();
    const email = location.state?.email || '';

    const navigate = useNavigate();

    const [showTicket, setShowTicket] = useState(false);
    const [showLogoutDropdown, setShowLogoutDropdown] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [showMessageDropdown, setShowMessageDropdown] = useState(false);
    const [showButtonDropdown, setShowButtonDropdown] = useState(false)
    const [showSentTickets, setShowSentTickets] = useState(false);
    const [showTicketTracking, setShowTicketTracking] = useState(false)
    const [newNotificationCount, setNewNotificationCount] = useState(0);

    const handleButtonShow = () => {
        setShowButtonDropdown(!showButtonDropdown);
        setShowSentTickets(false);
        setShowTicketTracking(false);
    }

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
        setShowTicket(!showTicket);
        setShowButtonDropdown(false);
        setShowSentTickets(false);
        setShowTicketTracking(false);
    };

    const handleSentTickets = () => {
        setShowSentTickets(!showSentTickets);
        setShowButtonDropdown(false);
        setShowTicket(false);
        setShowTicketTracking(false);
    }

    const handleTicketTracking = () => {
        // setShowTicketTracking(!showTicketTracking);
        // setShowButtonDropdown(false);
        // setShowTicket(false);
        // setShowSentTickets(false);

        navigate('/tickets_check')
    }

    const handleProfile = () => {
        setShowLogoutDropdown(!showLogoutDropdown);
        setShowButtonDropdown(false);
        setShowTicket(false);
        setShowSentTickets(false);
        setShowTicketTracking(false);
    };

    const handleLogin = () => {
        navigate('/login');
    };

    const handleNotification = (message: string) => {
        setNotificationMessage(message);
    };

    const handleShowMessages = () => {
        setShowMessageDropdown(true);
        setShowButtonDropdown(false);
        setShowTicket(false);
        setShowSentTickets(false);
        setShowTicketTracking(false);
    };

    return (
        <>
            <div className="container">
                <nav className="nav-container">
                    <img src={Logo} />
                    <div className="nav-buttons">
                        <div className="nav-button">
                            <button onClick={handleBookTicket}>Book Ticket</button>
                        </div>
                        {/* Show drop down */}
                        <div className="dropdown">
                            <button className={`dropdown-button ${showButtonDropdown ? 'active' : ''}`} onClick={handleButtonShow}>
                                follow up
                            </button>
                            {showButtonDropdown && (
                                <div className="dropdown-content">
                                    <button onClick={handleSentTickets}>Sent Tickets</button>
                                    <button onClick={handleTicketTracking}>Track Ticket</button>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="nav-right">
                        {email && (
                            <>
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
                                        <div className={`badge ${showMessageDropdown ? 'empty' : ''}`}>{newNotificationCount}</div>
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
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </nav>


            </div>

            <div className="dashboard-body-container">
                <div>
                    <div className="book-ticket">
                        {showTicket && <Ticket />}
                    </div>
                    <div className="show-sent-tickets">
                        {showSentTickets && <AllSentTickets />}
                    </div>
                    <div className="ticket-tracking-progress">
                        {showTicketTracking && <TicketTrackProgress />}
                    </div>
                </div>

                {/*footer*/}
                <div>
                    <footer>
                        <h4>this is the footer</h4>
                        <p>this is the paragraph of the footer</p>
                    </footer>
                </div>
            </div>
        </>
    );
};

export default Dashboard;