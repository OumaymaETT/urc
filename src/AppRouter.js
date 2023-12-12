// AppRouter.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from './App';
import LoginForm from './LoginForm';

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={App} />
        <Route path="/login" component={LoginForm} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
