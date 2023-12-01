import React, { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import './AllSentTickets.css'
import {faDownload} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const AllSentTickets = () => {
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

            <form className="all-sent-card-tickets">
                <div className="all-sent-card-tickets-body">
                    {/*<div className="search-container">*/}
                    {/*    <input*/}
                    {/*        type="text"*/}
                    {/*        placeholder="Enter Ticket ID"*/}
                    {/*        value={searchId}*/}
                    {/*        onChange={e => setSearchId(e.target.value)}*/}
                    {/*    />*/}
                    {/*    <button type="button" onClick={handleSearch}>Search</button>*/}
                    {/*</div>*/}

                    {searchedTicket ? (
                        <div className="searched-ticket">
                            <h3>Search Result:</h3>
                            <div>ID: {searchedTicket.id}</div>
                            <div>Description: {searchedTicket.description}</div>
                            <div>Status: {searchedTicket.status}</div>
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
                                        <th>Ticket ID</th>
                                        <th>Status</th>
                                        <th>Assigned To</th>
                                        <th>Deadline</th>
                                        <th>Department</th>
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

export default AllSentTickets;