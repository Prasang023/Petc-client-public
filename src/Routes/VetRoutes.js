//import Libraries
import React from 'react'
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import firebase from "firebase";

//import components and screens
import VetDetail from "../screens/vet/VetDetail";
import VetSelect from "../screens/vet/VetSelect";
import VetScreen from "../screens/vet/VetScreen";

import VetUserMain from "../services/vet/Appointment/vetusers/VetUserMain";
import Reciever from "../ui/VetService/Reciever"
import Login from  '../screens/Login';

// Chat feature
import Chats from '../services/vet/Chat/Components/Chat';

const VetRoutes = (props) => {
    const { path } = useRouteMatch();
    var user = firebase.auth().currentUser
    // console.log(props)
    return (
        <div>
            <Switch>
                <Route path={`${path}/vetDetail`} component={VetDetail} />
                <Route path={`${path}/vetselect`} component={VetSelect} />
                <Route path={`${path}/reciever`} component={Reciever} />
                <Route path={`${path}/vetuser`} component={VetUserMain} />
                <Route path={`${path}/followup/vetuser`} component={user ? VetUserMain : Login} />
                <Route path={`${path}/veterinary/:id`} component={VetScreen} />
                <Route path={`${path}/chats`} component={Chats} />
            </Switch>
        </div>
    )
}

export default VetRoutes
