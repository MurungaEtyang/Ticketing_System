import React, { useEffect, useState } from 'react';

const GetUsersByAuthority: React.FC = () => {
    // const [users, setUsers] = useState([]);
    //
    // useEffect(() => {
    //     fetch('http://localhost:8080/api/v1/users/management')
    //         .then(response => response.json())
    //         .then(data => setUsers(data))
    //         .catch(error => console.log(error));
    // }, []);

    return (
        <div>
            <h2>All Users</h2>
            <table>
                <thead>
                <tr>
                    <th>Username</th>
                    <th>Authority</th>
                    <th>Rating</th>
                </tr>
                </thead>
                <tbody>
                {/*{users.map(user => (*/}
                {/*    <tr key={user.id}>*/}
                {/*        <td>{user.username}</td>*/}
                {/*        <td>{user.authority}</td>*/}
                {/*        <td>{user.rating}</td>*/}
                {/*    </tr>*/}
                {/*))}*/}

                hello world
                </tbody>
            </table>
        </div>
    );
};

export default GetUsersByAuthority;