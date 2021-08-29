import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
  } from "react-router-dom";
import { LoginPage } from '../pages/auth/LoginPage';
import { RegisterPage } from '../pages/auth/RegisterPage';


export const DashBoardRoutes = () => {
    return (
        <Router >
            <div className="fondo-auth">
            <Switch>
                <Route exact path="/"  component={LoginPage}/>
                <Route path="/register"  component={RegisterPage}/>
                <Redirect to="/" />
               
            </Switch>
            </div>
        </Router>
    )
}