import React, { useState, useEffect, useRef } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import {faCheck, faDownload} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from 'react-router-dom';
import Refer from "./Refer";
import {toast} from "react-toastify";
import '../assets/component/stylesheeet/ticketDetails.css'
// import '../assets/stylesheet/GetAllTickets.css';
// import DepartmentAssignTicket from "./DepartmentAssignTicket";

const AssignedTicket = () => {
    const ticketId = localStorage.getItem('ticket_no');
    const [tickets, setTickets] = useState([]);
    const [error, setError] = useState('');
    const [searchId, setSearchId] = useState('');
    const [searchedTicket, setSearchedTicket] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showAssignTicketModal, setShowAssignTicketModal] = useState(false);
    const [loadingStates, setLoadingStates] = useState({});

    const modalRef = useRef(null);

    const sortTicketsByStatus = (data) => {
        const statusOrder = { OPEN: 0, ASSIGNED: 1, SUBMITTED: 2, CLOSED: 3 };
        return data.sort((a, b) => statusOrder[a.status] - statusOrder[b.status]);
    };

    const getProgressColor = (status) => {
        const colorMap = {OPEN: 'red', ASSIGNED: 'yellow', SUBMITTED: 'blue',  CLOSED: 'green'};
        return colorMap[status] || '';
    };

    const calculateProgressPercentage = (status) => {
        const percentageMap = { OPEN: '25%', ASSIGNED: '50%', SUBMITTED: '75%',  CLOSED: '100%'};
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
        const apiEndpoint = 'http://localhost:8080/api/v1/tickets/management/get?ticket_number=' + encodeURIComponent(ticketId);

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



    const HandleTicketDetails = (event, ticketId) => {
        event.preventDefault();
        localStorage.setItem('ticket_number', ticketId);
        setShowAssignTicketModal(true);
    };

    //handle ticket


    const setTicketLoadingState = (ticketId, isLoading) => {
        setLoadingStates((prevLoadingStates) => ({
            ...prevLoadingStates,
            [ticketId]: isLoading,
        }));
    };


    return (
        <section className={`depart-ticket-details`}>
            {error && <div className="error">{error}</div>}

            <form className="depart-card-tickets">
                <div className="depart-card-tickets-body">
                    <div className={`Department-section-ticket`}>
                        {tickets.length === 0 ? (
                            <div className="depart-no-tickets">No tickets available.</div>
                        ) : (
                            <table className="depart-card-tickets-table">
                                <thead>
                                <tr >
                                    <th>Ticket</th>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Submit</th>
                                    <th>status</th>
                                    <th>Raised By</th>
                                    <th>Department</th>
                                    <th>Download Attachment</th>
                                    <th>Progress</th>
                                </tr>
                                </thead>
                                <tbody>
                                {tickets.map(ticket => (
                                    <tr key={ticket.id}>
                                        <td>
                                            <button className={`ticketButton`} onClick={(event) => HandleTicketDetails(event, refRequest.referredTicket)} style={{ cursor: 'pointer' }}>
                                                {ticket.ticketNumber}
                                            </button>
                                        </td>
                                        <td>{ticket.title}</td>
                                        <td className="description-column">{ticket.description}</td>
                                        <td><button
                                            type="button"
                                            onClick={() => {
                                                setTicketLoadingState(ticket.ticketNumber, true);
                                            }}
                                            disabled={loadingStates[ticket.ticketNumber]}
                                        >
                                            {loadingStates[ticket.ticketNumber] ? "Submitting..." : <FontAwesomeIcon icon={faCheck} />}
                                        </button></td>

                                        <td>{ticket.status}</td>
                                        <td>{ticket.raisedBy}</td>
                                        <td>{ticket.departmentAssigned}</td>
                                        <td>
                                            <button type="button" onClick={() => downloadTicket(ticket.id)}>
                                                <FontAwesomeIcon icon={faDownload} />
                                            </button>
                                        </td>
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
                    </div>

                </div>
                <div>{showAssignTicketModal && (
                    <section className="ticket-depart-modal">
                        <button className="close-button" onClick={() => setShowAssignTicketModal(false)}>
                            X
                        </button>
                        <Refer />
                    </section>
                )}</div>
            </form>

        </section>
    );
};

export default AssignedTicket;