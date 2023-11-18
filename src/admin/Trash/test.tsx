import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { BeatLoader } from 'react-spinners';
import './AssignTicket.css';

const AssignTicket = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [ticketId, setTicketId] = useState('');
    const [assignTo, setAssignTo] = useState('');
    const [priority, setPriority] = useState('');
    const [deadline, setDeadline] = useState<Date | null>(null);
    const [assignToOptions, setAssignToOptions] = useState<string[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [ticketContent, setTicketContent] = useState<{ title: string; description: string; attachment: string } | null>(null);
    const [attachmentType, setAttachmentType] = useState<string | null>(null);

    useEffect(() => {
        // Fetch the Assign To options from the API endpoint
        const fetchAssignToOptions = async () => {
            try {
                // const response = await fetch('/api/assign-to-options');
                // const data = await response.json();
                // setAssignToOptions(data.options);

                // For testing purposes, set some dummy assignTo options
                setAssignToOptions(['John Doe', 'Jane Smith', 'Bob Johnson']);
            } catch (error) {
                console.error('Error fetching Assign To options:', error);
            }
        };

        fetchAssignToOptions();
    }, []);

    const handleTicketIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTicketId(event.target.value);
    };

    const handleAssignToChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setAssignTo(event.target.value);
    };

    const handlePriorityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPriority(event.target.value);
    };

    const handleDeadlineChange = (date: Date | null) => {
        setDeadline(date);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsLoading(true);

        if (!showForm) {
            // const requestBody = {
            //     ticketId: ticketId
            // };

            // try {
            //     const response = await fetch('https://example.com/api/checkTicket', {
            //         method: 'POST',
            //         headers: {
            //             'Content-Type': 'application/json'
            //         },
            //         body: JSON.stringify(requestBody)
            //     });

            //     if (response.ok) {
            //         console.log('Ticket checked successfully');
            //         setShowForm(true);
            //     } else {
            //         console.error('Error checking ticket');
            //     }
            // } catch (error) {
            //     console.error('Error checking ticket:', error);
            // }

            try {
                const response = await fetch(`https://example.com/api/ticket/${ticketId}`);
                if (response.ok) {
                    const data = await response.json();
                    setTicketContent(data.title);
                    setTicketContent(data.description);
                    setAttachmentType(data.attachmentType);
                } else {
                    console.error('Error fetching ticket content');
                }
            } catch (error) {
                console.error('Error fetching ticket content:', error);
            }

            // For testing purposes, directly show the form
            setShowForm(true);
        } else {
            // const requestBody = {
            //     ticketId: ticketId,
            //     assignTo: assignTo,
            //     priority: priority,
            //     deadline: deadline
            // };
            //
            // try {
            //         const response = await fetch('https://example.com/api/assignTicket', {
            //             method: 'POST',
            //             headers: {
            //                 'Content-Type': 'application/json'
            //             },
            //             body: JSON.stringify(requestBody)
            //         });
            //
            //         if (response.ok) {
            //             console.log('Ticket assigned successfully');
            //             setShowForm(false);
            //         } else {
            //             console.error('Error assigning ticket');
            //         }
            //     } catch (error) {
            //         console.error('Error assigning ticket:', error);
            //     }
            //
            // For testing purposes, log the form data
            console.log('Ticket ID:', ticketId);
            console.log('Assign To:', assignTo);
            console.log('Priority:', priority);
            console.log('Deadline:', deadline);

            // Reset the form
            setTicketId('');
            setAssignTo('');
            setPriority('');
            setDeadline(null);
            setShowForm(false);
        }

        setIsLoading(false);
    };

    const handleDownloadAttachment = (attachmentUrl: string) => {
        const link = document.createElement('a');
        link.href = attachmentUrl;
        link.download = 'attachment';
        link.click();
    };

    return (
        <div className="assign-ticket-container"> {/* Add a container class */}
            <form onSubmit={handleSubmit}>
                <div>
                    <h2>Assigning the Ticket</h2>
                </div>
                {!showForm ? (
                    <>
                        <label htmlFor="ticketId">Ticket ID:</label>
                        <input
                            type="text"
                            id="ticketId"
                            value={ticketId}
                            onChange={handleTicketIdChange}
                        />
                        <br />

                        {ticketContent && (
                            <div className="ticket-content">
                                <h3>Ticket Content:</h3>
                                <p>Title: {ticketContent.title}</p>
                                <p>Description: {ticketContent.description}</p>
                                {attachmentType === 'image' || attachmentType === 'video' ? (
                                    <div className="attachment">
                                        <p>Attachment:</p>
                                        <a href={ticketContent.attachment} target="_blank" rel="noopener noreferrer">
                                            <img src={ticketContent.attachment} alt="Attachment" />
                                        </a>
                                        <div className="attachment-options">
                                            <button onClick={() => handleDownloadAttachment(ticketContent.attachment)}>Download</button>
                                        </div>
                                    </div>
                                ) : attachmentType === 'pdf' || attachmentType === 'text' ? (
                                    <div className="attachment">
                                        <p>Attachment:</p>
                                        <a href={ticketContent.attachment} target="_blank" rel="noopener noreferrer">
                                            View Attachment
                                        </a>
                                        <div className="attachment-options">
                                            <button onClick={() => handleDownloadAttachment(ticketContent.attachment)}>Download</button>
                                        </div>
                                    </div>
                                ) : null}
                            </div>
                        )}

                        {isLoading ? (
                            <BeatLoader color="#000000" size={30} />

                        ) : (
                            <>
                                <button type="submit" className="check-ticket-button">Check Ticket ID</button>
                            </>
                        )}

                    </>
                ) : (
                    <>
                        <label htmlFor="assignTo">Assign To:</label>
                        <select
                            id="assignTo"
                            value={assignTo}
                            onChange={handleAssignToChange}
                        >
                            <option value="">Select an Employee</option>
                            {assignToOptions.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                        <br />
                        <label htmlFor="priority">Priority:</label>
                        <input
                            type="text"
                            id="priority"
                            value={priority}
                            onChange={handlePriorityChange}
                        />
                        <br />
                        <label htmlFor="deadline">Deadline:</label>
                        <DatePicker
                            id="deadline"
                            selected={deadline}
                            onChange={handleDeadlineChange}
                            dateFormat="yyyy-MM-dd"
                        />
                        <br />

                        {isLoading ? (
                            <BeatLoader color="#000000" size={30} />

                        ) : (
                            <>
                                <button type="submit" className="assign-ticket-button">Assign Ticket</button>
                            </>
                        )}

                    </>
                )}
            </form>
        </div>
    )
};

export default AssignTicket;