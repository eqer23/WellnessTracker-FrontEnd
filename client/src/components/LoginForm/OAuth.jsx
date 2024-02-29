import React, { useState } from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { useDispatch } from "react-redux";
import { initializeApp } from "firebase/app";
import { useNavigate } from "react-router-dom";
import axios from "axios";
let URL = import.meta.env.VITE_SERVER_URL;

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "instafit-8ad3a.firebaseapp.com",
  projectId: "instafit-8ad3a",
  storageBucket: "instafit-8ad3a.appspot.com",
  messagingSenderId: "961039527584",
  appId: "1:961039527584:web:7a7fd3411101433ea263c5",
  measurementId: "G-8SB8MBQ4DW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const OAuth = ({ role }) => {
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      provider.addScope("https://www.googleapis.com/auth/userinfo.email");
      provider.addScope("https://www.googleapis.com/auth/userinfo.profile");
      provider.addScope("profile");

      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);

      let [firstName, lastName] = result.user.displayName.split(" ");
      if (lastName === undefined) {
        lastName = null;
      }

      axios.defaults.withCredentials = true;
      if (result.user.email) {
        event.preventDefault();
        axios
          .post(
            URL + "oauth",
            {
              firstName: firstName,
              lastName: lastName,
              email: result.user.email,
              role: role,
            },
            {
              withCredentials: true, // Include cookies in the request
            }
          )
          .then((res) => {
            if (res.status === 200) {
              console.log(res);
              navigate("/");
            }
          })
          .catch((err) => {
            alert(err.response.data.message);
          });
      } else {
        alert("Critical Error: Could not sign in with Google.");
        return;
      }
    } catch (err) {
      console.log("Could not sign in with Google", err);
      alert(err.response.data.message);
    }
  };

  return (
    <button className="btn-login" onClick={handleGoogleClick} type="button">
      Continue with Google
    </button>
  );
};

export { OAuth };
