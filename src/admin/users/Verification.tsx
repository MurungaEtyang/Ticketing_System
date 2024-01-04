import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../assets/component/stylesheeet/verification.css'
import ApiServices from "../../handleApi/ApiServices.ts";


const Verification: React.FC = () => {
    const [verification, setVerification] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const apiService = new ApiServices();
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (verification === '') {
            toast.error('Verification code is required.', {
                position: toast.POSITION.TOP_RIGHT,
            });
            return;
        }

        setIsLoading(true);

        const username = String(localStorage.getItem('email'));
        // alert(username)
        try {
             apiService.verificationOfUsers(
                username, verification
            ).then(response => {
                if (response.success) {
                    toast.success('Verification code inserted successfully', {
                        position: toast.POSITION.TOP_RIGHT,
                    });

                    navigate('/admin');
                } else {
                    toast.error('failed, please try again!!!!', {
                        position: toast.POSITION.BOTTOM_RIGHT,
                    });
                }
            })

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