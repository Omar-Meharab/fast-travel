import './Login.css';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

const Login = () => {
    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }
    const { register, handleSubmit } = useForm();
    const onSubmit = data => console.log(data);
    const [user, setUser] = useState({});
    const provider = new firebase.auth.GoogleAuthProvider();
    const handleGoogleSignIn = () => {
        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                var credential = result.credential;
                var token = credential.accessToken;
                var user = result.user;
                console.log(user, token);
                setUser(user);
            }).catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                var credential = error.credential;
                console.log(errorMessage, errorCode, credential, email);
            });
    }

    return (
        <div className = "login-div">
            <form className="login-form"  onSubmit={handleSubmit(onSubmit)}>
                <input placeholder="Name" name="firstName" ref={register({ required: true, maxLength: 20 })} />
                <br />
                <input placeholder="Email" name="email" type="email" ref={register({ min: 18, max: 99 })} />
                <br />
                <input placeholder="Password" type="password" name="password" ref={register({ min: 18, max: 99 })} />
                <br/>
                <input placeholder="Confirm Password" type="password" name="confirmPassword" ref={register({ min: 18, max: 99 })} />
                <br />
                <input className="btn btn-primary" type="submit" />
                <p>or</p>
                <button className="btn btn-primary" onClick={handleGoogleSignIn}><FontAwesomeIcon icon={faGoogle} /> Sign In</button>
                <p>{user.email}</p>
            </form>
        </div>
    );
};

export default Login;