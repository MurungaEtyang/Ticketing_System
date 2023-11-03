
import React, { useState } from 'react';
import Login from './Login';
import Registration from "./Registration";
import './stylesheeet/home.css'
import Ticket from "./dashboard/Ticket";

const Home: React.FC = () => {

    const [showLoginForm, setShowLoginForm] = useState(false);
    const [showRegisterForm, setShowRegisterForm] = useState(false);
    const [showTicketForm, setShowTicketForm] = useState(false);
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);

    const handleButtonClick = (formType: string) => {
        if (formType === 'login') {
            setShowLoginForm(true);
            setShowRegisterForm(false);
        } else if (formType === 'register') {
            setShowLoginForm(false);
            setShowRegisterForm(true);
        } else if (formType === 'ticket') {
            setShowTicketForm(false);
        }
    };

    const handleProfileClick = () => {
        setShowProfileDropdown(!showProfileDropdown);
    };

    return (
        <div className="home-container">
            <h1 className="home-title">Welcome to the Home Page</h1>
            <p className="home-content">This is the content of the home page.</p>

            <nav className="nav-container">
                {showTicketForm ? (
                    <Ticket />
                ) : (
                    <button className="ticket-button" onClick={() => handleButtonClick('ticket')} disabled={!showLoginForm && !showRegisterForm}>
                        Ticket
                    </button>
                )}

                <div className="profile-dropdown">
                    <button className="profile-button" onClick={handleProfileClick}>
                        Profile
                    </button>
                    {showProfileDropdown && (
                        <div className="dropdown-content">
                            {showLoginForm ? (
                                <div className="form-container">
                                    <Login />
                                </div>
                            ) : (
                                <button className="dropdown-button" onClick={() => handleButtonClick('login')}>
                                    Login
                                </button>
                            )}

                            {showRegisterForm ? (
                                <div className="form-container">
                                    <Registration />
                                </div>
                            ) : (
                                <button className="dropdown-button" onClick={() => handleButtonClick('register')}>
                                    Register
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </nav>
        </div>
    );
};

export default Home;
