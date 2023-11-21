import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ClipLoader from 'react-spinners/ClipLoader';
import { Link, useNavigate } from 'react-router-dom';
import Select from 'react-select';

const ElevateUser = () => {
    const [loading, setLoading] = useState(false);
    const [role, setRole] = useState<{ department: string }[]>([]);
    const [roles, setRoles] = useState<string[]>([]);
    const [user, setUser] = useState<{ department: string }>({ department: '' });
    const [users, setUsers] = useState<string[]>([]);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading state to true

        try {
            const data = JSON.stringify({
                role: role.label,
                username: user.label
            });

            await fetch('http://localhost:8080/api/v1/users/management/elevate?authority='+ role.label +
                '&username=' + user.label, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Basic ' + localStorage.getItem('email_password_credentials'),
                },
                body: data,
            }).then((response) => {
                if (response.ok) {

                    toast.success('User elevated successful!', {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                } else {
                    const errorResponse = response.json();
                    throw new Error(errorResponse.message);
                }
            });

            setUser(null);
            setUser(null)
        } catch (error) {
            toast.error('Failed to upgrade user. Please try again later.', {
                position: toast.POSITION.TOP_CENTER,
            });
        } finally {
            setLoading(false); // Set loading state to false after API call is completed
        }
    };

    useEffect(() => {
        fetchRoles();
        fetchUsername();
    }, []);

    const fetchRoles = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/v1/authority/all', {
                method: 'GET',
                headers: {
                    Authorization: 'Basic ' + localStorage.getItem('email_password_credentials'),
                },
            });
            const data = await response.json();
            const role = data.map((user) => user.authority);
            setRoles(role);
        } catch (error) {
            toast.error('Failed to fetch roles. Please try again.', {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        }
    };

    const fetchUsername = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/v1/users/management', {
                method: 'GET',
                headers: {
                    Authorization: 'Basic ' + localStorage.getItem('email_password_credentials'),
                },
            });
            const data = await response.json();
            const users = data.map((user) => ({ value: user.username, label: user.username }));
            setUsers(users);
        } catch (error) {
            toast.error('Failed to fetch users. Please try again.', {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        }
    };

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
                                        <label htmlFor="roles">ROLES *</label>
                                        <Select
                                            required
                                            options={roles.map((dept) => ({ value: dept, label: dept }))}
                                            value={role}
                                            onChange={(selectedOption) => setRole(selectedOption)}
                                            isSearchable
                                        />

                                        <label htmlFor="users">USER *</label>
                                        <Select
                                            required
                                            options={users}
                                            value={user}
                                            onChange={(selectedOption) => setUser(selectedOption)}
                                            isSearchable
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary" disabled={loading}>
                                        {loading ? (
                                            <ClipLoader color="#ffffff" loading={loading} size={20} />
                                        ) : (
                                            'Elevate Users'
                                        )}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
};

export default ElevateUser;

export const ToastNotificationRegitration = () => {
    return <ToastContainer />;
};