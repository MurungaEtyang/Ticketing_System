import React, { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import '../assets/stylesheet/GetAllTickets.css';

const GetAllTickets = () => {
    const [tickets, setTickets] = useState([]);
    const [error, setError] = useState('');
    const [searchId, setSearchId] = useState('');
    const [searchedTicket, setSearchedTicket] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const apiEndpoint = 'http://localhost:8080/api/v1/tickets/report';

        fetch(apiEndpoint, {
            method: "GET",
            headers: {
                Authorization: 'Basic ' + localStorage.getItem('email_password_credentials')
            }
        }).then(response => {
            if (response.ok) {
                response.json().then(data => {
                    setTickets(data);
                }).catch(error => {
                    console.error('Error parsing JSON:', error.message);
                    setError('An error occurred while parsing JSON.');
                });
            } else {
                console.error('Error fetching ticket data:', response.status);
                setError('An error occurred while fetching ticket data.');
            }
        }).catch(error => {
            console.error('Error fetching ticket data:', error.message);
            setError('An error occurred while fetching ticket data.');
        });
    }, []);

    const handleSearch = () => {
        setLoading(true)
        const ticket = tickets.find(ticket => ticket.id === searchId);
        setSearchedTicket(ticket);
        setLoading(false);
    };

    return (
        <div>
            {error && <div className="error">{error}</div>}

            <form className="card-tickets">
                <div className="card-tickets-body">
                    <div className="search-container">
                        <input
                            type="text"
                            placeholder="Enter Ticket ID"
                            value={searchId}
                            onChange={e => setSearchId(e.target.value)}
                        />
                        <button type="button" onClick={handleSearch}>Search</button>
                    </div>

                    {searchedTicket ? (
                        <div className="searched-ticket">
                            <h3>Search Result:</h3>
                            <div>ID: {searchedTicket.id}</div>
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
                            {tickets.length === 0 ? (
                                <div className="no-tickets">No tickets available.</div>
                            ) : (
                                <table className="card-tickets-table">
                                    <thead>
                                    <tr className="card-tickets-table-header">
                                        <th>ID</th>
                                        <th>Title</th>
                                        <th>Description</th>
                                        <th>Priority</th>
                                        <th>Status</th>
                                        <th>Raised By</th>
                                        <th>Assigned To</th>
                                        <th>Deadline</th>
                                        <th>Download Attachment</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {tickets.map(ticket => (
                                        <tr key={ticket.id}>
                                            <td>{ticket.id}</td>
                                            <td>{ticket.title}</td>
                                            <td className="description-column">{ticket.description}</td>
                                            <td>{ticket.priority}</td>
                                            <td>{ticket.status}</td>
                                            <td>{ticket.raisedBy}</td>
                                            <td>{ticket.assignedTo}</td>
                                            <td>{ticket.deadline}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            )}
                        </>
                    )}
                </div>
            </form>
        </div>
    );
};

export default GetAllTickets;