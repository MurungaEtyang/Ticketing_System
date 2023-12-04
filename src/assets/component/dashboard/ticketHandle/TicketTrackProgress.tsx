import './TicketTrackProgrss.css'
import React, { useState } from "react";
import {toast, ToastContainer} from "react-toastify";

const TicketTrackProgress = () => {
    const ticketId = sessionStorage.getItem('ticket_number');
    const requestMessage = sessionStorage.getItem('ticket_title')
    const ticketMessage = sessionStorage.getItem('ticket_message')
    const [message, setMessage] = useState('');
    const [satisfied, setSatisfied] = useState(true);
    const [rating, setRating] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [ticketProgress, setTicketProgress] = useState<{ status: string; color: string }[]>([]);
    const [showRatingContent, setShowRatingContent] = useState(false);


    const handleFormSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            // alert(rating)
            setIsLoading(true);

            let encodeId =(encodeURIComponent(ticketId))
            console.log(encodeId)

            await fetch("http://localhost:8080/api/v1/tickets/feedback?ticket_number=" + encodeId +
                    "&feedback=" + message + "&satisfied=" + satisfied + "&rating=" + rating,
                {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: "Basic " + localStorage.getItem("email_password_credentials"),
                    },
                    body: JSON.stringify({
                        ticket_id: encodeURIComponent(ticketId),
                        message: message,
                        satisfied: satisfied,
                        rating: rating,
                    }),
                }).then(response => {
                    if (response.ok) {
                        toast.success("Rating submitted successfully.", {
                            position: toast.POSITION.BOTTOM_RIGHT,
                        });


                    } else {
                        // Handle the error response from the API
                        const errorResponse = response.json();
                        toast.error("Failed to submit rating please try again later. ", {
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
                        <h3 className="rating-card-title">Ticket Feedback</h3>
                        <form onSubmit={handleFormSubmit}>
                            <div className="rating-form-group">
                                <label htmlFor="message">Ticket Request</label>
                                <div className={`ticket-response-info`}>
                                    <div className={`senders-info`}>
                                        <h2>{requestMessage}</h2>
                                        <p>{ticketMessage}</p>
                                        <p>{ticketId}</p>
                                    </div>

                                    <div className={`responded-info`}>
                                        <h2>Solution</h2>
                                        <p>{ticketMessage}</p>
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