// auth.ts

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {

        const token = localStorage.getItem('email_password_credentials');

        if (token) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
            navigate('/');
        }
    }, [navigate]);

    const login = () => {

        setIsAuthenticated(true);
        navigate('/')
    };

    const logout = () => {
        setIsAuthenticated(false);
        navigate('/');
    };

    return {
        isAuthenticated,
        login,
        logout,
    };
};