import React, { useState, useEffect, useRef } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import '../../../../admin/assets/stylesheet/GetAllTickets.css';
import {faBell, faDownload} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TicketTrackProgress from "./TicketTrackProgress";
import './AllSentTickets.css'
import Logo from "../../images/Logo.png";
import { useNavigate } from 'react-router-dom';
import {BsToggleOff, BsToggleOn} from "react-icons/bs";
import {FaBook, FaUsers} from "react-icons/fa";
import {FaHand} from "react-icons/fa6";


const AllSentTickets = () => {
    const email = localStorage.getItem('login_emails')
    const navigate = useNavigate()
    const [tickets, setTickets] = useState([]);
    const [error, setError] = useState('');
    const [searchId, setSearchId] = useState('');
    const [searchedTicket, setSearchedTicket] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showAssignTicketModal, setShowAssignTicketModal] = useState(false);
    const [isButtonClicked, setIsButtonClicked] = useState<boolean>(false);
    const [isSideNavCollapsed, setIsSideNavCollapsed] = useState(true);

    const modalRef = useRef(null);

    const handleLogout = async () => {
        const response = await fetch("http://localhost:8080/logout", {
            method: "GET",
            headers: {
                "Authorization": "Basic " + localStorage.getItem('email_password_credentials')
            },
        }).then(response => navigate('/')).catch(error => navigate('/'));
    };


    const sortTicketsByStatus = (data) => {
        const statusOrder = { OPEN: 0, ASSIGNED: 1, SUBMITTED: 2, CLOSED: 3 };
        return data.sort((a, b) => statusOrder[a.status] - statusOrder[b.status]);
    };

    const getProgressColor = (status) => {
        const colorMap = {OPEN: 'red', ASSIGNED: 'yellow', SUBMITTED: 'green',  CLOSED: 'green'};
        return colorMap[status] || '';
    };

    const calculateProgressPercentage = (status) => {
        const percentageMap = { OPEN: '25%', ASSIGNED: '50%', SUBMITTED: '100%',  CLOSED: '100%'};
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

    const handleCellClickAssign = (event, ticketId, ticketTitle, ticketMessage) => {
        event.preventDefault();
        sessionStorage.setItem('ticket_number', ticketId);
        sessionStorage.setItem('ticket_title', ticketTitle);
        sessionStorage.setItem('ticket_message', ticketMessage);
        setShowAssignTicketModal(true);
        setIsButtonClicked(true);
    };

    const handleToggleSideNav = () => {
        setIsSideNavCollapsed(!isSideNavCollapsed);
    };

    const handleManageEmployee = () => {
        navigate('/dashboard/dashboard/my-tickets')
    }

    const handleManageRefer = () => {
        navigate('/dashboard')
    }

    return (
        <section className={`depart`}>
            <nav className="nav-container">
                <img src={Logo} alt="Logo" />
                <button onClick={handleLogout} className="logout-button">
                    {email}
                </button>
            </nav>
            {error && <div className="error">{error}</div>}

            <div className={`side-nav-bar raised ${isSideNavCollapsed ? "collapsed" : ""}`}>
                <button
                    onClick={handleToggleSideNav}
                    className="toggle-sidenav-button"
                    style={{
                        backgroundColor: isSideNavCollapsed ? "green" : "blue",
                    }}
                >
                    {isSideNavCollapsed ? <BsToggleOn /> : <BsToggleOff />}
                </button>
                <div className="users-management-dropdown">
                    <button className="Ticket-Assignment-button" onClick={handleManageEmployee}>
                        {isSideNavCollapsed ? <FaBook /> : "Tickets"}
                    </button>

                    <button className="Ticket-Assignment-button" onClick={handleManageRefer}>
                        {isSideNavCollapsed ? <FaHand /> : "Raise Tickets"}
                    </button>

                </div>
            </div>

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
                                            {/*<th>Title</th>*/}
                                            {/*<th>Description</th>*/}
                                            <th>Assigned To</th>
                                            <th>Department</th>
                                            <th>Progress</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {tickets.map(ticket => (
                                            <tr key={ticket.id} lassName={isButtonClicked ? 'inactive' : ''}>
                                                <td>
                                                    <button className={`ticketButton`} onClick={(event) =>
                                                        handleCellClickAssign(event, ticket.ticketNumber, ticket.title, ticket.description)} style={{ cursor: 'pointer' }}>
                                                        {ticket.ticketNumber}
                                                    </button>
                                                </td>
                                                {/*<td>{ticket.title}</td>*/}
                                                {/*<td>{ticket.description}</td>*/}
                                                <td>{ticket.assignedTo}</td>
                                                <td>{ticket.departmentAssigned}</td>
                                                <td>
                                                <span style={{ color: getProgressColor(ticket.status) }}>
                                                    {calculateProgressPercentage(ticket.status)}
                                                </span>
                                                </td>

                                                {/*{ticketRequest(ticket.title)}*/}
                                                {/*{ticketMessage(ticket.description)}*/}
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
                        <TicketTrackProgress />
                    </section>
                )}</div>
            </form>

        </section>
    );
};

export default AllSentTickets;