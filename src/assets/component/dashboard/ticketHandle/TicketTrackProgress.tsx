import '../../stylesheeet/TicketTrackProgrss.css'
import React, { useState } from "react";
import {toast, ToastContainer} from "react-toastify";

const TicketTrackProgress = () => {
    const ticketId = sessionStorage.getItem('ticket_number');
    const requestMessage = sessionStorage.getItem('ticket_title');
    const ticketMessage = sessionStorage.getItem('ticket_message');
    const ticketSolution = sessionStorage.getItem('ticket_solution');
    const ticketRaisedBy = localStorage.getItem('ticket_sender');
    const ticketResponder = sessionStorage.getItem('ticket_responder');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleFormSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            setIsLoading(true);

            let encodeId = encodeURIComponent(ticketId);

            await fetch("http://localhost:8080/api/v1/tickets/feedback?ticket_number=" + encodeId +
                "&feedback=NB&satisfied=true&rating=5",
                {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: "Basic " + localStorage.getItem("email_password_credentials"),
                    },
                    body: JSON.stringify({
                        ticket_id: encodeURIComponent(ticketId),
                    }),
                }).then(response => {
                if (response.ok) {
                    toast.success("Rating submitted successfully.", {
                        position: toast.POSITION.BOTTOM_RIGHT,
                    });
                } else {
                    const errorResponse = response.json();
                    toast.error("Failed to submit rating. Please try again later.", {
                        position: toast.POSITION.BOTTOM_RIGHT,
                    });
                    setIsLoading(false);
                }
            });
        } catch (error) {
            toast.error("Error submitting rating: " + error.message, {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        }

        setIsLoading(false);
    };

    return (
        <>
            <div className="ticket-progress-container">
                <div className="rating-card-body">
                    <form onSubmit={handleFormSubmit}>
                        <div className="rating-form-group">
                            <div className={`ticket-response-info`}>
                                <div className={`sender-info`}>
                                    <h2>{ticketRaisedBy}</h2>
                                    <p>{ticketMessage}</p>
                                </div>

                                <div className={`responded-info`}>
                                    <h2>{ticketResponder}</h2>
                                    <p>{ticketSolution}</p>
                                </div>
                            </div>
                        </div>
                        <button onClick={handleFormSubmit} type="submit" className="feedback-button" disabled={isLoading}>
                            {isLoading ? 'Submitting...' : 'Submit'}
                        </button>
                        {error && <div className="error">{error}</div>}
                    </form>
                </div>
            </div>
            <ToastContainer />
        </>
    );
};

export default TicketTrackProgress;