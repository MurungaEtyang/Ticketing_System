import './TicketTrackProgrss.css'
import React, { useState } from "react";
import {toast, ToastContainer} from "react-toastify";

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
    const [showTableHeaders, setShowTableHeaders] = useState(false); // Add state for showing/hiding table headers
    const currentStatus = ticketProgress[ticketProgress.length - 1]?.status;
    const [percentage, setPercentage] = useState(0);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsLoading(true)
        try {
            const response = await fetch('http://localhost:8080/api/v1/tickets/management/get?ticket_number=' + encodeURIComponent(ticketId), {
                method: 'GET',
                headers: {
                    Authorization: 'Basic ' + localStorage.getItem('email_password_credentials')
                }
            });

            if (response.ok) {
                const ticketInfo = await response.json();
                // console.log(ticketInfo)
                if(ticketInfo){
                    setTicketProgress([ticketInfo]);
                    const currentStatus = ticketInfo.status;
                    setPercentage(getProgressBarPercentage(currentStatus));
                }else{
                    setTicketProgress([]);
                    setPercentage(0);
                    toast.error('Ticket is not available', {
                        position: toast.POSITION.BOTTOM_RIGHT,
                    });
                }
            } else {
                setTicketProgress([]);
                setPercentage(0);
                toast.error('Ticket is not available', {
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
            }
        } catch (error) {
            setTicketProgress([]);
            setPercentage(0);
            toast.error('Error fetching ticket content: ' + error, {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        }

        // Check if the current status is "Submitted" or "Closed" to show the rating button
        const currentStatus = ticketProgress[ticketProgress.length - 1]?.status;
        setShowRatingButton(currentStatus === "Submitted" || currentStatus === "Closed");

        // Show the table headers after clicking the "check status" button
        setShowTableHeaders(true);

        setIsLoading(false)
    };

    const getStatusColor = (status: string | undefined) => {
        const progress = ticketProgress.find((item) => item.status === status);
        return progress ? progress.color : "";
    };

    const getProgressBarPercentage = (status: string | undefined) => {
        if (!status) {
            return 0;
        }

        switch (status) {
            case "OPEN":
                return 25;
            case "ASSIGNED":
                return 50;
            case "SUBMITTED":
                return 75;
            case "CLOSED":
                return 100;
            default:
                return 0; // Handle other status values
        }
    };


    const getProgressBarColor = (percentage: number) => {
        const red = Math.round((100 - percentage) * 2.55);
        const green = Math.round(percentage * 2.55);
        return `rgb(${red}, ${green}, 0)`;
    };

    const showRating = () => {
        setShowRatingContent(!showRatingContent);
    }

    const handleStarClick = (value: number) => {
        setRating(value);
    };

    // console.log(getProgressBarPercentage(currentStatus));


    const handleFormSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            // alert(rating)
            setIsLoading(true);

            let encodeId =(encodeURIComponent(ticketId))

            const response = await fetch("http://localhost:8080/api/v1/tickets/feedback?ticket_number=" + encodeURIComponent(encodeId)+
                    "&feedback=" + message + "&satisfied=" + satisfied + "&rating=" + rating,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
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
                        // Reset the form fields
                        setMessage("");
                        setSatisfied(true);
                        setRating(0);
                        setIsLoading(false);
                        setError("");
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
                {/*<nav className="nav-container">*/}
                {/*    /!* Navigation content *!/*/}
                {/*</nav>*/}

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
                        <button type="submit" className="btn btn-primary" disabled={isLoading}>
                            {isLoading ? 'Checking...' : 'Ticket Status'}
                        </button>
                    </form>
                </div>

                {showTableHeaders && (
                    <div>
                        <table className="card-tickets-table">
                            <thead>
                            <tr className="card-tickets-table-header">
                                <th>Status</th>
                                <th>Assigned To</th>
                                <th>Deadline</th>
                                <th>Department</th>
                            </tr>
                            </thead>
                            <tbody>
                            {ticketProgress.map((item, index) => (
                                <tr key={index}>
                                    <td style={{ color: item.color }}>{item.status}</td>
                                    <td>{item.assignedTo}</td>
                                    <td>{item.deadline}</td>
                                    <td>{item.departmentAssigned}</td>
                                </tr>
                            ))}
                            </tbody>
                            {/*<h4>*/}
                            {/*    <b>NB: </b>If your ticket has not been responded to kind*/}
                            {/*</h4>*/}

                            <div className="progress-bar-container">
                                <div
                                    className="progress-bar"
                                    style={{
                                        width: `${percentage}%`,
                                        backgroundColor: getProgressBarColor(percentage),
                                    }}
                                >
                                    {percentage}%
                                </div>
                            </div>

                        </table>

                    </div>
                )}

                {getProgressBarPercentage(currentStatus) >= 75 && (
                    <div>
                        <button onClick={showRating}>Close Ticket</button>
                    </div>
                )}

                {showRatingContent && (
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
                            <div className="rating-form-group">
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
            <ToastContainer />
        </>
    );
};

export default TicketTrackProgress;