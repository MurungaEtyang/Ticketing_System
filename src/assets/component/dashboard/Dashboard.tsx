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
    const email = localStorage.getItem('login_emails')
    const navigate = useNavigate();

    const [showTicket, setShowTicket] = useState(false);
    const [showLogoutDropdown, setShowLogoutDropdown] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [showMessageDropdown, setShowMessageDropdown] = useState(false);
    const [showButtonDropdown, setShowButtonDropdown] = useState(false);
    const [showSentTickets, setShowSentTickets] = useState(false);
    const [showTicketTracking, setShowTicketTracking] = useState(false);
    const [newNotificationCount, setNewNotificationCount] = useState(0);

    const handleLogout = async () => {

        await fetch("http://localhost:8080/logout", {
            method: "GET",
            headers: {
                Authorization: 'Basic ' + localStorage.getItem('email_password_credentials')
            },
        }).then(response => navigate("/")).catch(error => navigate("/"));



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
                    <div className="profile-dropdown">
                        <button className="dropdown-button" onClick={handleLogout}>
                            {email}
                        </button>

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

            </div>
        </>
    );
};

export default Dashboard;
