import React, {useEffect, useState} from "react";
import { useLocation } from "react-router-dom";
import './assets/stylesheet/adminDashboard.css'
import logo from './assets/images/logo.jpeg'
import GetAllUsers from './useManagement/GetAllUsers';
import ElevateUserByAuthority from './useManagement/ElevateUserByAuthority';
import AddUsersToDepartment from './useManagement/AddUsersToDepartment';
import {ClipLoader} from "react-spinners";

const AdminDashboard: React.FC = () => {
    const location = useLocation();
    const email = location.state?.email || "";
    const [UserManagement, setUserManagement] = useState(false);
    const [TicketAssignment, setTicketAssignment] = useState(false);
    const [DepartmentManagement, setDepartmentManagement] = useState(false);
    // const navigate = useNavigate()
    const handleDropdownToggle = () => {
        setUserManagement(!UserManagement)
    };

    const handleDropdownTicketAssignment = () => {
        setTicketAssignment(!TicketAssignment)
    }

    const handleDropDownDepartmentManagement = () => {
        setDepartmentManagement(!DepartmentManagement)
    }
    const [showGetAllUsers, setShowGetAllUsers] = useState(false);
    const [showElevateUserAuthority, setShowElevateUserAuthority] = useState(false);
    const [showAddUsersToDepartment, setShowAddUsersToDepartment] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const handleButtonClickGetAllUsers = () => {
        setIsLoading(true);
        setShowGetAllUsers(true);
    };

    const handleButtonClickElevateUserAuthority = () => {
        setIsLoading(true);
        setShowElevateUserAuthority(true);
    };

    const handleButtonClickAddUsersToDepartment = () => {
        setIsLoading(true);
        setShowAddUsersToDepartment(true);
    };
    return (

        <body>
            <>
                <div className="admin-dashboard-container">
                    {/*logo*/}
                    <div>
                        <img src={logo} alt="Logo" className="logo" />
                    </div>
                    <div className="profile">
                        <p>Hello {email}</p>
                        {/*<img src={profileImage} alt="Profile" />*/}
                    </div>

                    <div className="side-nav-bar raised">

                        {/*User Management*/}
                        <div className="User-Management-dropdown">
                            {/* Add dropdown */}
                            <button className="User-Management-button" onClick={handleDropdownToggle}>
                                USER MANAGEMENT
                            </button>
                            {UserManagement && (
                                <div className="User-Management-content">
                                    <button
                                        className="dropdown-button"
                                        onClick={() => handleButtonClickElevateUserAuthority}
                                    >
                                        {isLoading ? (
                                            <ClipLoader color="#ffffff" loading={isLoading} size={20} />
                                        ) : (
                                            'Elevate user authority'
                                        )}
                                    </button>
                                    <button
                                        className="dropdown-button"
                                        onClick={handleButtonClickAddUsersToDepartment}
                                    >
                                        {isLoading ? (
                                            <ClipLoader color="#ffffff" loading={isLoading} size={20}/>
                                            ): (
                                                'Add users to department'
                                            )}
                                    </button>
                                    <button
                                        className="dropdown-button"
                                        onClick={() => handleButtonClickGetAllUsers}
                                    >{isLoading ? (
                                        <ClipLoader color="#ffffff" loading={isLoading} size={20}/>):
                                        ('Get all users')}
                                    </button>


                                    <button
                                        className="User-Analysis-dropdown-button"
                                        // onClick={() => handleDropdownItemClick("Component 2")}
                                    >
                                        Add users to department
                                    </button>

                                </div>
                            )}
                            {showGetAllUsers && (
                                <div className="modal">
                                    <div className="modal-content">
                                        <button
                                            className="close-button"
                                            onClick={() => {
                                                setShowGetAllUsers(false);
                                                setIsLoading(false); // Stop loading when close button is clicked
                                            }}
                                        >
                                            X
                                        </button>
                                        <GetAllUsers />
                                    </div>
                                </div>
                            )}

                            {showElevateUserAuthority && (
                                <div className="modal">
                                    <div className="modal-content">
                                        <button className="close-button" onClick={() => {
                                            setShowElevateUserAuthority(false);
                                            setIsLoading(false)
                                        }}>
                                            X
                                        </button>
                                        <ElevateUserByAuthority />
                                    </div>
                                </div>
                            )}

                            {showAddUsersToDepartment && (
                                <div className="modal">
                                    <div className="modal-content">
                                        <button className="close-button" onClick={() => {
                                            setShowAddUsersToDepartment(false)
                                            setIsLoading(false)
                                        }}>
                                            X
                                        </button>
                                        <AddUsersToDepartment />
                                    </div>
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
                                        // onClick={() => handleDropdownItemClick("Component 1")}
                                    >
                                        Refer a ticket
                                    </button>
                                    <button
                                        className="Ticket-Assignment-dropdown-button"
                                        // onClick={() => handleDropdownItemClick("Component 2")}
                                    >
                                        Get referral
                                    </button>
                                    <button
                                        className="Ticket-Assignment-dropdown-button"
                                        // onClick={() => handleDropdownItemClick("Component 3")}
                                    >
                                        Respond to referral
                                    </button>

                                    <button
                                        className="Ticket-Assignment-dropdown-button"
                                        // onClick={() => handleDropdownItemClick("Component 3")}
                                    >
                                        Submit a ticket by id
                                    </button>

                                    <button
                                        className="Ticket-Assignment-dropdown-button"
                                        // onClick={() => handleDropdownItemClick("Component 3")}
                                    >
                                        Send feedback to ticket
                                    </button>

                                    <button
                                        className="Ticket-Assignment-dropdown-button"
                                        // onClick={() => handleDropdownItemClick("Component 3")}
                                    >
                                        Get ticket
                                    </button>

                                    <button
                                        className="Ticket-Assignment-dropdown-button"
                                        // onClick={() => handleDropdownItemClick("Component 3")}
                                    >
                                        Get all tickets
                                    </button>

                                    <button
                                        className="Ticket-Assignment-dropdown-button"
                                        // onClick={() => handleDropdownItemClick("Component 3")}
                                    >
                                        Ticket by user and status
                                    </button>

                                    <button
                                        className="Ticket-Assignment-dropdown-button"
                                        // onClick={() => handleDropdownItemClick("Component 3")}
                                    >
                                        Ticket by status
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
                                        // onClick={() => handleDropdownItemClick("Component 1")}
                                    >
                                        Create department
                                    </button>
                                    <button
                                        className="Department-Management-dropdown-button"
                                        // onClick={() => handleDropdownItemClick("Component 2")}
                                    >
                                        Add users to department
                                    </button>
                                    <button
                                        className="Department-Management-dropdown-button"
                                        // onClick={() => handleDropdownItemClick("Component 3")}
                                    >
                                        Get all department by name
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>


            </>
        </body>

    );
};
export default AdminDashboard;