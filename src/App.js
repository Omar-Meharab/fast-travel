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

function App() {
  const backgroundImage = {
    backgroundImage: `url("https://i.ibb.co/z6zHHqR/background-image.jpg")`,
    height: '1000px',
    backgroundPosition: 'center',
    backgroundSize: 'cover'
  };
  return (
    <Router>
    <div 
    style={backgroundImage} className="nav-line">
      <nav>
        <ul>
          <li>
            <Link to="/"><button className="btn btn-primary">Home</button></Link>
          </li>
          <li>
            <Link to="/about"><button className="btn btn-primary">Destination</button></Link>
          </li>
          <li>
            <Link to="/users"><button className="btn btn-primary">Contact</button></Link>
          </li>
          <li>
            <button className="btn btn-primary"to="/login">Log In</button>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route exact path="/">
          <Home />
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
