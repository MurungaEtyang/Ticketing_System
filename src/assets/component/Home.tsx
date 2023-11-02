import React, { useState } from 'react';
import Login from './Login';
import Registration from "./Registration.tsx";
import './stylesheeet/home.css'

const Home: React.FC = () => {

    const [showLoginForm, setShowLoginForm] = useState(false);
    const [showRegisterForm, setShowRegisterForm] = useState(false);

    const handleButtonClick = (formType: string) => {
        if (formType === 'login') {
            setShowLoginForm(true);
            setShowRegisterForm(false);
        } else if (formType === 'register') {
            setShowLoginForm(false);
            setShowRegisterForm(true);
        }
    };

    return (
        <div className="home-container">
            <h1 className="home-title">Welcome to the Home Page</h1>
            <p className="home-content">This is the content of the home page.</p>

            {showLoginForm ? (
                <Login />
            ) : (
                <button className="home-button" onClick={() => handleButtonClick('login')}>
                    Login
                </button>
            )}

            {showRegisterForm ? (
                <Registration />
            ) : (
                <button className="home-button" onClick={() => handleButtonClick('register')}>
                    Register
                </button>
            )}
        </div>
    );
};

export default Home;