import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ClipLoader from 'react-spinners/ClipLoader';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import '../assets/stylesheet/createDepartmentTicket.css'

import ApiServices from '../../handleApi/ApiServices.ts'

const Registration = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [role, setRole] = useState<{ department: string }[]>([]);
    const [roles, setRoles] = useState<string[]>([]);
    const navigate = useNavigate();
    const apiServices = new ApiServices();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await apiServices.registrationOfUsers(
                role.label, email, password
            )
            if (response.success) {
                localStorage.setItem('email', email);
                toast.success('Registration successful!', {
                    position: toast.POSITION.TOP_RIGHT,
                });
                navigate('/verification', { state: { email } });
            } else {
                toast.error('Registration failed!', {
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
            }
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
        setLoading(true);
        try {
            const result = await apiServices.fetchRolesDepartmentAuthorities();
            if (result.success) {
                const role = result.data.map((user) => user.authority);
                setRoles(role);
            } else {
                console.error(result.error);
            }
        } catch (error) {
            // Handle other errors, if needed
            console.error('Error fetching roles:', error);
        }

        setLoading(false);
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
                                        {loading ? (

                                            <div>Loading...</div>
                                        ) : (
                                            <Select
                                                className={`select`}
                                                required
                                                options={roles.map((dept) => ({ value: dept, label: dept }))}
                                                value={role}
                                                onChange={(selectedOption) => setRole(selectedOption)}
                                                isSearchable
                                            />
                                        )}
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