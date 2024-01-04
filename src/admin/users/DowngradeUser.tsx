import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ClipLoader from 'react-spinners/ClipLoader';
import Select from 'react-select';
import ApiServices from "../../handleApi/ApiServices.ts";

const DowngradeUser = () => {
    const [loading, setLoading] = useState(false);
    const [role, setRole] = useState<{ department: string }>({ department: ''});
    const [roles, setRoles] = useState<string[]>([]);
    const [user, setUser] = useState<{ department: string }>({ department: '' });
    const [users, setUsers] = useState<string[]>([]);
    const apiServices = new ApiServices();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await apiServices.demoteUserRole(user.label, role.label);
            toast.success('User demoted successfully!', {
                position: toast.POSITION.TOP_RIGHT,
            });
            setUser({ department: '' });
            setRole({ department: '' });
        } catch (err) {
            toast.error(`Failed! ${err}`, {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        }

        setLoading(false);
    };

    useEffect(() => {
        fetchRoles();
        fetchUsername();
    }, []);

    const fetchRoles = async () => {
        setLoading(true);
        try {
            const roles = await apiServices.allUsers();
            if (roles.success) {
                const roles1 = roles.data.map((role) => ({ value: role.authorities, label: role.authorities }));
                setRoles(roles1);
            } else {
                toast.error('Failed to fetch roles. Please try again.', {
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
            }
        } catch (error) {
            toast.error('Failed to fetch roles. Please try again.', {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        }
        setLoading(false);
    };

    const fetchUsername = async () => {
        setLoading(true);
        try {
            const result = await apiServices.allUsers();
            if (result.success) {
                const users = result.data.map((user) => ({ value: user.username, label: user.username }));
                setUsers(users);
            }
        } catch (error) {
            toast.error('Failed to fetch users. Please try again.', {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
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
                                <h3 className="card-title">DEMOTE USERS</h3>
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group-create">
                                        <label htmlFor="roles">ROLES *</label>
                                        {loading ? (
                                            <div>Loading...</div>
                                        ) : (
                                            <Select
                                                className={`select`}
                                                required
                                                options={roles}
                                                value={role}
                                                onChange={(selectedOption) => setRole(selectedOption)}
                                                isSearchable
                                            />
                                        )}

                                        <label htmlFor="users">USER *</label>

                                        {loading ? (
                                            <div>Loading...</div>
                                        ) : (
                                            <Select
                                                className={`select`}
                                                required
                                                options={users}
                                                value={user}
                                                onChange={(selectedOption) => setUser(selectedOption)}
                                                isSearchable
                                            />
                                        )}
                                    </div>
                                    <div className={`form-group-create`}>
                                        <button type="submit" className="create-elevate-button" disabled={loading}>
                                            {loading ? (
                                                <ClipLoader color="#ffffff" loading={loading} size={20} />
                                            ) : (
                                                'submit'
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

export default DowngradeUser;

export const ToastNotificationRegitration = () => {
    return <ToastContainer />;
};