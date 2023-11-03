import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './stylesheeet/login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const checkAllInputs = () => {
        return email !== '' && password !== '';
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (checkAllInputs()) {
            //  make api call to log in the users
            setEmail('');
            setPassword('');

            toast.success('Login successful!', {
                position: toast.POSITION.TOP_RIGHT,
            });
        } else {
            if (email === '') {
                toast.error('Please fill email input.', {
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
            } else if (password === '') {
                toast.error('Please fill password input', {
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
            } else {
                toast.error('Please fill in all the input fields.', {
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
            }
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h3 className="card-title">Login</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Login
                    </button>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Login;
