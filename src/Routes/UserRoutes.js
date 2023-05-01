//import Libraries
import React from 'react'
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import firebase from "firebase";

//import components and screens
import UserProfile from "../screens/UserProfile";
import Login from  '../screens/Login';
import ProfilePage from "../screens/ProfilePage";
import Settings from "../screens/UserProfileComp/Settings"


const UserRoutes = (props) => {
    const { path } = useRouteMatch();
    var user = firebase.auth().currentUser
    return (
        <div>
            <Switch>
                <Route path={`${path}/dashboard`} component={user?ProfilePage:Login} />
                <Route path={`${path}/settings`} component={user?Settings:Login} />
            </Switch>  
        </div>
    )
}

export default UserRoutes
