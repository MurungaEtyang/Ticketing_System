import React, { useState } from 'react';
import Login from './Login';
import Registration from "./Registration";
import './stylesheeet/home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import logo from './images/logo.jpeg';
import { ToastNotificationRegitration } from "./Registration";
import { ToastNotificationLogin } from "./Login";
import { Link } from 'react-router-dom';

const Home: React.FC = () => {

    const [showLoginForm, setShowLoginForm] = useState(false);
    const [showRegisterForm, setShowRegisterForm] = useState(false);
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);

    const handleButtonClick = (formType: string) => {
        if (formType === 'login') {
            setShowLoginForm(true);
            setShowRegisterForm(false);
        } else if (formType === 'register') {
            setShowLoginForm(false);
            setShowRegisterForm(true);
        }
    };

    const handleProfileClick = () => {
        setShowProfileDropdown(!showProfileDropdown);
    };


    return (
        <>
            <body>
            <div className="home-container">
                <h1 className="home-title">CUSTOMER SERVICE PORTAL</h1>
                <p className="home-content">This is the content of the home page.</p>
                <nav className="nav-container">
                    <img src={logo} alt="Logo" className="logo" />

                    <div className="profile-dropdown">
                        <button className="profile-button" onClick={handleProfileClick}>
                            <FontAwesomeIcon icon={faUser} />
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
            </body>
            <ToastNotificationRegitration /> {/* Include the ToastNotification component here */}
            <ToastNotificationLogin /> {/* Include the ToastNotification component here */}
        </>
    );
};

export default Home;