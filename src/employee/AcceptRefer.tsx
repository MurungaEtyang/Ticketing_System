import React, { useState, useEffect, useRef } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import {toast} from "react-toastify";
import '../admin/assets/stylesheet/GetAllTickets.css';
import {FaBook, FaShare, FaUsers} from "react-icons/fa";
import {BsToggleOff, BsToggleOn} from "react-icons/bs";
import Logo from "../assets/component/images/Logo.png";
import ReRefer from "./employeeAccept/ReRefer";
import ReReferDetails from "./employeeAccept/ReReferDetails";

const AcceptRefer = () => {
    const navigate = useNavigate();
    const email = localStorage.getItem('login_emails')
    const [tickets, setTickets] = useState([]);
    const [error, setError] = useState('');
    const [searchId, setSearchId] = useState('');
    const [searchedTicket, setSearchedTicket] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showAssignTicketModal, setShowAssignTicketModal] = useState(false);
    const [showTicketDetails, setShowTicketDetails] = useState(false);
    const [loadingStates, setLoadingStates] = useState({});
    const [isSideNavCollapsed, setIsSideNavCollapsed] = useState(true);

    const modalRef = useRef(null);

    const sortTicketsByStatus = (data) => {
        const statusOrder = { OPEN: 0, ASSIGNED: 1, SUBMITTED: 2, CLOSED: 3 };
        return data.sort((a, b) => statusOrder[a.status] - statusOrder[b.status]);
    };

    const handleLogout = async () => {
        const response = await fetch("http://localhost:8080/logout", {
            method: "GET",
            headers: {
                "Authorization": "Basic " + localStorage.getItem('email_password_credentials')
            },
        }).then(response => navigate('/')).catch(error => navigate('/'));
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
        const apiEndpoint = "http://localhost:8080/api/v1/tickets/referral/to?to=" + email;

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

    const HandleRerefer = (event, ticketId) => {
        event.preventDefault();
        const split = ticketId.split(' ')[0]
        console.log(split)
        localStorage.setItem('ticket_no', split);
        setShowAssignTicketModal(true);
    };

    const HandleTicketDetails = (event, ticketId, reason, ticketNumber) => {
        event.preventDefault();
        sessionStorage.setItem('referral_id', ticketId)
        sessionStorage.setItem('referral_reason', reason)
        sessionStorage.setItem('ticket_number', ticketNumber)
        setShowTicketDetails( true);
    }

    //handle ticket
    const submitTicket = (refId) => {
        setLoading(true);
        const apiEndpoint = "http://localhost:8080/api/v1/tickets/referral?accept=true&referral_id=" + refId;
        fetch(apiEndpoint, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Basic ' + localStorage.getItem('email_password_credentials'),
            },
        })
            .then(async (response) => {
                if (response.ok) {
                    toast.success("Accepted", {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                } else {
                    toast.error('Error: ' + response.statusText, {
                        position: toast.POSITION.BOTTOM_RIGHT,
                    });
                }
                setLoading(false);
            })
            .catch((error) => {
                toast.error('Error: ' + error, {
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
                setLoading(false);
            });
    };

    const setTicketLoadingState = (ticketId, isLoading) => {
        setLoadingStates((prevLoadingStates) => ({
            ...prevLoadingStates,
            [ticketId]: isLoading,
        }));
    };

    const handleToggleSideNav = () => {
        setIsSideNavCollapsed(!isSideNavCollapsed);
    };

    const handleManageEmployee = () => {
        navigate('/employee')
    }

    const handleManageRefer = () => {
        navigate('/referral')
    }


    return (
        <section className={`depart-referral`}>
            {error && <div className="error">{error}</div>}

            <nav className="nav-container">
                <div className={`employee-logo`}>
                    <img src={Logo} alt="Logo" />
                    <button onClick={handleLogout} className="logout-button">
                        {email}
                    </button>
                </div>
                <div className="profile-email">
                    {/*<p>Email Placeholder</p>*/}
                </div>
            </nav>

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
                        {isSideNavCollapsed ? <FaUsers /> : "Referrals"}
                    </button>

                </div>
            </div>

            <form className="depart">
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
                            {/*<h3>Search Result:</h3>*/}
                            {/*<div>ID: {searchedTicket.ticketNumber}</div>*/}
                            {/*<div>Title: {searchedTicket.title}</div>*/}
                            {/*<div>Description: {searchedTicket.description}</div>*/}
                            {/*<div>Priority: {searchedTicket.priority}</div>*/}
                            {/*<div>Status: {searchedTicket.status}</div>*/}
                            {/*<div>Raised By: {searchedTicket.raisedBy}</div>*/}
                            {/*<div>Assigned To: {searchedTicket.assignedTo}</div>*/}
                            {/*<div>Deadline: {searchedTicket.deadline}</div>*/}
                        </div>
                    ) : (
                        <>
                            <div className={`Department-section-ticket`}>
                                {tickets.length === 0 ? (
                                    <div className="depart-no-tickets">No tickets available.</div>
                                ) : (
                                    <table className="depart-card-tickets-table">
                                        <thead>
                                        <tr >
                                            <th>Ticket</th>
                                            <th>Referral ID</th>
                                            <th>Referred From</th>
                                            <th>Requested On</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {tickets.map(refRequest => (
                                            <tr key={refRequest.id}>
                                                <td>
                                                    {/*<button className={`ticketButton`} onClick={(event) => HandleTicketDetails(event, refRequest.ticketNumber)} style={{ cursor: 'pointer' }}>*/}
                                                    {/*    {refRequest.referredTicket}*/}
                                                    {/*</button>*/}
                                                    <td>
                                                        <button className={`ticketButton`} onClick={(event) => HandleTicketDetails(event, refRequest.referralId, refRequest.reason, refRequest.referredTicket)} style={{ cursor: 'pointer' }}>
                                                            {refRequest.referredTicket}
                                                        </button>
                                                    </td>
                                                </td>
                                                <td>{refRequest.referralId}</td>
                                                <td>{refRequest.from}</td>
                                                <td>{refRequest.requestedOn}</td>

                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                )}
                            </div>
                        </>
                    )}

                </div>
                <div>{showAssignTicketModal && (
                    <section className="ticket-depart-modal">
                        <button className="close-button" onClick={() => setShowAssignTicketModal(false)}>
                            X
                        </button>
                        <ReRefer />
                    </section>
                )}</div>

                <div>{showTicketDetails && (
                    <section className="ticket-depart-modal">
                        <button className="close-button" onClick={() => setShowTicketDetails(false)}>
                            X
                        </button>
                        <ReReferDetails />
                    </section>
                )}</div>
            </form>

        </section>
    );
};

export default AcceptRefer;