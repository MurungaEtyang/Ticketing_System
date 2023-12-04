import React, { useState, useEffect, useRef } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import '../assets/stylesheet/GetAllTickets.css';
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from 'react-router-dom';
import DepartmentAssignTicket from "./DepartmentAssignTicket";

const DepartmentTicket = () => {
    const navigate = useNavigate();
    const [tickets, setTickets] = useState([]);
    const [error, setError] = useState('');
    const [searchId, setSearchId] = useState('');
    const [searchedTicket, setSearchedTicket] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showAssignTicketModal, setShowAssignTicketModal] = useState(false);

    const modalRef = useRef(null);

    const sortTicketsByStatus = (data) => {
        const statusOrder = { OPEN: 0, ASSIGNED: 1, SUBMITTED: 2, CLOSED: 3 };
        return data.sort((a, b) => statusOrder[a.status] - statusOrder[b.status]);
    };

    const showColorInTicket = (response, ticketNumber) => {
        const buttonColor = {}
    }

    const getProgressColor = (status) => {
        const colorMap = {OPEN: 'red', ASSIGNED: 'yellow', SUBMITTED: 'green',  CLOSED: 'green'};
        return colorMap[status] || '';
    };

    const calculateProgressPercentage = (status) => {
        const percentageMap = { OPEN: '0%', ASSIGNED: '50%', SUBMITTED: '100%',  CLOSED: '100%'};
        return percentageMap[status] || '';
    };

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setShowAssignTicketModal(false);
            }
        };

        // Add event listener when the component mounts
        document.addEventListener('click', handleOutsideClick);

        // Remove event listener when the component unmounts
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);


    useEffect(() => {
        const apiEndpoint = 'http://localhost:8080/api/v1/tickets/report';

        fetch(apiEndpoint, {
            method: "GET",
            headers: {
                Authorization: 'Basic ' + localStorage.getItem('email_password_credentials')
            }
        })
            .then(response => {
                if (response.ok) {
                    response.json()
                        .then(data => {
                            const sortedData = sortTicketsByStatus(data);
                            setTickets(sortedData);
                            console.log(response.json());
                        })
                        .catch(error => {
                            console.error('Error parsing JSON:', error.message);
                            setError('An error occurred while parsing JSON.');
                        });
                } else {
                    console.error('Error fetching ticket data:', response.status);
                    setError('An error occurred while fetching ticket data.');
                }
            })
            .catch(error => {
                console.error('Error fetching ticket data:', error.message);
                setError('An error occurred while fetching ticket data.');
            });
    }, []);

    const handleSearch = () => {
        setLoading(true);
        const ticket = tickets.find(ticket => ticket.ticketNumber === searchId);
        setSearchedTicket(ticket);
        setLoading(false);
        console.log(setSearchedTicket(ticket))
    };

    const downloadTicket = (ticketId) => {
        const apiEndpoint = `http://localhost:8080/api/v1/tickets/management/attachment?ticket_id=${encodeURIComponent(ticketId)}`;

        fetch(apiEndpoint, {
            method: "GET",
            headers: {
                Authorization: 'Basic ' + localStorage.getItem('email_password_credentials')
            }
        })
            .then(response => {
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
                    alert("Error downloading ticket attachment: Can not locate file");
                }
            })
            .catch(error => {
                console.error('Error downloading ticket attachment:', error.message);
                setError('An error occurred while downloading the ticket attachment.');
            });
    };

    const handleCellClickAssign = (event, ticketId) => {
        event.preventDefault();
        localStorage.setItem('ticket_number', ticketId);
        setShowAssignTicketModal(true);
    };

    return (
        <section className={`depart`}>
            {error && <div className="error">{error}</div>}

            <form className="depart-card-tickets">
                <div className="depart-card-tickets-body">
                    <div className="depart-search-container">
                        <input
                            type="text"
                            placeholder="Enter Ticket ID"
                            value={searchId}
                            onChange={e => setSearchId(e.target.value)}
                        />
                        <button type="button" onClick={handleSearch}>Search</button>
                    </div>

                    {searchedTicket ? (
                        <div className="depart-searched-ticket">
                            <h3>Search Result:</h3>
                            <div>ID: {searchedTicket.ticketNumber}</div>
                            <div>Title: {searchedTicket.title}</div>
                            <div>Description: {searchedTicket.description}</div>
                            <div>Priority: {searchedTicket.priority}</div>
                            <div>Status: {searchedTicket.status}</div>
                            <div>Raised By: {searchedTicket.raisedBy}</div>
                            <div>Assigned To: {searchedTicket.assignedTo}</div>
                            <div>Deadline: {searchedTicket.deadline}</div>
                        </div>
                    ) : (
                        <>
                            <section className={`Department-section-ticket`}>
                                {tickets.length === 0 ? (
                                    <div className="depart-no-tickets">No tickets available.</div>
                                ) : (
                                    <table className="depart-card-tickets-table">
                                        <thead>
                                        <tr >
                                            <th>Ticket</th>
                                            <th>Title</th>
                                            <th>Description</th>
                                            <th>Status</th>
                                            <th>Raised By</th>
                                            <th>Assigned To</th>
                                            <th>Department</th>
                                            {/*<th>Download Attachment</th>*/}
                                            <th>Progress</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {tickets.map(ticket => (
                                            <tr key={ticket.id}>
                                                <td>
                                                    <button className={`ticketButton`} onClick={(event) => handleCellClickAssign(event, ticket.ticketNumber)} style={{ cursor: 'pointer' }}>
                                                        {ticket.ticketNumber}
                                                    </button>
                                                </td>
                                                <td>{ticket.title}</td>
                                                <td className="description-column">{ticket.description}</td>
                                                <td>{ticket.status}</td>
                                                <td>{ticket.raisedBy}</td>
                                                <td>{ticket.assignedTo}</td>
                                                <td>{ticket.departmentAssigned}</td>
                                                {/*<td>*/}
                                                {/*    <button type="button" onClick={() => downloadTicket(ticket.id)}>*/}
                                                {/*        <FontAwesomeIcon icon={faDownload} />*/}
                                                {/*    </button>*/}
                                                {/*</td>*/}
                                                <td>
                                                <span style={{ color: getProgressColor(ticket.status) }}>
                                                    {calculateProgressPercentage(ticket.status)}
                                                </span>
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                )}
                            </section>
                        </>
                    )}

                </div>
                <div>{showAssignTicketModal && (
                    <section className="ticket-depart-modal">
                        <button className="close-button" onClick={() => setShowAssignTicketModal(false)}>
                            X
                        </button>
                        <DepartmentAssignTicket />
                    </section>
                )}</div>
            </form>

        </section>
    );
};

export default DepartmentTicket;