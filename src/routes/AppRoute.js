import React, { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Redirect
} from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { PrivateRoutes } from "./PrivateRoutes";
import { PublicRoutes } from "./PublicRoutes";
import 'antd/dist/antd.css';
import { DashBoardRoutes } from "./DashboardRoute";
import { authContext } from "../provider/AuthContext";
import { Spin } from "antd";
export const AppRoute = () => {
    const {verificar, auth} = useContext(authContext); 
    useEffect(() => {
        verificar();
    }, []);

    if(auth.checking){
       return  <div className="center"><Spin size={40}/></div>
    }else{

  
        return (
            <Router>
    
                <div>
                    <Switch>
                        <PublicRoutes isAuthenticated={!!auth.login}  path="/login" Component={DashBoardRoutes}  />
                        <PrivateRoutes isAuthenticated={!!auth.login} exact path="/" Component={HomePage} />

                        <Redirect to="/" />
                    </Switch>
                </div>
    
            </Router>
        )
        }
    
    
}
