import React, { useState } from 'react';
import Login from './Login';
import './stylesheeet/home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import Logo from './images/Logo.png';
import { ToastNotificationLogin } from "./Login";

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
        <div className="home-container">
            <div className="content-container">
                <h1 className="home-title" >CUSTOMER SERVICE PORTAL</h1>
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
                <img src={Logo} alt="Logo" className="logo" />

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


                        </div>
                    )}
                </div>

            </nav>

            <ToastNotificationLogin /> {/* Include the ToastNotification component here */}


        </div>
    );
};

export default Home;