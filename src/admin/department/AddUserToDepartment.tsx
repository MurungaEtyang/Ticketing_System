import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { css } from '@emotion/react';
import { ClipLoader } from 'react-spinners';
import Select from 'react-select';
import '../assets/stylesheet/createDepartmentTicket.css'

const AddUserToDepartment = () => {
    const [email, setEmail] = useState('');
    const [department, setDepartment] = useState<{ department: string; }[]>([]);
    const [loading, setLoading] = useState(false);
    const [departments, setDepartments] = useState<string[]>([]);
    const [emails, setEmails] = useState<{ emails: string; }[]>([]);
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
            const department = data.map((user) => user.departmentName);
            // alert(department)
            setDepartments(department);
            // setDepartments(['department1','department2', 'department3'])
        } catch (error) {
            toast.error('Failed to fetch departments. Please try again.', {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        }
    };

    const fetchEmails = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/v1/users/management/authority?authority=employee', {
                method: "GET",
                headers: {
                    Authorization: 'Basic ' + localStorage.getItem('email_password_credentials')
                }
            });
            const data = await response.json();
            const userNames = data.map((user) => user.username);
            setEmails(userNames.map((name) => ({ emails: name })));
        } catch (error) {
            console.error('Error fetching users:', error.message);
            console.log(error);
        }
    }


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();


        try {
            setLoading(true);

            const formData = new FormData();
            formData.append("email", selectedEmail.label);
            formData.append("department", department.label);

            await fetch('http://localhost:8080/api/v1/departments/add?users=' + selectedEmail.label +
                '&department_name=' + department.label, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',

                    Authorization: 'Basic ' + localStorage.getItem('email_password_credentials')
                },
                body: formData,
            })

            // Reset the form fields
            setEmail('');
            setDepartment(null);

            toast.success('success.', {
                position: toast.POSITION.TOP_RIGHT,
            });

        } catch (error) {
            toast.error(error.message, {
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
                    <div className="create-dept-card">
                        <div className="create-deptcard-body">
                            <h3 className="card-title">Add Users To Department</h3>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group-create">
                                    <label htmlFor="email">Email *</label>
                                    <Select
                                        className={`select`}
                                        required
                                        options={emails.map((email) => ({ value: email.emails, label: email.emails }))}
                                        value={selectedEmail}
                                        onChange={(selectedOption) => setSelectedEmail(selectedOption)}
                                        isSearchable
                                    />
                                </div>
                                <div className="form-group-create">
                                    <label htmlFor="department">Department *</label>
                                    <Select
                                        className={`select`}
                                        required
                                        options={departments.map((dept) => ({ value: dept, label: dept }))}
                                        value={department}
                                        onChange={(selectedOption) => setDepartment(selectedOption)}
                                        isSearchable
                                    />
                                </div>
                                <div className={`form-group-create`}>
                                    <button type="submit" className="create-add-button" disabled={loading}>
                                        {loading ? (
                                            <ClipLoader color="#ffffff" loading={loading} css={override} size={20} />
                                        ) : (
                                            'Submit'
                                        )}
                                    </button>
                                </div>
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