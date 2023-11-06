import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import "./stylesheeet/verification.css"

const Verification = () => {
    const [verification, setVerification] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (verification === '') {
            toast.error('Verification code is required.', {
                position: toast.POSITION.TOP_RIGHT,
            });
            return;
        }

        setIsLoading(true);

        try {
            // Make API call to register the user
            const response = await axios.post('http://localhost:3000/api/register', {
                verificationCode: verification,
            });

            // Reset the verification code
            setVerification('');

            toast.success('Verification code inserted successfully', {
                position: toast.POSITION.TOP_RIGHT,
            });

        //     redirect to the dashboard


        } catch (error) {
            toast.error('Failed to insert verification code. Please try again later.', {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        }

        setIsLoading(false);
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title">Verification form</h3>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="verification">Code</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="verification"
                                        placeholder="XXXX XXXX XXXX XXXX"
                                        value={verification}
                                        onChange={(e) => setVerification(e.target.value)}
                                    />
                                </div>
                                <button type="submit" className="btn-primary" disabled={isLoading}>
                                    {isLoading ? 'Loading...' : 'Verify'}
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

export default Verification;

export const verfy = () => {
    return <ToastContainer />
}
