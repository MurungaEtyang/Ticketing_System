import React, {useEffect, useState} from "react";
import './AllUsers.css'
import {faDownload} from "@fortawesome/free-solid-svg-icons";

const AllUser = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
    const [searchUsername, setSearchUsername] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);

    useEffect(() => {
        try {
            const apiEndpoint = 'http://localhost:8080/api/v1/users/management';

            fetch(apiEndpoint, {
                method: "GET",
                headers: {
                    Authorization: 'Basic ' + localStorage.getItem('email_password_credentials')
                }
            })
                .then(response => response.json())
                .then(data => {
                    setUsers(data);
                    setFilteredUsers(data);
                })
                .catch(error => {
                    console.error('Error fetching users data:', error);
                    setError('An error occurred while fetching user data.');
                });
        } catch (error) {
            console.error('Error fetching user data:', error);
            setError('An error occurred while fetching user data.');
        }
    }, []);

    const owners = users.filter(user => user.authorities.includes('OWNER'));
    const admins = users.filter(user => user.authorities.includes('ADMIN'));
    const hods = users.filter(user => user.authorities.includes('DEPARTMENT_ADMIN'))
    const employees = users.filter(user => user.authorities.includes('EMPLOYEE'));
    const regularUsers = users.filter(user => user.authorities.includes('USER'));
    const allUsers = owners.length + admins.length + hods.length + employees.length + regularUsers.length;

    sessionStorage.setItem('owners', owners.length);
    sessionStorage.setItem('admins', admins.length);
    sessionStorage.setItem('hod', hods.length);
    sessionStorage.setItem('employees', employees.length);
    sessionStorage.setItem('regular-users', regularUsers.length);
    sessionStorage.setItem('all-users', allUsers)

    const handleSearch = () => {
        const filtered = users.filter(user => user.username.toLowerCase().includes(searchUsername.toLowerCase()));
        setFilteredUsers(filtered);
    };

    return (
        <section className={'all-users'}>
            {error && <div className="error">{error}</div>}

            <form className="pcard-users">
                <div className="card-users-body">
                    <div className="search-container">
                        <input
                            type="text"
                            placeholder="Search username"
                            value={searchUsername}
                            onChange={e => setSearchUsername(e.target.value)}
                        />
                        <button type="button" onClick={handleSearch}>Search</button>
                    </div>

                    <section className={`Department-section-ticket`}>
                        {filteredUsers.length === 0 ? (
                            <div className="depart-no-tickets">No tickets available.</div>
                        ) : (
                            <table className="depart-card-tickets-table">
                                <thead>
                                <tr >
                                    <th>USERNAME</th>
                                    <th>AUTHORITIES</th>
                                    <th>RATING</th>
                                </tr>
                                </thead>
                                <tbody>
                                {filteredUsers.map(user => (
                                    <tr key={user.username}>
                                        <td>
                                            {/*<button className={`UserButton`} onClick={(event) => handleCellClickAssign(event, ticket.ticketNumber)} style={{ cursor: 'pointer' }}>*/}
                                            {/*    {user.username}*/}
                                            {/*</button>*/}
                                            {user.username}
                                        </td>
                                        <td>{user.authorities.join(', ')}</td>
                                        <td>{user.rating}</td>
                                        {/*<td>*/}
                                        {/*    <button type="button" onClick={() => {}}>*/}
                                        {/*        <FontAwesomeIcon icon={faDownload} />*/}
                                        {/*    </button>*/}
                                        {/*</td>*/}
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        )}
                    </section>
                </div>
            </form>
        </section>
    );
};

export default AllUser;