import React, {useEffect, useState} from "react";
import { useLocation } from "react-router-dom";
import './assets/stylesheet/adminDashboard.css'
import UploadLogo from "./generalSettings/UploadLogo.tsx";
import logo from './assets/images/logo.jpeg'
import GetAllUsers from './useManagement/GetAllUsers';
import ElevateUserByAuthority from './useManagement/ElevateUserByAuthority';
import AddUsersToDepartment from './useManagement/AddUsersToDepartment';
import GetUsersByUsername from './useManagement/GetUserByUsername';
import GetUsersByAuthority from './useManagement/GetUsersByAuthority';
import {ClipLoader} from "react-spinners";

const AdminDashboard: React.FC = () => {

    const location = useLocation();
    const email = location.state?.email || "";

    const [UserManagement, setUserManagement] = useState(false);
    const [UserAnalysis, setUserAnalysis] = useState(false);
    const [TicketAssignment, setTicketAssignment] = useState(false);
    const [DepartmentCreation, setTDepartmentCreation] = useState(false);
    const [DepartmentManagement, setDepartmentManagement] = useState(false);
    const [DepartmentAnalysis, setTDepartmentAnalysis] = useState(false);
    const [DepartmentReport, setDepartmentReport] = useState(false);
    const [UserReporting, setUserReporting] = useState(false);
    const [DepartmentReportUser, setDepartmentReportUser] = useState(false);
    const [EmployeeAnalysis, setEmployeeAnalysis] = useState(false);
    const [GeneralSettings, setGeneralSettings] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [logoDataUrl, setLogoDataUrl] = useState('');

    useEffect(() => {
        // Retrieve the logo data URL from local storage
        const storedLogoDataUrl = localStorage.getItem('../assets/images/logo.png');
        setLogoDataUrl(storedLogoDataUrl);
    }, []);


    // const navigate = useNavigate()
    const handleDropdownToggle = () => {
        setUserManagement(!UserManagement)
    };

    const handleDropdownUserAnalysis = () => {
        setUserAnalysis(!UserAnalysis)
    };

    const handleDropdownTicketAssignment = () => {
        setTicketAssignment(!TicketAssignment)
    }

    const handleDropdownDepartmentCreation = () => {
        setTDepartmentCreation(!DepartmentCreation)
    }

    const handleDropDownDepartmentManagement = () => {
        setDepartmentManagement(!DepartmentManagement)
    }

    const handleDropDownDepartmentAnalyst = () => {
        setTDepartmentAnalysis(!DepartmentAnalysis)
    }

    const handleDropDownDepartmentReport = () => {
        setDepartmentReport(!DepartmentReport)
    }

    const handleDropDownUserReporting = () => {
        setUserReporting(!UserReporting)
    }

    const handleDropDownDepartmentReportUser = () => {
        setDepartmentReportUser(!DepartmentReportUser)
    }

    const handleDropDownEmployeeAnalysis = () => {
        setEmployeeAnalysis(!EmployeeAnalysis)
    }

    const handleDropDownGeneralSettings = () => {
        setGeneralSettings(!GeneralSettings)
    }



    const [showGetAllUsers, setShowGetAllUsers] = useState(false);
    const [showElevateUserAuthority, setShowElevateUserAuthority] = useState(false);
    const [showAddUsersToDepartment, setShowAddUsersToDepartment] = useState(false);
    const [showGetUsersByUsername, setShowGetUsersByUsername] = useState(false);
    const [showGetUsersByAuthority, setShowGetUsersByAuthority] = useState(false);
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

    const handleButtonClickGetUsersByUsername = () => {
        setIsLoading(true);
        setShowGetUsersByUsername(true);
    };

    const handleButtonClickGetUsersByAuthority = () => {
        setIsLoading(true);
        setShowGetUsersByAuthority(true);
    };

    // general settings
    const handleButtonClick = () => {
        setIsLoading(true);
        setShowModal(true);
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
                                        className="dropdown-button"
                                        onClick={() => handleButtonClickGetUsersByUsername}
                                    >
                                        {isLoading ? (
                                            <ClipLoader color="#ffffff" loading={isLoading} size={20}/>
                                        ): (
                                            'Get users by username'
                                        )}

                                    </button>

                                    <button
                                        className="dropdown-button"
                                        onClick={() => handleButtonClickGetUsersByAuthority}
                                    >
                                        {isLoading ? (
                                            <ClipLoader color="#ffffff" loading={isLoading} size={20}/>
                                        ): (
                                            'Get users by authority'
                                        )}

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

                            {showGetUsersByUsername && (
                                <div className="modal">
                                    <div className="modal-content">
                                        <button className="close-button" onClick={() => {
                                            setShowGetUsersByUsername(false)
                                            setIsLoading(false);
                                        }}>
                                            X
                                        </button>
                                        <GetUsersByUsername />
                                    </div>
                                </div>
                            )}

                            {showGetUsersByAuthority && (
                                <div className="modal">
                                    <div className="modal-content">
                                        <button className="close-button" onClick={() => {
                                            setShowGetUsersByAuthority(false)
                                            setIsLoading(false)
                                        }}>
                                            X
                                        </button>
                                        <GetUsersByAuthority />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/*User-Analysis*/}

                        <div className="User-Analysis-dropdown">
                            {/* Add dropdown */}
                            <button className="User-Analysis-button" onClick={handleDropdownUserAnalysis}>
                                User Analysis
                            </button>
                            {UserAnalysis && (
                                <div className="User-Analysis-content">
                                    <button
                                        className="User-Analysis-dropdown-button"
                                        // onClick={() => handleDropdownItemClick("Component 1")}
                                    >
                                        Elevate user authority
                                    </button>
                                    <button
                                        className="User-Analysis-dropdown-button"
                                        // onClick={() => handleDropdownItemClick("Component 2")}
                                    >
                                        Add users to department
                                    </button>
                                    <button
                                        className="User-Analysis-dropdown-button"
                                        // onClick={() => handleDropdownItemClick("Component 3")}
                                    >
                                        Get all users
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

                        {/*    Department Creation*/}

                        <div className="Department-Creation-dropdown">
                            {/* Add dropdown */}
                            <button className="Department-Creation-button" onClick={handleDropdownDepartmentCreation}>
                                Department Creation
                            </button>
                            {DepartmentCreation && (
                                <div className="Department-Creation-content">
                                    <button
                                        className="Department-Creation-dropdown-button"
                                        // onClick={() => handleDropdownItemClick("Component 1")}
                                    >
                                        Create department
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

                        {/*Department Analysis*/}
                        <div className="Department-Analysis-dropdown">
                            {/* Add dropdown */}
                            <button className="Department-Analysis-button" onClick={handleDropDownDepartmentAnalyst}>
                                Department Analysis
                            </button>
                            {DepartmentAnalysis && (
                                <div className="Department-Analysis-content">

                                    <button
                                        className="Department-Analysis-dropdown-button"
                                        // onClick={() => handleDropdownItemClick("Component 3")}
                                    >
                                        Most performed employee(department)
                                    </button>

                                    <button
                                        className="Department-Analysis-dropdown-button"
                                        // onClick={() => handleDropdownItemClick("Component 3")}
                                    >
                                        Best performed employee(department)
                                    </button>

                                    <button
                                        className="Department-Analysis-dropdown-button"
                                        // onClick={() => handleDropdownItemClick("Component 3")}
                                    >
                                        Most performed department
                                    </button>

                                    <button
                                        className="Department-Analysis-dropdown-button"
                                        // onClick={() => handleDropdownItemClick("Component 3")}
                                    >
                                        Best performed department
                                    </button>

                                </div>
                            )}
                        </div>

                        {/*Department Reporting*/}
                        <div className="Department-Analysis-dropdown">
                            {/* Add dropdown */}
                            <button className="Department-Report-button" onClick={handleDropDownDepartmentReport}>
                                Department Report
                            </button>
                            {DepartmentReport && (
                                <div className="Department-Report-content">

                                    <button
                                        className="Department-Report-dropdown-button"
                                        // onClick={() => handleDropdownItemClick("Component 3")}
                                    >
                                        Most performed employee(department)
                                    </button>

                                    <button
                                        className="Department-Report-dropdown-button"
                                        // onClick={() => handleDropdownItemClick("Component 3")}
                                    >
                                        Best performed employee(department)
                                    </button>

                                    <button
                                        className="Department-Report-dropdown-button"
                                        // onClick={() => handleDropdownItemClick("Component 3")}
                                    >
                                        Most performed department
                                    </button>

                                    <button
                                        className="Department-Report-dropdown-button"
                                        // onClick={() => handleDropdownItemClick("Component 3")}
                                    >
                                        Best performed department
                                    </button>

                                </div>
                            )}
                        </div>


                        {/*User Reporting*/}
                        <div className="User-Reporting-dropdown">
                            {/* Add dropdown */}
                            <button className="User-Reporting-button" onClick={handleDropDownUserReporting}>
                                User Reporting
                            </button>
                            {UserReporting && (
                                <div className="User-Reporting-content">

                                    <button
                                        className="User-Reporting-dropdown-button"
                                        // onClick={() => handleDropdownItemClick("Component 3")}
                                    >
                                        users by username
                                    </button>

                                    <button
                                        className="User-Reporting-dropdown-button"
                                        // onClick={() => handleDropdownItemClick("Component 3")}
                                    >
                                        Users by Authority
                                    </button>

                                    <button
                                        className="User-Reporting-dropdown-button"
                                        // onClick={() => handleDropdownItemClick("Component 3")}
                                    >
                                        Most performed employee
                                    </button>

                                    <button
                                        className="User-Reporting-dropdown-button"
                                        // onClick={() => handleDropdownItemClick("Component 3")}
                                    >
                                        Most performed employee(department)
                                    </button>

                                    <button
                                        className="User-Reporting-dropdown-button"
                                        // onClick={() => handleDropdownItemClick("Component 3")}
                                    >
                                        Most performed employee(department)
                                    </button>

                                    <button
                                        className="User-Reporting-dropdown-button"
                                        // onClick={() => handleDropdownItemClick("Component 3")}
                                    >
                                        Best performed employee(department)
                                    </button>


                                </div>
                            )}
                        </div>


                        {/*Department Report (user)*/}
                        <div className="User-Reporting-dropdown">
                            {/* Add dropdown */}
                            <button className="User-Reporting-button" onClick={handleDropDownDepartmentReportUser}>
                                Department Report
                            </button>
                            {DepartmentReportUser && (
                                <div className="User-Reporting-content">

                                    <button
                                        className="User-Reporting-dropdown-button"
                                        // onClick={() => handleDropdownItemClick("Component 3")}
                                    >
                                        users by username
                                    </button>
                                </div>
                            )}
                        </div>

                        {/*Employee Analysis*/}
                        <div className="Department-Analysis-dropdown">
                            {/* Add dropdown */}
                            <button className="Department-Report-button" onClick={handleDropDownEmployeeAnalysis}>
                                Employee Analysis
                            </button>
                            {EmployeeAnalysis && (
                                <div className="Department-Report-content">

                                    <button
                                        className="Department-Report-dropdown-button"
                                        // onClick={() => handleDropdownItemClick("Component 3")}
                                    >
                                        Get all employees
                                    </button>

                                    <button
                                        className="Department-Report-dropdown-button"
                                        // onClick={() => handleDropdownItemClick("Component 3")}
                                    >
                                        Most performed employee(department)
                                    </button>

                                    <button
                                        className="Department-Report-dropdown-button"
                                        // onClick={() => handleDropdownItemClick("Component 3")}
                                    >
                                        Best performed employee(department)
                                    </button>



                                </div>
                            )}
                        </div>

                        {/*Employee Analysis*/}
                        <div className="Department-Analysis-dropdown">
                            {/* Add dropdown */}
                            <button className="Department-Report-button" onClick={handleDropDownGeneralSettings}>
                                General Settings
                            </button>
                            {GeneralSettings && (
                                <div className="Department-Report-content">

                                    {showModal && (
                                        <div className="modal">
                                            <div className="modal-content">
                                                <button className="close-button" onClick={() => setShowModal(false)}>
                                                    X
                                                </button>
                                                <UploadLogo />
                                                {/* Add the content of the UploadLogo component here */}
                                            </div>
                                        </div>
                                    )}

                                    <button onClick={handleButtonClick}>Change Logo and Favicon</button>

                                    <button
                                        className="Department-Report-dropdown-button"
                                        // onClick={() => GeneralSettingsUploadlogo}
                                    >
                                        change Footer
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