import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { BeatLoader } from 'react-spinners';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../assets/stylesheet/AssignTicket.css';
import moment from "moment";

const DepartmentAssignTicket = () => {
    const [currentForm, setCurrentForm] = useState<'check' | 'content' | 'assign'>('check');
    const [isLoading, setIsLoading] = useState(false);
    const [ticketId, setTicketId] = useState('');
    const [assignTo, setAssignTo] = useState('');
    const [priority, setPriority] = useState('');
    const [deadline, setDeadline] = useState('');
    const [assignToOptions, setAssignToOptions] = useState<string[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [ticketContent, setTicketContent] = useState<{
        id: number;
        title: string;
        description: string;
        priority: string;
        status: string;
        raisedBy: string;
        assignedTo: string;
        deadline: string;
    } | null>(null);


    useEffect(() => {
        // Fetch the Assign To options from the API endpoint
        const fetchAssignToOptions = async () => {
            try {
                await fetch('http://localhost:8080/api/v1/tickets/referral/refer', {
                    method: "GET",
                    headers: {
                        Authorization: 'Basic ' + localStorage.getItem('email_password_credentials')
                    }
                }).then(response => response.json()).then(data => {
                    if(data){
                        // const data = response.json();
                        // const userNames = data.map((user: any) => user.members); // Specify the type of 'user' parameter
                        setAssignToOptions(data.members);
                        // console.log(data.members)
                    }else {
                        alert("")
                    }
                });
            } catch (error) {
                console.error('Error fetching Assign To options:', error);
            }
        };

        fetchAssignToOptions()
    }, []);

    const handleTicketIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTicketId(event.target.value);
    };

    const handleAssignToChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setAssignTo(event.target.value);
    };

    const handleDeadlineChange = (date: Date | null) => {
        setDeadline(moment(date).format('DD/MM/YYYY'));
        // alert(moment(date).format('MM/DD/YYYY'))
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsLoading(true);

        if (currentForm === 'check') {
            try {
                // const formData = new FormData();
                // formData.append('ticket', ticketId);
                await fetch('http://localhost:8080/api/v1/tickets/management/get?ticket_number=%' + encodeURIComponent(ticketId), {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Basic ' + localStorage.getItem('email_password_credentials')
                    },
                    body: JSON.stringify({
                        'ticket': encodeURIComponent(ticketId)
                    })
                });


            } catch (error) {
                toast.error('Error checking ticket: '+error, {
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
            }

        } else if (currentForm === 'content') {
            setCurrentForm('assign');
        } else if (currentForm === 'assign') {
            // API FOR ASSIGNING TICKET TO EMPLOYEE


             await fetch('http://localhost:8080/api/v1/tickets/assign?' +
                'ticket_number=' + encodeURIComponent(ticketId) +
                '&to=' + assignTo +
                '&priority=' + priority +
                '&deadline=' + encodeURIComponent(deadline), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Basic ' + localStorage.getItem('email_password_credentials')
                },
                body: JSON.stringify({
                    'ticketId': encodeURIComponent(ticketId),
                    'assignTo': assignTo,
                    'priority': priority,
                    'deadline': encodeURIComponent(deadline)

                })
            }).then(response => {
                if (response.ok) {
                    // console.log('Ticket assigned successfully');
                    toast.success('Ticket assigned successfully', {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                    setShowForm(false);
                    setCurrentForm('check');
                    // setIsLoading()
                } else {
                    toast.error('Error assigning ticket.', {
                        position: toast.POSITION.BOTTOM_RIGHT,
                    });

                }
            }).catch(() =>{
                toast.error('Error fetching ticket content', {
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
            }).finally(() => {
                setTicketId('');
                setAssignTo('');
                setPriority('');
                setDeadline(null);
                setCurrentForm('check');
            });

            // alert(ticketId);
            // alert(deadline);
            // alert(priority);
            // alert(assignTo)

        }

        setIsLoading(false);
    };
    const showTicketContent = async () => {
        setIsLoading(true);
        alert(ticketId)
        try {
            const response = await fetch('http://localhost:8080/api/v1/tickets/management/get?ticket_number=' + encodeURIComponent(ticketId), {
                method: 'GET',
                headers: {
                    Authorization: 'Basic ' + localStorage.getItem('email_password_credentials')
                }
            });

            if (response.ok) {
                const ticketInfo = await response.json();
                setTicketContent(ticketInfo);
                setCurrentForm('content');
            } else {
                toast.error('Please verify that Ticket ID is assigned to your department.', {
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
                setCurrentForm('check');
            }
        } catch (error) {
            toast.error('Error fetching ticket content: ' + error, {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
            setCurrentForm('check');
        }

        setIsLoading(false);
    };

    const handleNext = () => {
        if (currentForm === 'check') {
            // For testing purposes
            showTicketContent();
            setCurrentForm('content');
        } else if (currentForm === 'content') {
            setCurrentForm('assign');
        }
    };

    const handlePrevious = () => {
        if (currentForm === 'content') {
            setCurrentForm('check');
        } else if (currentForm === 'assign') {
            setCurrentForm('content');
        }
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
                            required
                        />
                    </div>
                    <div>
                        {isLoading ? (
                            <BeatLoader color="#000000" size={30}/>
                        ) : (
                            <button type="button" onClick={handleNext} className="check-ticket-button">
                                Next
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
                            <p>ID: {ticketContent.ticketNumber}</p>
                            <p>Title: {ticketContent.title}</p>
                            <p>Description: {ticketContent.description}</p>
                            <p>Priority: {ticketContent.priority}</p>
                            <p>Status: {ticketContent.status}</p>
                            <p>Raised By: {ticketContent.raisedBy}</p>
                            <p>Assigned To: {ticketContent.assignedTo}</p>
                            <p>Deadline: {ticketContent.deadline}</p>
                            {isLoading ? (
                                <BeatLoader color="#000000" size={30}/>
                            ) : (
                                <>
                                    <button type="button" onClick={handlePrevious} className="check-ticket-button">
                                        Edit ticket
                                    </button>
                                    <button type="button" onClick={handleNext} className="check-ticket-button">
                                        Next
                                    </button>
                                </>
                            )}
                        </div>
                    )}
                </form>
            )}

            {currentForm === 'assign' && (
                <form onSubmit={handleSubmit}>
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
                    <div className="form-group">
                        <label htmlFor="priority">Priority</label>
                        <select
                            className="form-control"
                            id="priority"
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                        >
                            <option value="">Select Priority</option>
                            <option value="LOW">LOW</option>
                            <option value="MEDIUM">MEDIUM</option>
                            <option value="HIGH">HIGH</option>
                        </select>
                    </div>
                    <div>
                        <div>
                            <label htmlFor="deadline">Deadline:</label>
                            <DatePicker
                                id="deadline"
                                value={deadline}
                                onChange={handleDeadlineChange}
                                dateFormat="dd/MM/yyyy"
                                placeholderText="Select a date"

                            />
                        </div>
                    </div>
                    <div>
                        {isLoading ? (
                            <BeatLoader color="#000000" size={30}/>
                        ) : (
                            <>
                                <button type="button" onClick={handlePrevious} className="check-ticket-button">
                                    check again
                                </button>
                                <button type="submit" className="assign-ticket-button">
                                    Assign Ticket
                                </button>
                            </>
                        )}
                    </div>
                </form>
            )}
            <ToastContainer/>
        </div>
    );
}
export default DepartmentAssignTicket;