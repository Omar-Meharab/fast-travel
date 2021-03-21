import './Login.css';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';

const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };
    const [newUser, setNewUser] = useState(true);
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: ''
    });


    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }
    const { register, handleSubmit } = useForm();
    const onSubmit = (user) => {
        if (newUser && user.email && user.password) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    const name = user.name;
                    const { email } = res.user;
                    const newUserInfo = { email, name };
                    setLoggedInUser(newUserInfo);
                    history.replace(from);
                    setUser(newUserInfo);
                    updateUserName(name);
                })
                .catch(error => {
                    const newUserInfo = {}
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);
                });
        }

        if (!newUser && user.email && user.password) {
            console.log(newUser);
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    const newUserInfo = {...user};
                    setUser(newUserInfo);
                    setLoggedInUser(newUserInfo);
                    history.replace(from);
                })
                .catch(error => {
                    const newUserInfo = {}
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);
                });
        }
    }


    const handleGoogleSignIn = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then(res => {
                const { displayName, email } = res.user;
                const newUserInfo = { name: displayName, email };
                setLoggedInUser(newUserInfo);
                history.replace(from);
                setUser(newUserInfo);
            }).catch((error) => {
                const newUserInfo = {}
                newUserInfo.error = error.message;
                newUserInfo.success = false;
                setUser(newUserInfo)
            });
    }

    const updateUserName = name => {
        const user = firebase.auth().currentUser;
    
        user.updateProfile({
            displayName: name,
        }).then(function () {
    
        }).catch(function (error) {
    
        });
    }

    return (
        <div className="login-div">
            <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
                {newUser && <input placeholder="Name" name="name" ref={register({ required: true, maxLength: 20 })} />}
                <br />
                <input placeholder="Email" name="email" type="email" ref={register({ required: true, min: 18, max: 99 })} />
                <br />
                <input placeholder="Password" type="password" name="password" ref={register({ required: true, min: 18, max: 99 })} />
                <br />
                {newUser && <input placeholder="Confirm Password" type="password" name="confirmPassword" ref={register({ required: true, min: 18, max: 99 })} />}
                <br />
                <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />
                <label htmlFor="newUser">New User Sign UP</label>
                <br />
                <input className="btn btn-primary" type="submit" value={newUser ? 'Sign Up' : 'Sign In'} />
                <p>or</p>
                <button className="btn btn-primary" onClick={handleGoogleSignIn}><FontAwesomeIcon icon={faGoogle} /> Sign In</button>
                <p>{user.email}</p>
            </form>
        </div>
    );
};

export default Login;