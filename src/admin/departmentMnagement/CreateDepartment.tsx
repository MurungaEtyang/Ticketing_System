import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { css } from '@emotion/react';
import { ClipLoader } from 'react-spinners';
import './stylesheeet/login.css';

const CreateDepartment = () => {
    const [nameOfDepartment, setNameOfDepartment] = useState('');
    const [headOfDepartment, setHeadOfDepartment] = useState('');
    const [loading, setLoading] = useState(false);

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

            // await fetch('http://localhost:8080/api/v1/departments', {
            //     method: "POST",
            //     headers: {
            //         'Content-Type': 'application/json',
            //         Authorization: 'Basic '+ credentials,
            //     }
            // })

            // Reset the form fields
            setNameOfDepartment('');
            setHeadOfDepartment('');

        } catch (error) {
            toast.error('Invalid nameOfDepartment or headOfDepartment. Please try again.', {
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
                            <h3 className="card-title">LOGIN TO CUSTOMER SERVICE PORTAL</h3>
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
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="headOfDepart"
                                        value={headOfDepartment}
                                        onChange={(e) => setHeadOfDepartment(e.target.value)}
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
            {/*<ToastContainer />*/}
        </div>
    );
};

export default CreateDepartment;
export const ToastNotificationLogin = () => {
    return <ToastContainer />;
};