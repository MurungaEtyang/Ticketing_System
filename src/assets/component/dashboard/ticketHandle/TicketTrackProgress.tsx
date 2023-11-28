import './TicketTrackProgrss.css'
import React, { useState } from "react";

const TicketTrackProgress = () => {
    const [message, setMessage] = useState('');
    const [satisfied, setSatisfied] = useState(true);
    const [rating, setRating] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [ticketId, setTicketId] = useState("");
    const [ticketProgress, setTicketProgress] = useState<{ status: string; color: string }[]>([]);
    const [showRatingButton, setShowRatingButton] = useState(false);
    const [showRatingContent, setShowRatingContent] = useState(false);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // Simulate ticket progress change
        const newProgress = [
            { status: "Open", color: "red" },
            { status: "Assigned", color: "orange" },
            { status: "Submitted", color: "yellow" },
            { status: "Closed", color: "green" },
        ];
        setTicketProgress(newProgress);

        // Check if the current status is "Submitted" or "Closed" to show the rating button
        const currentStatus = newProgress[newProgress.length - 1].status;
        setShowRatingButton(currentStatus === "Submitted" || currentStatus === "Closed");
    };

    const getStatusColor = (status: string) => {
        const progress = ticketProgress.find((item) => item.status === status);
        return progress ? progress.color : "";
    };

    const showRating = () =>{
        setShowRatingContent(!showRatingContent);
    }

    const handleStarClick = (value: number) => {
        setRating(value);
    };

    return (
        <>
            <div className="ticket-progress-container">
                <div>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Enter your Ticket Id"
                            id="ticketId"
                            value={ticketId}
                            onChange={(event) => setTicketId(event.target.value)}
                            required
                        />
                        <button>check status</button>
                    </form>
                </div>

                <div>
                    {!showRatingContent && (
                        <div>
                            <table className="card-tickets-table">
                                <thead>
                                <tr className="card-tickets-table-header">
                                    <th>Status</th>
                                    <th>Assigned To</th>
                                    <th>Department</th>
                                </tr>
                                </thead>
                                <tbody>
                                {ticketProgress.map((item, index) => (
                                    <tr key={index}>
                                        <td style={{ color: item.color }}>{item.status}</td>
                                        <td>{/* Render assignedTo value here */}</td>
                                        <td>{/* Render departmentAssigned value here */}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {showRatingButton && (
                    <div>
                        <button onClick={showRating}>Rate Us</button>
                    </div>
                )}

                {showRatingContent && (
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
                )}
            </div>
        </>
    );
};

export default TicketTrackProgress;