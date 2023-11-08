import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { css } from '@emotion/react';
import { ClipLoader } from 'react-spinners';
import './stylesheeet/login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (email === '' || password === '') {
            toast.error('Please fill in all the input fields.', {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
            return;
        }

        try {
            setLoading(true);

            // Make API call to log in the user
            // const response = await axios.post('http://localhost:3000/api/login', {
            //     email,
            //     password,
            // });

            // Reset the form fields
            // setEmail('');
            // setPassword('');

            // Do something with the response data
            // console.log(response.data);

            // Show success toast notification
            toast.success('Login successful!', {
                position: toast.POSITION.TOP_RIGHT,
            });

            // Redirect to the Dashboard component
            navigate('/dashboard', { state: { email }});
        } catch (error) {
            toast.error('Failed to login. Please try again later.', {
                position: toast.POSITION.TOP_CENTER,
            });
        } finally {
            setLoading(false);
        }
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
                            <h3 className="card-title">Login form</h3>
                            <form onSubmit={handleSubmit}>
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
                                        'Login'
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Login;
export const ToastNotificationLogin = () => {
    return <ToastContainer />;
};