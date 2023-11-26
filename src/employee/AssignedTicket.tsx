import './AssignedTicket.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare, faCheck, faDownload } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css';
import React, { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify";
import Select from "react-select";


const AssignedTicket = () => {
    const [raisedTickets, setRaisedTickets] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [selectedEmail, setSelectedEmail] = useState('');

    useEffect(() => {
        try {
            const apiEndpoint = 'http://localhost:8080/api/v1/tickets/report';

            fetch(apiEndpoint, {
                method: "GET",
                headers: {
                    Authorization: 'Basic ' + localStorage.getItem('email_password_credentials')
                }
            })
                .then(response => response.json())
                .then(data => setRaisedTickets(data))
                .catch(error => {
                    // console.error('Error fetching ticket data:', error);
                    setError('An error occurred while fetching ticket data.');
                });
        } catch (error) {
            console.error('Error fetching ticket data:', error);
            setError('An error occurred while fetching ticket data.');
        }

    }, []);

    const downloadTicket = (ticketId) => {
        const apiEndpoint = `http://localhost:8080/api/v1/tickets/management/attachment?ticket_id=${ticketId}`;

        fetch(apiEndpoint, {
            method: "GET",
            headers: {
                Authorization: 'Basic ' + localStorage.getItem('email_password_credentials')
            }
        }).then(response => {
            if (response.ok) {
                const disposition = response.headers.get('content-disposition');
                const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
                const matches = filenameRegex.exec(disposition);
                const filename = matches !== null && matches[1] ? matches[1].replace(/['"]/g, '') : 'attachment';

                response.blob().then(blob => {
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = filename;
                    link.click();
                    URL.revokeObjectURL(url);
                });

            } else {
                alert("Error downloading ticket attachment: Can not locate file")
            }
        }).catch(error => {
            console.error('Error downloading ticket attachment:', error.message);
            setError('An error occurred while downloading the ticket attachment.');
        });
    };

    const submitTicket = (ticketId) => {
        setLoading(true);

        const apiEndpoint = "http://localhost:8080/api/v1/tickets/submit?ticket_id=" + ticketId;
        fetch(apiEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Basic ' + localStorage.getItem('email_password_credentials')
            }
        }).then(response => {
            if (response.ok) {
                alert("Ticket submitted successfully");
                toast.success("Ticket submitted successfully", {
                    position: toast.POSITION.TOP_RIGHT,
                });
            }else {
                alert("Ticket can not be submitted: " + response.status);
            }
            setLoading(false);
        }).catch(error => {
            toast.error('Error: ' + error, {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
            setLoading(false);
        })
    }

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/v1/users/management/authority?authority=employee', {
                method: "GET",
                headers: {
                    Authorization: 'Basic ' + localStorage.getItem('email_password_credentials')
                }
            });
            const data = await response.json();
            const userNames = data.map((user) => user.username);
            setUsers(userNames.map((name) => ({ emails: name })));
        } catch (error) {
            toast.error(error, {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const referTicket = (ticketId) => {
        setLoading(true);

        const apiEndpoint = "http://localhost:8080/api/v1/tickets/submit?ticket_id=" + ticketId;
        const payload = {
            email: selectedEmail,
            ticketId: ticketId
        };

        fetch(apiEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Basic ' + localStorage.getItem('email_password_credentials')
            },
            body: JSON.stringify(payload)
        }).then(response => {
            if (response.ok) {
                alert("Ticket referred successfully");
                toast.success("Ticket referred successfully", {
                    position: toast.POSITION.TOP_RIGHT,
                });
            }else {
                alert("Ticket can not be referred: " + response.status);
            }
            setLoading(false);
        }).catch(error => {
            toast.error('Error: ' + error, {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
            setLoading(false);
        })
    }

    return (
        <div>
            {error && <div className="error">{error}</div>}

            <form className="employee-container">
                <div className="employee-container-body">
                    <table className="table">
                        <thead>
                        <tr className="employee-container-table-header">
                            <th>Ticket ID</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Deadline</th>
                            <th>Submit</th>
                            <th>Refer</th>
                            <th>Download Attachment</th>
                        </tr>
                        </thead>
                        <tbody>
                        {raisedTickets.map((ticket) => (
                            <tr key={ticket.id}>
                                <td>{ticket.id}</td>
                                <td>{ticket.title}</td>
                                <td className="description-columniui">{ticket.description}</td>
                                <td>{ticket.deadline}</td>
                                <td>
                                    <button
                                        onClick={() => submitTicket(ticket.id)} // Pass ticketId as parameter
                                        disabled={loading} // Disable button while loading
                                    >
                                        {loading ? "Submitting..." : <FontAwesomeIcon icon={faCheck} />}
                                    </button>
                                </td>
                                <td>
                                    <form>
                                        <div className="refer-container">
                                            <Select
                                                required
                                                options={users.map((email) => ({ value: email.emails, label: email.emails }))}
                                                value={selectedEmail}
                                                onChange={(selectedOption) => setSelectedEmail(selectedOption)}
                                                isSearchable
                                            />
                                            <button
                                                onClick={() => referTicket(ticket.id)} // Pass ticketId as parameter
                                                disabled={loading} // Disable button while loading
                                            >
                                                {loading ? "Referring..." : <FontAwesomeIcon icon={faShare} />}
                                            </button>
                                        </div>
                                    </form>
                                </td>
                                <td>
                                    <button type="button" onClick={() => downloadTicket(ticket.id)}>
                                        <FontAwesomeIcon icon={faDownload} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </form>
        </div>
    );
};

export default AssignedTicket;