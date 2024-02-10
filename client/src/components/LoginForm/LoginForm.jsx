import React, { useState } from "react";
import "./LoginForm.css";
import EmailVerification from "../EmailVerification/EmailVerification";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
let LOGIN_URL = "http://localhost:3001/login";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("user");
    const navigate = useNavigate();

    axios.defaults.withCredentials = true;
    const handleSubmit = () => {
        if (email && password) {
            event.preventDefault();
            axios
                .post(LOGIN_URL, {
                    email,
                    password,
                    role,
                })
                .then((res) => {
                    if (res.data.login) {
                        console.log(res);
                        navigate("/dashboard");
                    }
                })
                .catch((err) => console.log(err));
        } else {
            alert("please enter your email, password, and role.");
        }
    };

    return (
        <div className="wrapper">
            <div>
                <h1>Login</h1>

                {/* email input textbox */}
                <div className="input-box">
                    <input
                        type="text"
                        placeholder="Email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    {/* <EmailVerification setEmail={setEmail} /> */}
                    <FaUserAlt className="icon" />
                </div>

                {/* password input textbox */}
                <div className="input-box">
                    <input
                        type="password"
                        placeholder="Password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <FaLock className="icon" />
                </div>

                <div className="form-group">
                    <label htmlFor="role">Role:</label>
                    <select
                        className="dropdown"
                        name="role"
                        id="role"
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <option value="user">Client</option>
                        <option value="professional">Professional</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>

                {/* forgot password check box and text */}
                <div className="remember-forgot">
                    <label>
                        <input type="checkbox" /> Remember me
                    </label>
                    {/* <a href="#"> Forgot Password?</a> */}
                    <Link to="/forgotpassword" className="button">
                        Forgot Password?
                    </Link>
                </div>

                {/* login button */}
                <button className="btn-login" onClick={handleSubmit}>
                    Login
                </button>

                {/* will link to a redister page */}
                <div className="register-link">
                    <p>
                        Don't have an account?
                        <Link to="/register" className="button">
                            Register
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
