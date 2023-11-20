import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { css } from '@emotion/react';
import { ClipLoader } from 'react-spinners';
import {Link, useNavigate} from 'react-router-dom';
import { RegisterApi } from '../../handleApi/HandleApi.tsx'


const Registration = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    // const [verificationCode, setVerificationCode] = useState('');
    const navigate = useNavigate();
    // const [userVerificationCode, setUserVerificationCode] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!checkAllInputs()) {
            toast.error('Please fill in all the input fields.', {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
            return;
        }

        setLoading(true);

        try {

            // handleApi

            const formData = new FormData();
            formData.append("email", email);
            formData.append("password", password);

            fetch("http://localhost:8080/api/v1/users/registration/register", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Authorization: 'Basic ' + localStorage.getItem('email_password_credentials')
                },
                body: formData
            }).then(response => {
                alert(response);
                navigate('/verification', { state: { email } });

                // Show success toast notification
                toast.success('Registration successful!', {
                    position: toast.POSITION.TOP_RIGHT,
                });
            });

            // Reset the form fields
            setFirstName('');
            setLastName('');
            setEmail('');
            setPassword('');
        } catch (error) {

                // alert(error)
            toast.error('Failed to register user. Please try again later.', {
                position: toast.POSITION.TOP_CENTER,
            });
        } finally {
            setLoading(false);
        }
    };

    const checkAllInputs = () => {
        return firstName !== '' && lastName !== '' && email !== '' && password !== '';
    };

    const override = css`
        display: block;
        margin: 0 auto;
    `;

    return (
        <>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <h3 className="card-title">REGISTER TO CUSTOMER SERVICE PORTAL</h3>
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="firstname">First name *</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="firstname"
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="lastname">Last name *</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="lastname"
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Email *</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">Password *</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                    {/*<div className="form-group">*/}
                                    {/*    <button*/}
                                    {/*        type="button"*/}
                                    {/*        className="btn btn-secondary"*/}
                                    {/*        onClick={generateVerificationCode}*/}
                                    {/*    >*/}
                                    {/*        Get Code*/}
                                    {/*    </button>*/}
                                    {/*</div>*/}
                                    <button type="submit" className="btn btn-primary" disabled={loading}>
                                        {loading ? (
                                            <ClipLoader color="#ffffff" loading={loading} css={override} size={20} />
                                        ) : (
                                            'Register'
                                        )}
                                    </button>

                                    {/*<div className="login-link">*/}
                                    {/*    Already have an account?{' '}*/}
                                    {/*    <Link to="/login" onClick={redirectLogin}>*/}
                                    {/*        Login*/}
                                    {/*    </Link>*/}
                                    {/*</div>*/}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*<ToastContainer />*/}
        </>
    );
};

export default Registration;

export const ToastNotificationRegitration = () => {
    return <ToastContainer />
}