import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

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
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input name="firstName" ref={register({ required: true, maxLength: 20 })} />
                <br />
                <input name="lastName" ref={register({ pattern: /^[A-Za-z]+$/i })} />
                <br />
                <input name="age" type="number" ref={register({ min: 18, max: 99 })} />
                <br />
                <input type="submit" />
                <p>or</p>
                <button className="btn btn-primary" onClick={handleGoogleSignIn}>Google Sign In</button>
                <p>{user.email}</p>
            </form>
        </div>
    );
};

export default Login;