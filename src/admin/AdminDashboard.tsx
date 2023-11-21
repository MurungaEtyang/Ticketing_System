import React, { useEffect, useState } from "react";
import {useLocation, useNavigate} from "react-router-dom";
import './assets/stylesheet/adminDashboard.css'
import logo from './assets/images/logo.jpeg'
import AssignTicket from "./ticketAssignment/AssignTicket.tsx";
import GetAllTickets from "./ticketAssignment/GetAllTickets.tsx";
import AddUserToDepartment from "./departmentMnagement/AddUserToDepartment.tsx";
import CreateDepartment from "./departmentMnagement/CreateDepartment.tsx";
import Registration from "./users/Registration.tsx";
import AllUser from "./users/AllUser.tsx";


const AdminDashboard: React.FC = () => {
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
            case "RegisterUser":
                return (<div><Registration /></div>);
            case "ALLUsers":
                return (<div><AllUser /></div>);
            case "AllTickets":
                return (<div><GetAllTickets /></div>);
            case "AssignTicket":
                return (<div><AssignTicket /></div>);
            case "CreateDepartment":
                return (<div><CreateDepartment/></div>);
            case "AddUsersToDepartment":
                return (<div><AddUserToDepartment /></div>);
            default:
                return null;
        }
    };

    return (
        <body>

        <>
            <div className="admin-dashboard-container">
                {/*logo*/}
                <div>
                    <img src={logo} alt="Logo" className="logo" />
                    <button onClick={handleLogout}>Logout</button>
                </div>
                <div className="profile">
                    <p>Hello {email}</p>
                    {/*<img src={profileImage} alt="Profile" />*/}
                </div>

                <div className="side-nav-bar raised">
                    {/*User Management*/}
                    <div className="users-management-dropdown">
                        {/* Add dropdown */}
                        <button className="Ticket-Assignment-button" onClick={handleDropdownManageUsers}>
                            Manage Users
                        </button>
                        {UserManagement && (
                            <div className="Ticket-Assignment-content">
                                <button
                                    className="Ticket-Assignment-dropdown-button"
                                    onClick={() => handleDropdownItemClick("RegisterUser")}
                                >
                                    Register User
                                </button>
                                <button
                                    className="Ticket-Assignment-dropdown-button"
                                    onClick={() => handleDropdownItemClick("UpgradeUser")}
                                >
                                    Upgrade User
                                </button>
                                <button
                                    className="Ticket-Assignment-dropdown-button"
                                    onClick={() => handleDropdownItemClick("ALLUsers")}
                                >
                                    All users
                                </button>
                            </div>
                        )}
                    </div>


                    {/*Ticket Assignment*/}
                    <div className="Ticket-Assignment-dropdown">
                        {/* Add dropdown */}
                        <button className="Ticket-Assignment-button" onClick={handleDropdownTicketAssignment}>
                            Ticket Assignment
                        </button>
                        {TicketAssignment && (
                            <div className="Ticket-Assignment-content">
                                <button
                                    className="Ticket-Assignment-dropdown-button"
                                    onClick={() => handleDropdownItemClick("AllTickets")}
                                >
                                    AllTickets
                                </button>
                                <button
                                    className="Ticket-Assignment-dropdown-button"
                                    onClick={() => handleDropdownItemClick("AssignTicket")}
                                >
                                    Assign Ticket
                                </button>
                            </div>
                        )}
                    </div>
                    {/*Department Management*/}
                    <div className="Department-Management-dropdown">
                        {/* Add dropdown */}
                        <button className="Department-Management-button" onClick={handleDropDownDepartmentManagement}>
                            Department Management
                        </button>
                        {DepartmentManagement && (
                            <div className="Department-Management-content">
                                <button
                                    className="Department-Management-dropdown-button"
                                    onClick={() => handleDropdownItemClick("CreateDepartment")}
                                >
                                    Create department
                                </button>
                                <button
                                    className="Department-Management-dropdown-button"
                                    onClick={() => handleDropdownItemClick("AddUsersToDepartment")}
                                >
                                    Add users to department
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

export default AdminDashboard;