import React, { useState } from 'react';

const TicketFeedback = () => {
    const [message, setMessage] = useState('');
    const [satisfied, setSatisfied] = useState(true);
    const [rating, setRating] = useState(0);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Perform any necessary actions with the feedback data
        // For example, you can submit the feedback to a backend API

        // Reset the form fields
        setMessage('');
        setSatisfied(true);
        setRating(0);
    };

    const handleRatingChange = (value: number) => {
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
                                        className="form-control"
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
                                            <label key={value}>
                                                <input
                                                    type="radio"
                                                    name="rating"
                                                    value={value}
                                                    checked={rating === value}
                                                    onChange={() => handleRatingChange(value)}
                                                />
                                                {value} star
                                            </label>
                                        ))}
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-primary">
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TicketFeedback;

