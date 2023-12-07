import React, { useState } from "react";
import {toast, ToastContainer} from "react-toastify";
import './EmployeeFeedback.css';
import Refer from "./Refer";

const EmployeeFeedback = () => {
    const ticketId = sessionStorage.getItem('employee_ticket_number');
    const requestMessage = sessionStorage.getItem('employee_ticket_title')
    const ticketMessage = sessionStorage.getItem('employee_ticket_Description')
    const [message, setMessage] = useState('');
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

            let encodeId =(encodeURIComponent(ticketId))
            console.log(ticketId)

            await fetch("http://localhost:8080/api/v1/tickets/submit?ticket_number="+ ticketId+
            "&solution=" + encodeURIComponent(message),
                {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: "Basic " + localStorage.getItem("email_password_credentials"),
                    },
                    body: JSON.stringify({
                        ticket_id: encodeURIComponent(ticketId),
                        message: message,
                    }),
                }).then(response => {
                if (response.ok) {
                    toast.success("submitted successfully.", {
                        position: toast.POSITION.BOTTOM_RIGHT,
                    });
                } else {
                    // Handle the error response from the API
                    toast.error("Failed to submit please try again later. ", {
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
                                    <h2>{requestMessage}</h2>
                                    <p>{ticketMessage}</p>
                                </div>
                                <div className={`employee-respond-message-input`}>
                                    <label>Send Response</label>
                                    <textarea
                                        required
                                        className={'employee-dashboard'}
                                        value= {message}
                                        onChange={event => setMessage(event.target.value)}
                                    >
                                            </textarea>
                                </div>

                                <div className={`button-employee-container`}>
                                    <button onClick={handleFormSubmit} type="submit"  disabled={isLoading}>
                                        {isLoading ? 'Submitting...' : 'Submit'}
                                    </button>

                                    {referButton && (
                                        <button type={`submit`} onClick={employeeFeedbackShow}>Refer</button>
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