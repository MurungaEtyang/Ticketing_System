import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../assets/component/stylesheeet/verification.css'


const Verification: React.FC = () => {
    const [verification, setVerification] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    // const location = useLocation()
    // const email = location.state?.email || '';
    // alert(email);
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (verification === '') {
            toast.error('Verification code is required.', {
                position: toast.POSITION.TOP_RIGHT,
            });
            return;
        }

        setIsLoading(true);

        const username = localStorage.getItem('email');
        // alert(username)
        try {
            await fetch('http://localhost:8080/api/v1/users/registration/activate?username=' + username +
                '&activation_token=' + verification , {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Basic ' + localStorage.getItem('email_password_credentials')
                },
                body: JSON.stringify({
                    'message': verification
                })
            }).then(async (response) => {
                if (response.ok) {
                    // Assuming the verification is successful
                    // Reset the verification code
                    toast.success('Verification code inserted successfully', {
                        position: toast.POSITION.TOP_RIGHT,
                    });

                    setVerification('');
                    // Redirect to the Login component
                    navigate('/admin');
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
                    <div className="create-dept-card">
                        <div className="create-dept-card-body">
                            <h2>Enter verification code</h2>
                            <form onSubmit={handleSubmit}>
                                <div  className="form-group-create">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="verification"
                                        placeholder="XXXX XXXX XXXX XXXX"
                                        value={verification}
                                        onChange={(e) => setVerification(e.target.value)}
                                    />
                                </div>
                                <div className={`form-group-create`} >
                                    <button type="submit" className="create-dept-button" disabled={isLoading}>
                                        {isLoading ? 'Verifying...' : 'Verify'}
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

export default Verification;