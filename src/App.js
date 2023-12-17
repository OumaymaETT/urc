import './App.css';
import { useState } from 'react';
import { Login } from './user/Login';
import { Test } from './user/Test';
import SignUpForm from './user/SignUpForm';
import UsersAndRoomsList from './user/UsersAndRoomsList';
import { BrowserRouter as Router, Routes, Link, Route } from 'react-router-dom';

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null); // Initialisez loggedInUser avec useState

  return (
    <Router>
      <div className="navigation-links">
        <ul>
          <li>
            <Link to="/">Connexion/Déconnexion</Link>
          </li>
          
          <li>
            <Link to="/signup">Inscription</Link>
          </li>
          <li>
            <Link to="/users-and-rooms">Chat</Link>
          </li>
          
        </ul>

        <hr />
        <Routes>
          <Route exact path="/" element={<Login setLoggedInUser={setLoggedInUser} />} />
          
          <Route path="/signup" element={<SignUpForm />} />
          <Route
            exact
            path="/users-and-rooms"
            element={<UsersAndRoomsList loggedInUser={loggedInUser} />}
          />
          <Route path="/messages/user/:userId" element={<UsersAndRoomsList loggedInUser={loggedInUser} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
