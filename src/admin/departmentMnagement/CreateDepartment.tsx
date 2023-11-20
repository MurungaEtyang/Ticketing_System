import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { css } from '@emotion/react';
import { ClipLoader } from 'react-spinners';
import Select from 'react-select';

const CreateDepartment = () => {
    const [nameOfDepartment, setNameOfDepartment] = useState('');
    const [headOfDepartment, setHeadOfDepartment] = useState('');
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState<{ name: string; }[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/v1/users/management/authority?authority=employee',{
                    method: "GET",
                    headers: {
                        Authorization: 'Basic ' + localStorage.getItem('email_password_credentials')
                    }
                });
                const data = await response.json();
                const userNames = data.map((user) => user.username);
                setUsers(userNames.map((name) => ({ name })));
                // alert(userNames)

            } catch (error) {
                console.error('Error fetching users:', error);
                console.log(error);
            }
        };

        fetchUsers();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (nameOfDepartment === '' || headOfDepartment === '') {
            toast.error('Please fill in all the input fields.', {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
            return;
        }

        try {
            setLoading(true);
            const formData = new FormData();
            formData.append('department_name', nameOfDepartment);
            formData.append('head_of_department', headOfDepartment.label);


            await fetch('http://localhost:8080/api/v1/departments?'+ 'department_name=' + nameOfDepartment +
                '&head_of_department=' + headOfDepartment.label, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Authorization: 'Basic ' + localStorage.getItem('email_password_credentials'),
                },
                body: formData,
            });

            // Reset the form fields
            setNameOfDepartment('');
            setHeadOfDepartment('');

        } catch (error) {
            toast.error('Invalid name Of Department or head Of Department. Please try again.', {
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

    const userOptions = users.map((user) => ({
        // value: user.id,
        label: user.name,
    }));

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title">Create Department</h3>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="nameOfDepart">Name of Department *</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="department"
                                        value={nameOfDepartment}
                                        onChange={(e) => setNameOfDepartment(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="HeadOfDepart">Head of Department *</label>
                                    <Select
                                        options={userOptions}
                                        isSearchable
                                        placeholder="Search for users..."
                                        onChange={(selectedOption) => setHeadOfDepartment(selectedOption)}
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

export default CreateDepartment;
export const ToastNotificationLogin = () => {
    return <ToastContainer />;
};