import React, { useState } from "react";
import "./ResetPassword.css";
import EmailVerification from "../EmailVerification/EmailVerification";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// TODO

const ResetPassword = () => {
    const [password, setPassword] = useState("");
    const {token} = useParams()
    const navigate = useNavigate();

    axios.defaults.withCredentials = true;
    const handleSubmit = () => {
        if (password) {
            event.preventDefault();
            axios
                .post("https://wellnesstracker-backend.onrender.com/"+ "reset-password/"+token, {
                    password,
                })
                .then((res) => {
                    if (res.data.status) {
                        console.log("Password updated");
                        navigate("/login");
                    }
                    console.log(res.data)
                })
                .catch((err) => console.log(err));
        } else {
            alert("Please enter an email.");
        }
    };

    return (
        <div className="wrapper">
            <div>
                <h1>Enter your new password.</h1>

                {/* email input textbox */}
                <div className="input-box">
                    <input
                        type="password"
                        placeholder="Password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <FaUserAlt className="icon" />
                </div>

                {/* login button */}
                <button className="btn-login" onClick={handleSubmit}>
                    Submit
                </button>


            </div>
        </div>
    );
};

export default ResetPassword;
