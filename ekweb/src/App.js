import React from 'react';
import './App.css';
import Home from './components/Home/Home';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Aboutus from './components/Aboutus/Aboutus';
import CompanyProfile from './components/Company/CompanyProfile';
import FAQs from './components/FAQs/FAQs';
import Contactus from './components/Contactus/Contactus';
import Signup from './components/Account/Signup';
import SignIn from './components/Account/SignIn';
import EventList from './components/Events/EventList';
import UserProfile from './components/Account/UserProfile';
function App(){

  return (
    <BrowserRouter>
    <div>
       <Switch>
       <Route path="/" exact component={Home}/>
       <Route path="/Aboutus"  component={Aboutus}/>
       <Route path="/UserProfile"  component={UserProfile}/>
       <Route path="/FAQs" component={FAQs}/>
       <Route path="/Contactus" component={Contactus}/>
       <Route path="/Signup" component={Signup}/>
       <Route path="/SignIn" component={SignIn}/>
       <Route path="/EventList"  component={EventList}/>
       <Route path="/CompanyProfile"  component={CompanyProfile}/>
       </Switch>
    </div>
    </BrowserRouter>
  );
}


export default App;
