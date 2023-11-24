import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute: React.FC<{
    path: string;
    element: React.ReactNode;
    isAuthenticated: boolean;
}> = ({ path, element, isAuthenticated }) => {
    return isAuthenticated ? (
        <Route path={path} element={element} />
    ) : (
        <Navigate to="/login" replace state={{ from: path }} />
    );
};

export default PrivateRoute;