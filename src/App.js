import './App.css';
import React from "react";
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

function App() {
  const backgroundImage = {
    backgroundImage: `url("https://i.ibb.co/z6zHHqR/background-image.jpg")`,
    height: '1000px',
    backgroundPosition: 'center',
    backgroundSize: 'cover'
  };
  return (
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
          </ul>
        </nav>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/destination">
            <Destination />
          </Route>
          <Route path="/contact">
            <Contact />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route exact path="/destination/:name">
            <Destination />
          </Route>
          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
