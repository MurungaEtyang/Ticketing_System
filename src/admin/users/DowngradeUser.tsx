import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ClipLoader from 'react-spinners/ClipLoader';
import Select from 'react-select';

const DowngradeUser = () => {
    const [loading, setLoading] = useState(false);
    const [role, setRole] = useState<{ department: string }[]>([]);
    const [roles, setRoles] = useState<string[]>([]);
    const [user, setUser] = useState<{ department: string }>({ department: '' });
    const [users, setUsers] = useState<string[]>([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
            try {
                await fetch('http://localhost:8080/api/v1/users/management/downgrade?username='+ user.label +
                    '&role_to_remove=' + role.label, {
                    method: 'GET',
                    headers: {
                        Authorization: 'Basic ' + localStorage.getItem('email_password_credentials'),
                    }
                }).then((response) => {
                    if (response.ok) {

                        toast.success('User demoted successful!', {
                            position: toast.POSITION.TOP_RIGHT,
                        });
                    } else {
                        const errorResponse = response.json();
                        throw new Error(errorResponse.message);
                    }
                }).catch((err) => {
                    toast.error(err.message, {
                        position: toast.POSITION.BOTTOM_RIGHT,
                    });
                }).finally(() => {
                    setUser(null);
                    setUser(null);
                    setLoading(false);
                });
            }catch (err) {
                alert(err.message)
                setLoading(false);
            }
        setLoading(false);

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
                                <h3 className="card-title">DEMOTE USERS</h3>
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
                                            'Demote Users'
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

export default DowngradeUser;

export const ToastNotificationRegitration = () => {
    return <ToastContainer />;
};