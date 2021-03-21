import './App.css';
import React, { createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from "./components/Home/Home";
import NoMatch from './components/NoMatch/NoMatch';
import Contact from './components/Contact/Contact';
import Destination from './components/Destination/Destination';
import Login from './components/Login/Login';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export const UserContext = createContext();

function App() {
  const backgroundImage = {
    backgroundImage: `url("https://i.ibb.co/z6zHHqR/background-image.jpg")`,
    height: '1000px',
    backgroundPosition: 'center',
    backgroundSize: 'cover'
  };

  const [loggedInUser, setLoggedInUser] = useState({});

  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <div style={backgroundImage} className="nav-line">
          <nav>
            <h1 className="text">Fast Travel</h1>
            <ul>
              <li>
                <Link to="/"><button className="btn btn-primary">Home</button></Link>
              </li>
              <li>
                <Link to="/destination"><button className="btn btn-primary">Destination</button></Link>
              </li>
              <li>
                <Link to="/contact"><button className="btn btn-primary">Contact</button></Link>
              </li>
              <li>
                <Link to="/login"><button className="btn btn-primary" to="/login">Log In</button></Link>
              </li>
              <li>
                <button className="btn btn-primary user-name" to="/login">{loggedInUser.name}</button>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            {/* <PrivateRoute path="/destination">
              <Destination />
            </PrivateRoute> */}
            <Route path="/contact">
              <Contact />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <PrivateRoute exact path="/destination/:name">
              <Destination />
            </PrivateRoute>
            <Route path="*">
              <NoMatch />
            </Route>
          </Switch>
        </div>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
