import React, { useEffect, useState } from "react";
import {useLocation, useNavigate} from "react-router-dom";
import './assets/stylesheet/adminDashboard.css'
import logo from './assets/images/logo.jpeg'
import AssignTicket from "./ticketAssignment/AssignTicket.tsx";
import GetAllTickets from "./ticketAssignment/GetAllTickets.tsx";
import AddUserToDepartment from "./department/AddUserToDepartment.tsx";
import CreateDepartment from "./department/CreateDepartment.tsx";
import Registration from "./users/Registration.tsx";
import AllUser from "./users/AllUser.tsx";
import ElevateUser from "./users/ElevateUser.tsx";
import DowngradeUser from "./users/DowngradeUser.tsx";
import DepartmentTicket from "./HODManagement/DepartmentTicket";
import Logo from "../assets/component/images/Logo.png";
import AssignedTicket from "../employee/AssignedTicket";
import DepartmentAssignTicket from "./HODManagement/DepartmentAssignTicket";
import {BsToggleOff, BsToggleOn} from "react-icons/bs";
import {AiOutlineFileAdd, AiOutlineFileSearch} from "react-icons/ai";
import {
    FaUser,
    FaUsers,
    FaArrowUp,
    FaArrowDown,
    FaTasks,
    FaListAlt,
    FaSitemap,
    FaPlusSquare, FaUserFriends
} from "react-icons/fa";
import AcceptRefer from "../employee/AcceptRefer";
import AnalogClock from "./AnalogClock";


const AdminDashboard: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const email = localStorage.getItem("login_emails")
    const [UserManagement, setUserManagement] = useState(false);
    const [TicketAssignment, setTicketAssignment] = useState(false);
    const [DepartmentManagement, setDepartmentManagement] = useState(false);
    const [selectedMenuItem, setSelectedMenuItem] = useState("");
    const [DepartmentTickets, setDepartmentTickets] = useState(false);
    const department = localStorage.getItem('data_authority');
    const [isSideNavCollapsed, setIsSideNavCollapsed] = useState(true);

    const handleLogout = async () => {

            const response = await fetch("http://localhost:8080/logout", {
                method: "GET",
                headers: {
                    "Authorization": "Basic " + localStorage.getItem('email_password_credentials')
                },
            })

        if (response.status == 204) {
            const navigate = useNavigate();
            navigate("/");
            return;
        }else{
            alert("Logout failed.");
        }

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

    const handleDropdownDepartmentTickets = () => {
        setDepartmentTickets(!DepartmentTickets);
    }

    const handleDropdownItemClick = (menuItem: string) => {
        setSelectedMenuItem(menuItem);
    };


    const renderAssociatedFiles = () => {
            switch (selectedMenuItem) {

                case "RegisterUser":
                    return <div><Registration /></div>;
                case "ALLUsers":
                    return <div><AllUser /></div>;
                case "AllTickets":
                    return <div><GetAllTickets /></div>;
                case "DepartmentAssignTicket":
                    return <div><DepartmentAssignTicket /></div>;
                case "DepartmentTickets":
                    return <div><DepartmentTicket /></div>;
                case "DowngradeUser":
                    return <div><DowngradeUser /></div>;
                case "ElevateUser":
                    return <div><ElevateUser /></div>;
                case "AssignTicket":
                    return <div><AssignTicket /></div>;
                case "CreateDepartment":
                    return <div><CreateDepartment/></div>;
                case "AddUsersToDepartment":
                    return <div><AddUserToDepartment /></div>;
                default:
                    return null;
            }
    };

    const navigation = () => {

        return navigate('/')
    }

    const handleToggleSideNav = () => {
        setIsSideNavCollapsed(!isSideNavCollapsed);
    };

    if (department == "ADMIN" || department == "OWNER") {
        return (
            <body>
            <>
                <div className={`admin-dashboard-container ${isSideNavCollapsed ? "collapsed" : ""}`}>

                <nav className="nav-container">

                        <div>
                            <img src={Logo} alt="Logo" />
                            <button onClick={handleLogout} className="logout-button">Logout</button>
                        </div>

                        <div className="profile">
                            <p>{email}</p>

                        </div>
                    </nav>

                    <div className={`side-nav-bar raised ${isSideNavCollapsed ? "collapsed" : ""}`}>
                        <button onClick={handleToggleSideNav} className="toggle-sidenav-button"
                                style={{
                                    backgroundColor: isSideNavCollapsed ? 'green' : 'blue',
                                    // Add other styles as needed
                                }}
                        >
                            {isSideNavCollapsed ? <BsToggleOn /> : <BsToggleOff />}
                            {/*{isSideNavCollapsed ? <AiOutlineFileAdd /> : }*/}
                        </button>
                        {/*User Management*/}
                        <div className="users-management-dropdown">
                            {/* Add dropdown */}
                            <button className="Ticket-Assignment-button" onClick={handleDropdownManageUsers}>
                                {isSideNavCollapsed ? <FaUsers  /> : 'Manage Users'}

                            </button>
                            {UserManagement && (
                                <div className="Ticket-Assignment-content">
                                    <button
                                        className="Ticket-Assignment-dropdown-button"
                                        onClick={() => handleDropdownItemClick("RegisterUser")}
                                    >
                                        {isSideNavCollapsed ? <FaUser/> : 'Register'}
                                    </button>
                                    <button
                                        className="Ticket-Assignment-dropdown-button"
                                        onClick={() => handleDropdownItemClick("ElevateUser")}
                                    >
                                        {isSideNavCollapsed ? <FaArrowUp /> : 'Elevate User'}
                                    </button>
                                    <button
                                        className="Ticket-Assignment-dropdown-button"
                                        onClick={() => handleDropdownItemClick("ALLUsers")}
                                    >
                                        {isSideNavCollapsed ? <FaUserFriends /> : 'All Users'}
                                    </button>

                                    <button
                                        className="Ticket-Assignment-dropdown-button"
                                        onClick={() => handleDropdownItemClick("DowngradeUser")}
                                    >
                                        {isSideNavCollapsed ? <FaArrowDown /> : 'Limit users role'}

                                    </button>
                                </div>
                            )}
                        </div>


                        {/*Ticket Assignment*/}
                        <div className="Ticket-Assignment-dropdown">
                            {/* Add dropdown */}
                            <button className="Ticket-Assignment-button" onClick={handleDropdownTicketAssignment}>
                                {isSideNavCollapsed ? <FaTasks /> : 'Ticket Assignment'}

                            </button>
                            {TicketAssignment && (
                                <div className="Ticket-Assignment-content">
                                    <button
                                        className="Ticket-Assignment-dropdown-button"
                                        onClick={() => handleDropdownItemClick("AllTickets")}
                                    >
                                        {isSideNavCollapsed ? <FaListAlt /> : 'AllTickets'}
                                    </button>
                                </div>
                            )}
                        </div>


                        {/*Department Management*/}
                        <div className="Department-Management-dropdown">
                            {/* Add dropdown */}
                            <button className="Department-Management-button" onClick={handleDropDownDepartmentManagement}>
                                {isSideNavCollapsed ? <FaSitemap /> : 'Department Management'}
                            </button>
                            {DepartmentManagement && (
                                <div className="Department-Management-content">
                                    <button
                                        className="Department-Management-dropdown-button"
                                        onClick={() => handleDropdownItemClick("CreateDepartment")}
                                    >
                                        {isSideNavCollapsed ? <FaPlusSquare/> : 'Department Management'}
                                    </button>
                                    <button
                                        className="Department-Management-dropdown-button"
                                        onClick={() => handleDropdownItemClick("AddUsersToDepartment")}
                                    >
                                        {isSideNavCollapsed ? <AiOutlineFileAdd /> : 'Department Management'}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                {renderAssociatedFiles()}
                <AnalogClock />
            </>
            </body>
        );
    }else if (department == "DEPARTMENT_ADMIN"){
        const [UserRefer, setUserRefer] = useState(false);
        const handleDropdownManageReferUsers = () => {
            setUserRefer(true);
            setSelectedMenuItem("Accept-Referral");
        };
        const handleCloseModal = () => {
            setUserRefer(false);
            setSelectedMenuItem("");
        };

        const renderAssociatedFiles = () => {
            switch (selectedMenuItem) {
                case "Accept-Referral":
                    return (
                        <div className="modal">
                            <div className="modal-content">
                                <button className="close-button" onClick={handleCloseModal}>
                                    X
                                </button>
                                <AcceptRefer />
                            </div>
                        </div>
                    );
                default:
                    return null;
            }
        };
        return (
            <body>

            <>

                <div className={`admin-dashboard-container ${UserRefer ? "inactive" : ""}`}>

                    <nav className="nav-container">
                        <div>
                            <img src={Logo} alt="Logo" />
                            <button onClick={handleLogout} className="logout-button">Logout</button>
                        </div>

                        <div className="profile">
                            <p>{email}</p>
                            {/*<img src={profileImage} alt="Profile" />*/}
                        </div>
                    </nav>

                    <div className={`side-nav-bar raised ${isSideNavCollapsed ? "collapsed" : ""}`}>
                        <button
                            onClick={handleToggleSideNav}
                            className="toggle-sidenav-button"
                            style={{
                                backgroundColor: isSideNavCollapsed ? "green" : "blue",
                            }}
                        >
                            {isSideNavCollapsed ? <BsToggleOn /> : <BsToggleOff />}
                        </button>
                        <div className="users-management-dropdown">
                            <button className="Ticket-Assignment-button" onClick={handleDropdownManageReferUsers}>
                                {isSideNavCollapsed ? <FaUsers /> : "Referrals"}
                            </button>
                        </div>
                    </div>
                    {/*logo*/}


                    <div>
                        <DepartmentTicket />
                    </div>
                </div>
                {renderAssociatedFiles()}
            </>
            </body>
        );
    }else{
        navigation();
    }

};

export default AdminDashboard;