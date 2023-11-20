import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './stylesheeet/verification.css'

const Verification: React.FC = () => {
    const [verification, setVerification] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation()
    const email = location.state?.email || '';
    // alert(email)
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

            const formData = new FormData();
            formData.append('verification', verification)

            await fetch('http://localhost:8080/api/v1/users/registration/activate/' + email, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Authorization: 'Basic a2FtYXIyNTRiYXJha2FAZ21haWwuY29tOmFkbWlu',
                },
                body: formData
            }).then(async (response) => {
                if (response.ok) {
                    // Assuming the verification is successful
                    // Reset the verification code
                    setVerification('');

                    toast.success('Verification code inserted successfully', {
                        position: toast.POSITION.TOP_RIGHT,
                    });

                    // Redirect to the Login component
                    navigate('/login');
                } else {
                    const errorResponse = await response.json();
                    throw new Error(errorResponse.message);
                }
            });
        } catch (error) {
            toast.error(error.message || 'Failed to insert verification code. Please try again later.', {
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