import { useEffect, useState, useRef } from "react";
import Chart from "chart.js/auto";
import './AllUsers.css';

const AllUser = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
    const [searchUsername, setSearchUsername] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);
    const chartRef = useRef<HTMLCanvasElement>(null);
    // const [owners, setOwners] = useState([]);
    const chartRef = useRef<HTMLCanvasElement>(null);

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

    useEffect(() => {

        if (chartRef.current) {
            const ctx = chartRef.current.getContext("2d");
            if (ctx) {
                new Chart(ctx, {
                    type: "bar",
                    data: {
                        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
                        datasets: [
                            {
                                label: "# of Votes",
                                data: [12, 19, 3, 5, 2, 3],
                                backgroundColor: [
                                    "rgba(255, 99, 132, 0.2)",
                                    "rgba(54, 162, 235, 0.2)",
                                    "rgba(255, 206, 86, 0.2)",
                                    "rgba(75, 192, 192, 0.2)",
                                    "rgba(153, 102, 255, 0.2)",
                                    "rgba(255, 159, 64, 0.2)",
                                ],
                                borderColor: [
                                    "rgba(255, 99, 132, 1)",
                                    "rgba(54, 162, 235, 1)",
                                    "rgba(255, 206, 86, 1)",
                                    "rgba(75, 192, 192, 1)",
                                    "rgba(153, 102, 255, 1)",
                                    "rgba(255, 159, 64, 1)",
                                ],
                                borderWidth: 1,
                            },
                        ],
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true,
                            },
                        },
                    },
                });
            }
        }


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

                    // Update the 'owners' state
                    const owners = data.filter((user) => user.authorities.includes("OWNER"));
                    setOwners(owners);
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
        <div>
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

                            <td>USERS</td>
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

            <canvas ref={chartRef} width={400} height={400}></canvas>
        </div>
    );
};

export default AllUser;