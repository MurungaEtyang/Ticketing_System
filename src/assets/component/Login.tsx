// components/LoginForm.jsx
import React from 'react';

const LoginForm = ({ email, password, onEmailChange, onPasswordChange, onSubmit, loading }) => {
    return (
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={onEmailChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password *</label>
                <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={onPasswordChange}
                />
            </div>
            <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Loading...' : 'Login'}
            </button>
        </form>
    );
};

export default LoginForm;
