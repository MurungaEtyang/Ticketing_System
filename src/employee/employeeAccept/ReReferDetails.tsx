import React, { useState } from "react";
import {toast, ToastContainer} from "react-toastify";
import '../../assets/component/stylesheeet/EmployeeFeedback.css';
import ReRefer from "./ReRefer";
import Refer from "../Refer";

const EmployeeFeedback = () => {
    const referralId = sessionStorage.getItem('referral_id');
    const ticketMessage = sessionStorage.getItem('referral_reason')
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [showEmployeeFeedback, setShowEmployeeFeedback] = useState(true)
    const [referButton, setReferButton] = useState(true)
    const [referModal, showReferModal] = useState(false)

    const handleFormSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            // alert(message)
            setIsLoading(true);

            let encodeId =(encodeURIComponent(referralId))

            // alert(referralId)

            await fetch("http://localhost:8080/api/v1/tickets/referral?accept=true&referral_id="+ encodeId,
                {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: "Basic " + localStorage.getItem("email_password_credentials"),
                    }
                }).then(response => {
                if (response.ok) {
                    toast.success("Referral accepted successfully.", {
                        position: toast.POSITION.BOTTOM_RIGHT,
                    });
                } else {
                    // Handle the error response from the API
                    toast.error("Failed", {
                        position: toast.POSITION.BOTTOM_RIGHT,
                    });
                    setIsLoading(false);
                }
            });
        } catch (error) {
            toast.error("Error occurred while submitting the feedback: " + error.message, {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        }
        setIsLoading(false);
    };

    const employeeFeedbackShow = () => {
        setShowEmployeeFeedback(!showEmployeeFeedback)
        showReferModal(!referModal);
    }
    return (
        <>
            {showEmployeeFeedback && (
                <div className="ticket-progress-container">
                    <div className="rating-card-body">
                        <form onSubmit={handleFormSubmit}>
                            <div className="employee-rating-form-group">
                                <div className={`employee-senders-info`}>
                                    <p>{ticketMessage}</p>
                                </div>
                                <div className={`button-employee-container`}>
                                    <button onClick={handleFormSubmit} type="submit"  disabled={isLoading}>
                                        {isLoading ? 'Accepting...' : 'Accept'}
                                    </button>

                                    {referButton && (
                                        <button type={`submit`} onClick={employeeFeedbackShow}>Re-Refer</button>
                                    )}
                                </div>
                            </div>
                            {error && <div className="error">{error}</div>}
                        </form>
                    </div>
                </div>
            )}

            {referModal && (
                <Refer />
            )}
            <ToastContainer />
        </>
    );
};
export default EmployeeFeedback;