import React, { useState } from "react";
import { FaUsers, FaUser } from "react-icons/fa";
import { BsToggleOff, BsToggleOn } from "react-icons/bs";
import AssignedTicket from "./AssignedTicket.tsx";
import AcceptRefer from "./AcceptRefer";
import Logo from "../assets/component/images/Logo.png";
import "./AssignedTicket.css";
import { useNavigate } from 'react-router-dom';

const EmployeeDashboard: React.FC = () => {
    const navigate = useNavigate()
    const [UserRefer, setUserRefer] = useState(false);
    const [isSideNavCollapsed, setIsSideNavCollapsed] = useState(true);
    const [selectedMenuItem, setSelectedMenuItem] = useState("");

    const handleLogout = async () => {
        const response = await fetch("http://localhost:8080/logout", {
            method: "GET",
            headers: {
                "Authorization": "Basic " + localStorage.getItem('email_password_credentials')
            },
        });
        if (response.status == 204) {
            navigate("/");
            return;
        }else{
            alert("Logout failed.");
        }
    };

    const handleDropdownManageReferUsers = () => {
        setUserRefer(true);
        setSelectedMenuItem("Accept-Referral");
    };

    const handleCloseModal = () => {
        setUserRefer(false);
        setSelectedMenuItem("");
    };

    const handleToggleSideNav = () => {
        setIsSideNavCollapsed(!isSideNavCollapsed);
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
                    <div className={`employee-logo`}>
                        <img src={Logo} alt="Logo" />
                        <button onClick={handleLogout} className="logout-button">
                            Logout
                        </button>
                    </div>
                    <div className="profile-email">
                        {/*<p>Email Placeholder</p>*/}
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
                        {/*{UserRefer && (*/}
                        {/*    <div className="Ticket-Assignment-content">*/}
                        {/*        <button*/}
                        {/*            className="Ticket-Assignment-dropdown-button"*/}
                        {/*            onClick={() => handleDropdownItemClick("Accept-Referral")}*/}
                        {/*        >*/}
                        {/*            {isSideNavCollapsed ? (UserRefer ? <FaUser /> : null) : "Accept Referral"}*/}
                        {/*        </button>*/}
                        {/*    </div>*/}
                        {/*)}*/}
                    </div>
                </div>

                <div className="employee-dashboard-content">
                    {" "}
                    <AssignedTicket />{" "}
                </div>
            </div>

            {renderAssociatedFiles()}
        </>
        </body>
    );
};

export default EmployeeDashboard;
