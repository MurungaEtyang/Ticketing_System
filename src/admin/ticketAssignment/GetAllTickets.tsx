import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './GetAllTickets.css';

const GetAllTickets = () => {
    const [tickets, setTickets] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const apiEndpoint = 'http://localhost:80801/api/v1/tickets/report';

        fetch(apiEndpoint)
            .then(response => response.json())
            .then(data => setTickets(data))
            .catch(error => {
                console.error('Error fetching ticket data:', error);
                setError('An error occurred while fetching ticket data.');
            });
    }, []);

    return (
        <div>
            {error && <div className="error">{error}</div>}

            <table>
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Type</th>
                    <th>Deprecation</th>
                    <th>Profile</th>
                    <th>Name</th>
                </tr>
                </thead>
                <tbody>
                {tickets.map(ticket => (
                    <tr key={ticket.id}>
                        <td>{ticket.Title}</td>
                        <td>{ticket.Type}</td>
                        <td>{ticket.Deprecation}</td>
                        <td>{ticket.Profile}</td>
                        <td>{ticket.Name}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default GetAllTickets;