import React, { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';

const EmployeeDashboard = () => {
    const [raisedTickets, setRaisedTickets] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        try {
            const apiEndpoint = 'http://localhost:8080/api/v1/tickets/report';

            fetch(apiEndpoint,{
                method: "GET",
                headers: {
                    Authorization: 'Basic ' + localStorage.getItem('email_password_credentials')
                }
            })
                .then(response => response.json())
                .then(data => setRaisedTickets(data))
                .catch(error => {
                    console.error('Error fetching ticket data:', error);
                    setError('An error occurred while fetching ticket data.');
                });
        } catch (error) {
            console.error('Error fetching ticket data:', error);
            setError('An error occurred while fetching ticket data.');
        }

    }, []);



    return (
        <div>
            {error && <div className="error">{error}</div>}

            <form className="employee-container">
                <div className="employee-container-body">
                    <table className="table">
                        <thead>
                        <tr className="employee-container-table-header">
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
                        {raisedTickets.map(ticket => (
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
                </div>
            </form>
        </div>
    );
};

export default EmployeeDashboard;