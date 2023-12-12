import './App.css';
import {Login} from "./user/Login";
import {Test} from "./user/Test";
import SignUpForm from './user/SignUpForm';


import * as React from 'react';
import { BrowserRouter as Router, Routes, Link, Route } from 'react-router-dom';

function App() {

  return (
      <Router>
      <div className="navigation-links">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/signup">Signup</Link>
          </li>
        </ul>

        <hr />
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/about" element={<Test  />} />
          <Route path="/signup" element={<SignUpForm/>} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
