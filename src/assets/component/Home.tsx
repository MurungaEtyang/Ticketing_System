import React, { useState } from 'react';
import './stylesheeet/home.css';
import Logo from './images/Logo.png';
import {ClipLoader} from "react-spinners";
import {toast, ToastContainer} from "react-toastify";
import { useNavigate, Link } from 'react-router-dom';

const Home: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [nextClicked, setNextClicked] = useState(false);
    const navigate = useNavigate();

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleNextClick = () => {
        setNextClicked(true);
        setShowPassword(true);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (email === '' || password === '') {
            toast.error('Please fill in all the input fields.', {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
            return;
        }

        try {
            setLoading(true);

            const credentials: string = btoa(email + ":" + password)

            localStorage.setItem("email_password_credentials", credentials);

            localStorage.setItem("login_emails", email)
            const response = await fetch('http://localhost:8080/api/v1/login', {
                method: "GET",
                headers: {
                    // 'Content-Type': 'application/json',
                    Authorization: 'Basic ' + credentials,
                }
            });

            if (response.ok) {
                const data = await response.json();

                // store data authority in local storage
                localStorage.setItem('data_authority', data.authorities);
                // alert(localStorage.getItem('data_authority'))
                if (data.authorities == 'USER') {
                    navigate('/dashboard', { state: { email } });
                } else if (data.authorities == 'EMPLOYEE') {
                    navigate('/employee', { state: { email } });
                } else if (data.authorities == 'ADMIN' || data.authorities == 'OWNER' || data.authorities == 'DEPARTMENT_ADMIN') {
                    navigate('./admin', { state: { email } });

                } else {
                    toast.error('Invalid authority. Please contact the administrator.', {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                }
            } else if (response.status === 401) {
                toast.error('Invalid email or password. Please try again.', {
                    position: toast.POSITION.TOP_RIGHT,
                });
            } else if (response.status === 403) {
                toast.error('Email not verified. Please verify your email.', {
                    position: toast.POSITION.TOP_RIGHT,
                });
            } else {
                throw new Error('Server error');
            }
        } catch (error) {
            toast.error(error.message+' Failed to login. Please try again later.', {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="home-container">
                <nav className="nav-container"></nav>
                <div>
                    <img src={Logo} alt="Logo" className="logo" />
                    <h1>CUSTOMER SERVICE PORTAL</h1>
                </div>

                {/*<footer className="footer">*/}
                {/*    <p className="footer-text">© 2023 Customer Service Portal. All rights reserved.</p>*/}
                {/*</footer>*/}
            </div>

            <div>
                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="input-container">
                        <input
                            type="text"
                            placeholder="Email"
                            value={email}
                            onChange={handleEmailChange}
                            className="login-input"
                        />
                        {!nextClicked && (
                            <button
                                type="button"
                                className="btn btn-primary"
                                disabled={loading}
                                onClick={handleNextClick}
                            >
                                {loading ? (
                                    <ClipLoader color="#ffffff" loading={loading} size={20} />
                                ) : (
                                    'Next'
                                )}
                            </button>
                        )}
                    </div>
                    {nextClicked && showPassword && (
                        <>
                            <input
                                class="password"
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={handlePasswordChange}
                                className="login-input"
                            />
                            <button type="submit" className="btn btn-primary" disabled={loading}>
                                {loading ? (
                                    <ClipLoader color="#ffffff" loading={loading} size={20} />
                                ) : (
                                    'Login'
                                )}
                            </button>
                        </>
                    )}
                </form>

                {/*<footer>*/}
                {/*    <p className="footer-text">© 2022 Customer Service Portal. All rights reserved.</p>*/}
                {/*</footer>*/}
            </div>
            <ToastContainer />
        </>

    );
};

export default Home;