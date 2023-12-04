import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ClipLoader from 'react-spinners/ClipLoader';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import '../assets/stylesheet/createDepartmentTicket.css'

const Registration = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [role, setRole] = useState<{ department: string }[]>([]);
    const [roles, setRoles] = useState<string[]>([]);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading state to true

        try {
            const data = JSON.stringify({
                username: email,
                password: password,
                role: role.label,
            });


            await fetch('http://localhost:8080/api/v1/users/registration/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Basic ' + localStorage.getItem('email_password_credentials'),
                },
                body: data,
            }).then((response) => {
                if (response.ok) {

                    localStorage.setItem('email', email);

                    toast.success('Registration successful!', {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                    navigate('/verification', { state: { email } });
                } else {
                    const errorResponse = response.json();
                    throw new Error(errorResponse.message);
                }
            });

            setRole(null);
            setEmail('');
            setPassword('');
        } catch (error) {
            toast.error('Failed to register user. Please try again later.', {
                position: toast.POSITION.TOP_CENTER,
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRoles();
    }, []);

    const fetchRoles = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/v1/authority/all', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/x-www-urlencoded',
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

    return (
        <>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="create-dept-card">
                            <div className="create-dept-card-body">
                                <h3 className="card-title">ADD USERS</h3>
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group-create">
                                        <label htmlFor="department">Roles *</label>
                                        <Select
                                            className={`select`}
                                            required
                                            options={roles.map((dept) => ({ value: dept, label: dept }))}
                                            value={role}
                                            onChange={(selectedOption) => setRole(selectedOption)}
                                            isSearchable
                                        />
                                    </div>
                                    <div className="form-group-create">
                                        <label htmlFor="email">Email *</label>
                                        <input
                                            required
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group-create">
                                        <label htmlFor="password">Password *</label>
                                        <input
                                            required
                                            type="password"
                                            className="form-control"
                                            id="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                    <div className={`form-group-create`}>
                                        <button type="submit" className="create-dept-button" disabled={loading}>
                                            {loading ? (
                                                <ClipLoader color="#ffffff" loading={loading} size={20} />
                                            ) : (
                                                'Register'
                                            )}
                                        </button>
                                    </div>
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

export default Registration;

export const ToastNotificationRegitration = () => {
    return <ToastContainer />;
};