import React, {useEffect, useState} from "react";
import './AllUsers.css'
import {faDownload} from "@fortawesome/free-solid-svg-icons";
import apiServices from "../../handleApi/ApiServices.ts";
import ApiServices from "../../handleApi/ApiServices.ts";

const AllUser = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
    const [searchUsername, setSearchUsername] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);
    const apiServices = new ApiServices();


    const fetchRoles = async () => {
        // setLoading(true);
        try {
            const result = await apiServices.allUsers();
            if (result.success) {
                const role = result.data;
                setUsers(role);
                setFilteredUsers(role);
            } else {
                console.error(result.error);
            }
        } catch (error) {
            // Handle other errors, if needed
            console.error('Error fetching roles:', error);
        }

        // setLoading(false);
    };

    useEffect(() => {
        fetchRoles()
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

    const handleSearch = async () => {
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