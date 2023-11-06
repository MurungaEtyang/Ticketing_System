import '../stylesheeet/ticketFeedback.css'
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const TicketFeedback = () => {
    const [message, setMessage] = useState('');
    const [satisfied, setSatisfied] = useState(true);
    const [rating, setRating] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        setIsLoading(true);
        setError('');

        // Make API request to submit feedback
        fetch('http://localhost:3000/api/tickets', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message, satisfied, rating }),
        })
            .then((response) => {
                if (response.ok) {
                    // Show success message or redirect to another page
                    // console.log('Feedback submitted successfully');
                    toast.success('Feedback submitted successfully', {
                        position: toast.POSITION.TOP_RIGHT
                    });

                } else {
                    toast.error('Feedback submission failed',{
                        position: toast.POSITION.BOTTOM_RIGHT
                    });
                }
            })
            .catch((error) => {
                // setError(error.message);
                toast.error(error.message,{
                    position: toast.POSITION.BOTTOM_RIGHT
                })
            })
            .finally(() => {
                setIsLoading(false);
                setMessage('');
                setSatisfied(true);
                setRating(0);
            });
    };

    const handleStarClick = (value: number) => {
        setRating(value);
    };


    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title">Ticket Feedback</h3>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="message">Message</label>
                                    <textarea
                                        className="form-control"
                                        id="message"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                    ></textarea>
                                </div>
                                <div className="form-group">
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
                                </div>
                                <div className="form-group">
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

                                <button type="submit" className="btn btn-primary" disabled={isLoading}>
                                    {isLoading ? 'Submitting...' : 'Submit'}
                                </button>
                                {error && <div className="error">{error}</div>}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
                <ToastContainer />
        </div>
    );
};

export default TicketFeedback;
