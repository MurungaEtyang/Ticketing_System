import React, { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import './AllSentTickets.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

const AllSentTickets = () => {
    const [tickets, setTickets] = useState([]);
    const [error, setError] = useState('');
    const [searchId, setSearchId] = useState('');
    const [searchedTicket, setSearchedTicket] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchTickets = async () => {
            try {

                const response = await fetch('http://localhost:8080/api/v1/tickets/report', {
                    method: "GET",
                    headers: {
                        Authorization: 'Basic ' + localStorage.getItem('email_password_credentials')
                    }
                });

                if (!response.ok) {
                    throw new Error(`Error fetching ticket data: ${response.status}`);
                }

                const data = await response.json();
                const sortedTickets = sortTicketsByStatus(data);
                setTickets(sortedTickets);
            } catch (error) {
                console.error('Error:', error.message);
                setError(`An error occurred: ${error.message}`);
            }
        };

        fetchTickets();
    }, []);

    const sortTicketsByStatus = (data) => {
        const statusOrder = { OPEN: 0, ASSIGNED: 1, SUBMITTED: 2, CLOSED: 3 };
        return data.sort((a, b) => statusOrder[a.status] - statusOrder[b.status]);
    };

    const handleSearch = () => {
        setLoading(true);
        const ticket = tickets.find((ticket) => ticket.id === searchId);
        setSearchedTicket(ticket);
        setLoading(false);
    };

    const getProgressColor = (status) => {
        const colorMap = { CLOSED: 'green', ASSIGNED: '#ff00ff', OPEN: 'red' };
        return colorMap[status] || '';
    };

    const calculateProgressPercentage = (status) => {
        const percentageMap = { CLOSED: '100%', ASSIGNED: '50%', OPEN: '0%' };
        return percentageMap[status] || '';
    };

    const handleInputChange = (e) => {
        setSearchId(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleSearch();
    };

    const renderSearchResult = () => (
        <div className="searched-ticket">
            <h3>Search Result:</h3>
            <div>ID: {searchedTicket.id}</div>
            <div>Description: {searchedTicket.description}</div>
            <div>Status: {searchedTicket.status}</div>
            <div>Assigned To: {searchedTicket.assignedTo}</div>
            <div>Deadline: {searchedTicket.deadline}</div>
            <div>
                Progress:{" "}
                <span style={{ color: getProgressColor(searchedTicket.status) }}>
                    {calculateProgressPercentage(searchedTicket.status)}
                </span>
            </div>
        </div>
    );

    const renderTable = () => (
        <>
            {tickets.length === 0 ? (
                <div className="no-tickets">No tickets available.</div>
            ) : (
                <table className="card-tickets-table">
                    <thead>
                    <tr className="card-tickets-table-header">
                        <th>Ticket ID</th>
                        <th>Status</th>
                        <th>Assigned To</th>
                        <th>Deadline</th>
                        <th>Department</th>
                        <th>Progress</th>
                    </tr>
                    </thead>
                    <tbody>
                    {tickets.map(ticket => (
                        <tr key={ticket.id}>
                            <td>{ticket.ticketNumber}</td>
                            <td>{ticket.status}</td>
                            <td>{ticket.assignedTo}</td>
                            <td>{ticket.deadline}</td>
                            <td>{ticket.departmentAssigned}</td>
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
        </>
    );

    return (
        <div>
            {error && <div className="error">{error}</div>}

            <form className="all-sent-card-tickets" onSubmit={handleSubmit}>
                <div className="all-sent-card-tickets-body">
                    <div className="search-container">
                        <input
                            type="text"
                            placeholder="Enter Ticket ID"
                            value={searchId}
                            onChange={handleInputChange}
                        />
                        <button type="submit">Search</button>
                    </div>

                    {searchedTicket ? renderSearchResult() : renderTable()}
                </div>
            </form>
        </div>
    );
};

export default AllSentTickets;
