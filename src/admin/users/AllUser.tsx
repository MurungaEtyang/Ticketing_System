import {useEffect, useState} from "react";
import './AllUsers.css'

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
    const employees = users.filter(user => user.authorities.includes('EMPLOYEE'));
    const regularUsers = users.filter(user => user.authorities.includes('USER'));

    const allUsers = owners.length + admins.length + employees.length + regularUsers.length;

    const handleSearch = () => {
        const filtered = users.filter(user => user.username.toLowerCase().includes(searchUsername.toLowerCase()));
        setFilteredUsers(filtered);
    };

    return (
        <section className={'all-users'}>
            {error && <div className="error">{error}</div>}

            <form className="card-users">
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
                    <table className="card-users-table">
                        <thead>
                        <tr className="card-users-table-header">
                            <th>USERNAME</th>
                            <th>AUTHORITIES</th>
                            <th>RATING</th>

                        </tr>
                        </thead>

                        <tbody>
                        <tr className="card-users-table-header">
                            <td>ALL USERS</td>
                            <td>{allUsers}</td>
                            <td></td>

                            <td>OWNERS</td>
                            <td>{owners.length}</td>
                            <td></td>

                            <td>ADMINS</td>
                            <td>{admins.length}</td>
                            <td></td>

                            <td>EMPLOYEES</td>
                            <td>{employees.length}</td>
                            <td></td>

                            <td>REGULAR USERS</td>
                            <td>{regularUsers.length}</td>
                            <td></td>

                        </tr>
                        </tbody>
                        <tbody>

                        {filteredUsers.map(user => (
                            <tr key={user.username}>
                                <td>{user.username}</td>
                                <td>{user.authorities.join(', ')}</td>
                                <td>{user.rating}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </form>
        </section>
    );
};

export default AllUser;