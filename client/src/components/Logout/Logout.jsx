// Logout.js
import React from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./Logout.css";

const Logout = () => {
    const [, , removeCookie] = useCookies(["session-token"]);
    const navigate = useNavigate();

    const handleLogout = () => {
        // Remove the session-token cookie
        removeCookie("session-token");
        removeCookie("temp-session-token");
        // Perform any additional logout tasks
        alert("You have been logged out.")
        navigate("/"); // Redirect to this page after logout
    };

    return (
        <li className="nav-item logout" onClick={handleLogout}>
            Logout
        </li>
    );
};

export default Logout;
