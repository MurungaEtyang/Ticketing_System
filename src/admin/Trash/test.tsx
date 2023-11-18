import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { BeatLoader } from 'react-spinners';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AssignTicket.css';

const AssignTicket = () => {
    const [currentForm, setCurrentForm] = useState<'check' | 'content' | 'assign'>('check');
    const [isLoading, setIsLoading] = useState(false);
    const [ticketId, setTicketId] = useState('');
    const [assignTo, setAssignTo] = useState('');
    const [priority, setPriority] = useState('');
    const [deadline, setDeadline] = useState<Date | null>(null);
    const [assignToOptions, setAssignToOptions] = useState<string[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [ticketContent, setTicketContent] = useState<{

        title: string;
        description: string;
        attachment: string
    } | null>(null);
    const [attachmentType, setAttachmentType] = useState<string | null>(null);

    useEffect(() => {
        // Fetch the Assign To options from the API endpoint
        const fetchAssignToOptions = async () => {
            try {
                // For testing purposes, set some dummy assignTo options
                setAssignToOptions(['Kamar Baraka', 'Evans Etyang', 'Elijah Mutune', 'Jeff Omondi']);
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

        if (currentForm === 'check') {
            // For testing purposes, directly show the form
            toast.success('Ticket checked successfully', {
                position: toast.POSITION.TOP_RIGHT,
            });
            setCurrentForm('content');
            await showTicketContent();
        } else if (currentForm === 'content') {
            const requestBody = {
                ticketId: ticketId,
                assignTo: assignTo,
                priority: priority,
                deadline: deadline
            };

            try {
                toast.success('Ticket assigned successfully', {
                    position: toast.POSITION.TOP_RIGHT,
                });
            } catch (error) {
                toast.error('Error fetching ticket content', {
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
            }

            // For testing purposes, log the form data
            alert('Ticket ID: ' + ticketId);
            alert('Assign To: ' + assignTo);
            alert('Priority: ' + priority);
            alert('Deadline: ' + deadline);

            // Reset the form
            setTicketId('');
            setAssignTo('');
            setPriority('');
            setDeadline(null);
            setCurrentForm('assign');
        }

        setIsLoading(false);
    };


    const showTicketContent = async () => {

        // for testing the flow of application
        const testData = {
            ticket: ticketId,
            title: "Test Ticket",
            description: "This is a test ticket",
            attachment: "C:/Users/Murunga/Desktop/password.txt/"
            // attachmentType: "image"
        };

        try {
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Set the ticket content and attachment type with the test data
            setTicketContent(testData);
            setAttachmentType(testData.attachment);
            setShowForm(true);

        } catch (error) {
            toast.error('Error fetching ticket content: ' + error, {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        }


    }

    const handleDownloadAttachment = (attachmentUrl: string) => {
        const link = document.createElement('a');
        link.href = attachmentUrl;
        link.download = 'attachment';
        link.click();
    };
    return (
        <div className="assign-ticket-container">
            {currentForm === 'check' && (
                <form onSubmit={handleSubmit}>
                    <div>
                        <h2>Assigning the Ticket</h2>
                    </div>
                    <div>
                        <label htmlFor="ticketId">Ticket ID:</label>
                        <input
                            type="text"
                            id="ticketId"
                            value={ticketId}
                            onChange={handleTicketIdChange}
                        />
                    </div>
                    <div>
                        {isLoading ? (
                            <BeatLoader color="#000000" size={30} />
                        ) : (
                            <button type="submit" className="check-ticket-button">
                                Check Ticket ID
                            </button>
                        )}
                    </div>
                </form>
            )}

            {currentForm === 'content' && (
                <form className="ticket-details-container-form">
                    {ticketContent && (
                        <div className="ticket-content-container">
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
                            {isLoading ? (
                                <BeatLoader color="#000000" size={30} />
                            ) : (
                                <button type="submit" className="check-ticket-button">Next</button>
                            )}
                        </div>
                    )}
                </form>
            )}


            {currentForm === 'assign' && (
                <form>
                    <div>
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
                    </div>
                    <div>
                        <label htmlFor="priority">Priority:</label>
                        <input
                            type="text"
                            id="priority"
                            value={priority}
                            onChange={handlePriorityChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="deadline">Deadline:</label>
                        <DatePicker
                            id="deadline"
                            selected={deadline}
                            onChange={handleDeadlineChange}
                            dateFormat="yyyy-MM-dd"
                        />
                    </div>
                    <div>
                        {isLoading ? (
                            <BeatLoader color="#000000" size={30} />
                        ) : (
                            <button type="submit" className="assign-ticket-button">
                                Assign Ticket
                            </button>
                        )}
                    </div>
                </form>
            )}




            <ToastContainer />
        </div>
    );
}


export default AssignTicket;