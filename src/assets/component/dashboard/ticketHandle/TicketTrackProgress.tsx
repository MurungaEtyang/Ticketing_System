import './TicketTrackProgrss.css'
import React, { useState } from "react";
import {toast, ToastContainer} from "react-toastify";

const TicketTrackProgress = () => {
    const ticketId = localStorage.getItem('ticket_number');
    const [message, setMessage] = useState('');
    const [satisfied, setSatisfied] = useState(true);
    const [rating, setRating] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [ticketProgress, setTicketProgress] = useState<{ status: string; color: string }[]>([]);
    const [showRatingContent, setShowRatingContent] = useState(false);
    // const currentStatus = ticketProgress[ticketProgress.length - 1]?.status;

    const showRating = () => {
        setShowRatingContent(!showRatingContent);
    }

    const handleStarClick = (value: number) => {
        setRating(value);
    };


    const handleFormSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            // alert(rating)
            setIsLoading(true);

            let encodeId =(encodeURIComponent(ticketId))

            await fetch("http://localhost:8080/api/v1/tickets/feedback?ticket_number=" + encodeURIComponent(encodeId)+
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
                                <label htmlFor="message">Message</label>
                                <textarea
                                    id="message"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                ></textarea>

                                <label htmlFor="satisfied">Satisfied</label>
                                <select
                                    className="form-control satisfied-dropdown"
                                    id="satisfied"
                                    value={satisfied ? 'yes' : 'no'}
                                    onChange={(e) => setSatisfied(e.target.value === 'yes')}
                                >
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </select>

                                <label htmlFor="rating">Rating</label>
                                <div className="rating">
                                    {[1, 2, 3, 4, 5].map((value) => (
                                        <React.Fragment key={value}>
                                            <input
                                                type="radio"
                                                id={`star${value}`}
                                                name="rating"
                                                value={value}
                                                checked={rating === value}
                                                onChange={() => handleStarClick(value)}
                                            />
                                            <label htmlFor={`star${value}`} className={`star ${rating >= value ? 'selected' : ''}`}>
                                                &#9733;
                                            </label>
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>
                            <button onClick={handleFormSubmit} type="submit" className="btn btn-primary" disabled={isLoading}>
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