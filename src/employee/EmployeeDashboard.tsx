import React, { useEffect, useState } from "react";
import {useLocation, useNavigate} from "react-router-dom";
import AssignedTicket from "./AssignedTicket.tsx";
import Logo from "../assets/component/images/Logo.png"
import './AssignedTicket.css'


const EmployeeDashboard: React.FC = () => {
    const location = useLocation();
    const email = localStorage.getItem("login_emails");
    const [selectedMenuItem, setSelectedMenuItem] = useState("");

    const handleLogout = async () => {

        await fetch("http://localhost:8080/logout", {
            method: "GET",
            headers: {
                "Authorization": "Basic " + localStorage.getItem('email_password_credentials')
            },
        }).then(response => {
            if (response.ok) {
                const navigate = useNavigate();
                navigate("/");
                return;
            }else{
                alert("Logout failed.");
            }
        }).catch(error => alert("Logout failed: " + error)

        );

    };


    return (
        <body>

        <>
            <div className="admin-dashboard-container">
                <nav className="nav-container">
                    <div className={`employee-logo`}>
                        <img src={Logo} alt="Logo" />
                        <button onClick={handleLogout} className="logout-button">Logout</button>
                    </div>

                    <div className="profile-email">
                        <p>{email}</p>
                        {/*<img src={profileImage} alt="Profile" />*/}
                    </div>
                </nav>

                <div className="employee-dashboard-content"> <AssignedTicket /> </div>
            </div>

        </>
        </body>
    );
};

export default EmployeeDashboard;