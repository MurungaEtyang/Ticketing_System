import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSpring, animated } from 'react-spring';
import { useInView } from 'react-intersection-observer';
import '../stylesheeet/dashboard.css';
import Logo from "../images/Logo.png"
import Image1 from "../images/Image1.png"
import Ticket from './ticketHandle/Ticket';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import AllSentTickets from "./ticketHandle/AllSentTickets";
import TicketTrackProgress from "./ticketHandle/TicketTrackProgress";

const AnimatedAllSentTickets = animated(AllSentTickets);

const Dashboard: React.FC = () => {
    const location = useLocation();
    const email = location.state?.email || '';
    const navigate = useNavigate();

    const [showTicket, setShowTicket] = useState(false);
    const [showLogoutDropdown, setShowLogoutDropdown] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [showMessageDropdown, setShowMessageDropdown] = useState(false);
    const [showButtonDropdown, setShowButtonDropdown] = useState(false);
    const [showSentTickets, setShowSentTickets] = useState(false);
    const [showTicketTracking, setShowTicketTracking] = useState(false);
    const [newNotificationCount, setNewNotificationCount] = useState(0);

    const handleButtonShow = () => {
        setShowButtonDropdown(!showButtonDropdown);
        setShowSentTickets(false);
        setShowTicketTracking(false);
    }

    const handleLogout = async () => {
        try {
            const response = await fetch("http://localhost:8080/logout", {
                method: "GET",
                headers: {
                    Authorization: 'Basic ' + localStorage.getItem('email_password_credentials')
                },
            });
            if (response.status === 204) {
                navigate("/");
            } else {
                alert("Logout failed.");
            }
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
        setShowTicketTracking(!showTicketTracking);
        setShowButtonDropdown(false);
        setShowTicket(false);
        setShowSentTickets(false);
    }

    const handleProfile = () => {
        setShowLogoutDropdown(!showLogoutDropdown);
        setShowButtonDropdown(false);
        setShowTicket(false);
        setShowSentTickets(false);
        setShowTicketTracking(false);
    };

    const handleMyTickets = () => {
        setShowTicket(false);
        setShowButtonDropdown(false);
        setShowSentTickets(true);  // Set showSentTickets to true to display the "My Tickets" section
        setShowTicketTracking(false);
        setShowLogoutDropdown(false);
    }

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

    // Define the intersection observer for the ticket-tracking section
    const [ref, inView] = useInView({
        triggerOnce: true, // Only trigger the animation once
    });

    // Define the spring animation for the ticket-tracking section
    const ticketTrackingAnimation = useSpring({
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0px)' : 'translateY(50px)',
    });

    return (
        <>
            <div className="container">
                <nav className="nav-container">
                    <img src={Logo} alt="Logo" />
                    <div className="nav-buttons">
                        <div className="dropdown">
                            <button className={`dropdown-button ${showButtonDropdown ? 'active' : ''}`} onClick={handleButtonShow}>
                                Track Ticket
                            </button>
                            {showButtonDropdown && (
                                <div className="dropdown-content">
                                    <button onClick={handleSentTickets}>My Tickets</button>
                                    <button onClick={handleTicketTracking}>Ticket Status</button>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="nav-right">
                        {email ? (
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
                                            {/*<p>{email}</p>*/}
                                            <button className="dropdown-button" onClick={handleLogout}>
                                                Logout
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </>
                        ) : (
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

            <div className="main-selection">
                <section>
                    <div className='dashboard-container-images'>
                        <img src={Image1} alt="Image1" />
                    </div>

                </section>

                <section className='dashboard-container'>
                    <div className={`book-ticket`}>
                        <Ticket />
                    </div>
                </section>

                <section className="ticket-tracking" ref={ref}>
                    <animated.div style={ticketTrackingAnimation}>
                        <h3 className="ticket-title">LIST OF ALL TICKETS I HAVE SUBMITTED</h3>
                        <div className={`show-sent-tickets`}>
                            <AnimatedAllSentTickets />
                        </div>
                    </animated.div>
                </section>
            </div>
        </>
    );
};

export default Dashboard;
