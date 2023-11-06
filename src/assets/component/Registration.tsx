
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { css } from '@emotion/react';
import { ClipLoader } from 'react-spinners';
import './stylesheeet/registration.css';


const Home = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (checkAllInputs()) {
            try {
                setLoading(true); // Set loading state to true

                const newUser = {
                    firstName,
                    lastName,
                    email,
                    password,
                };

                // Make API call to register the user
                await axios.post('http://localhost:3000/api/register', newUser);

                // Reset the form fields
                setFirstName('');
                setLastName('');
                setEmail('');
                setPassword('');

                // Show success toast notification
                toast.success('Registration successful!',{
                    position: toast.POSITION.TOP_RIGHT,
                });

            } catch (error) {
                toast.error('Failed to register user. Please try again later.', {
                    position: toast.POSITION.TOP_CENTER,
                });
            } finally {
                setLoading(false);
            }
        } else {
            if (firstName === '') {
                toast.error('Please fill First Name input.',{
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
            } else if (lastName === '') {
                toast.error('Please fill Last Name input.',{
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
            } else if (email === '') {
                toast.error('Please fill email input.',{
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
            } else if (password === '') {
                toast.error('Please fill password input',{
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
            } else {
                toast.error('Please fill in all the input fields.',{
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
            }
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
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title">Registration form</h3>
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
                                <button type="submit" className="btn btn-primary" disabled={loading}>
                                    {loading ? (
                                        <ClipLoader color="#ffffff" loading={loading} css={override} size={20} />
                                    ) : (
                                        'Register'
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;

// Move the ToastContainer outside of the Home component
export const ToastNotificationRegitration = () => {
    return <ToastContainer />;
};
