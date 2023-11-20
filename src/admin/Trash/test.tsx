import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { css } from '@emotion/react';
import { ClipLoader } from 'react-spinners';
import Select from 'react-select';

const AddUserToDepartment = () => {
    const [email, setEmail] = useState('');
    const [department, setDepartment] = useState('');
    const [loading, setLoading] = useState(false);
    const [options, setOptions] = useState<{ value: string; label: string }[]>([]);
    const [selectedEmail, setSelectedEmail] = useState<any>(null);

    useEffect(() => {
        fetchDepartments();
        fetchEmails();
    }, []);

    const fetchDepartments = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/v1/departments/all',{
                method: "GET",
                headers: {
                    'Content-Type': 'application/x-www-urlencoded',
                    Authorization: 'Basic ' + localStorage.getItem('email_password_credentials')
                }
            });
            const data = await response.json();
            const departments = data.map((user) => ({ value: user.departmentName, label: user.departmentName }));
            setOptions(departments);
        } catch (error) {
            toast.error('Failed to fetch departments. Please try again.', {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        }
    };

    const fetchEmails = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/v1/users/management/authority?authority=employee',{
                method: "GET",
                headers: {
                    Authorization: 'Basic ' + localStorage.getItem('email_password_credentials')
                }
            });
            const data = await response.json();
            const emails = data.map((user) => ({ value: user.username, label: user.username }));
            setOptions((prevOptions) => [...prevOptions, ...emails]);
        } catch (error) {
            toast.error('Failed to fetch emails. Please try again.', {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        alert(email)
        alert(department)
        try {
            setLoading(true);

            await fetch('http://localhost:8080/api/v1/departments/', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Basic ',
                },
                body: JSON.stringify({ email, department }),
            })

            // Reset the form fields
            setEmail('');
            setDepartment('');

        } catch (error) {
            toast.error('Invalid email or department. Please try again.', {
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

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title">Add Users To Department</h3>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="email">Email *</label>
                                    <Select
                                        required
                                        options={options}
                                        value={selectedEmail}
                                        onChange={(selectedOption) => setSelectedEmail(selectedOption)}
                                        isSearchable
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="department">Department *</label>
                                    <Select
                                        required
                                        options={options}
                                        value={department}
                                        onChange={(selectedOption) => setDepartment(selectedOption)}
                                        isSearchable
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary" disabled={loading}>
                                    {loading ? (
                                        <ClipLoader color="#ffffff" loading={loading} css={override} size={20} />
                                    ) : (
                                        'Submit'
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default AddUserToDepartment;
export const ToastNotificationAddUserToDepartment = () => {
    return <ToastContainer />;
};