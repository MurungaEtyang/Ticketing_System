import React, { useEffect, useState } from "react";
import {useLocation, useNavigate} from "react-router-dom";
import RaisedTicket from "./AssignedTicket.tsx";


const EmployeeDashboard: React.FC = () => {
    const location = useLocation();
    const email = location.state?.email || "";
    const [UserManagement, setUserManagement] = useState(false);
    const [TicketAssignment, setTicketAssignment] = useState(false);
    const [DepartmentManagement, setDepartmentManagement] = useState(false);
    const [selectedMenuItem, setSelectedMenuItem] = useState("");

    const handleLogout = async () => {

        await fetch("http://localhost:8080/logout", {
            method: "GET",
            headers: {
                "Authorization": "Basic " + localStorage.getItem('email_password_credentials')
            },
        }).then(response => {
            alert(response.status);
            if (response.status === 204) {
                const navigate = useNavigate();
                navigate("/");
                return;
            }else{
                alert("Logout failed.");
            }
        }).catch(error => alert("Logout failed: " + error)

        );

    };



    const handleDropdownManageUsers = () => {
        setUserManagement(!UserManagement);
    };

    const handleDropdownTicketAssignment = () => {
        setTicketAssignment(!TicketAssignment);
    };

    const handleDropDownDepartmentManagement = () => {
        setDepartmentManagement(!DepartmentManagement);
    };

    const handleDropdownItemClick = (menuItem: string) => {
        setSelectedMenuItem(menuItem);
    };

    const renderAssociatedFiles = () => {
        switch (selectedMenuItem) {
            case "RaisedTickets":
                return (<div><RaisedTicket/></div>);
            default:
                return null;
        }
    };

    return (
        <body>

        <>
            <div className="admin-dashboard-container">
                {/*logo*/}
                {/*<div>*/}
                {/*    <img src={logo} alt="Logo" className="logo" />*/}
                {/*    <button onClick={handleLogout}>Logout</button>*/}
                {/*</div>*/}
                <div className="profile">
                    <p>Hello {email}</p>
                    {/*<img src={profileImage} alt="Profile" />*/}
                </div>

                <div className="side-nav-bar raised">
                    {/*User Management*/}
                    <div className="users-management-dropdown">
                        {/* Add dropdown */}
                        <button className="Ticket-Assignment-button" onClick={handleDropdownManageUsers}>
                            TICKETS
                        </button>
                        {UserManagement && (
                            <div className="Ticket-Assignment-content">
                                <button
                                    className="Ticket-Assignment-dropdown-button"
                                    onClick={() => handleDropdownItemClick("RaisedTickets")}
                                >
                                    RAISED TICKETS
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {renderAssociatedFiles()}
        </>
        </body>
    );
};

export default EmployeeDashboard;