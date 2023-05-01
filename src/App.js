import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';
import fire from './firebase/auth/fire';
import {useState , useEffect}  from 'react'
import Reciever from "./ui/VetService/Reciever"
import firebase from "firebase"
import Helmet from "react-helmet";

// components import 
import Loader from "./ui/core/Loader"


// screens import
import Login from './screens/Login';
import Home from './screens/Home';
import OurServices from "./screens/OurServices";
import AddDetails from './screens/AddDetails'
import Aboutus from './screens/Aboutus'
import Contactus from './screens/Contactus'
import PrivacyPolicy from './screens/footerLinks/PrivacyPolicy'
import PaymentsRefunds from './screens/footerLinks/PaymentsRefunds'
import TermsConditions from './screens/footerLinks/TermsConditions'
import PaymentConfirmation from './screens/PaymentConfirmation'
import Bloglist from './screens/blogs/Bloglist'
import EmailVerification from "./screens/EmailVerification";

import VetUserMain from "./services/vet/Appointment/vetusers/VetUserMain";
import UserProfile from "./screens/UserProfile";

//Routes imports --------------------------------
import VetRoutes from "./Routes/VetRoutes";
import UserRoutes from "./Routes/UserRoutes";

import Test from './test/test'

import {AuthProvider} from './services/vet/Chat/contexts/AuthContexts'

function App() {
  console.log(process.env.REACT_APP_UNSPLASH_KEY)

  return (
    <div className="App">
            <AuthProvider>
            <Switch>
              <Route exact path='/reciever' component={Reciever}/>
              <Route exact path="/login" component={Login}  />
              <Route exact path="/signup" component={Login}  />
              <Route exact path="/test" component={Test} />
              <Route exact path="/addDetails" component={AddDetails} />
              <Route exact path="/aboutus" component={Aboutus} />
              <Route exact path="/contactus" component={Contactus} />
              <Route exact path="/privacypolicy" component={PrivacyPolicy} />
              <Route exact path="/paymentsrefunds" component={PaymentsRefunds} />
              <Route exact path="/termsconditions" component={TermsConditions} />
              <Route path="/paymentConfirmation/:paymentId" component={PaymentConfirmation} />
              <Route path="/vetService" component={VetRoutes} />
              <Route path="/user" component={UserRoutes} />
              <Route path="/aboutus" component={Home} />
              <Route path="/ourservices" component={OurServices} />
              <Route path="/blogs" component={Bloglist} />
              <Route path="/loader" component={Loader} />
              <Route path="/emailverify" component={EmailVerification} />
              <Route path="/" component={Home} />
              
            </Switch>
            </AuthProvider>
            
          

       
    </div>
  );
}

export default App;