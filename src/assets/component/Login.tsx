import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { css } from '@emotion/react';
import { ClipLoader } from 'react-spinners';
import './stylesheeet/login.css';
import { useNavigate, Link } from 'react-router-dom';

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

            const credentials:string = btoa(email+":"+password)

            localStorage.setItem("email_password_credentials",credentials);

            await fetch('http://localhost:8080/api/v1/users/management/'+email, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Basic '+ credentials,
                }
            }).then(response => {

                if (response.ok) {
                    if (response != null) {

                        return response.json();

                    }

                }
                else {
                    alert(JSON.stringify(response))
                    // toast.error('Invalid email or password. Please try again.', {
                    //     position: toast.POSITION.TOP_CENTER,
                    // });
                }
            }).then(data => {

                if (data.authority === 'USER') {
                    navigate('/dashboard', { state: { email }});
                    return;
                }else if(data.authority === 'EMPLOYEE'){
                    navigate('/employee', { state: { email }});
                    return;
                }else if(data.authority === 'ADMIN' || data.authority === 'OWNER'){
                    navigate('./admin', {state: { email }});
                    return;
                }
                toast.success('You are successfully log in.', {
                    position: toast.POSITION.TOP_RIGHT,
                });

            })

            // Reset the form fields
            setEmail('');
            setPassword('');

        } catch (error) {
            toast.error('Invalid email or password. Please try again.', {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        } finally {
            setLoading(false);
        }
    };

    const override = css`
        display: block;
        margin: 0 auto;
    `;

    const redirectRegister = () => {
        navigate('/register');
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title">LOGIN TO CUSTOMER SERVICE PORTAL</h3>
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
                                <div className="register-link">
                                    Don't have an account?{' '}
                                    <Link to="/register" onClick={redirectRegister}>
                                        Register
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {/*<ToastContainer />*/}
        </div>
    );
};

export default Login;
export const ToastNotificationLogin = () => {
    return <ToastContainer />;
};