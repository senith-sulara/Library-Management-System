<<<<<<< Updated upstream
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Reports from "./components/report-component/reports";
<<<<<<< Updated upstream
import AddMember from "./components/IT19220048/addMember";
import MemberTable from "./components/IT19220048/viewMember";
=======
import AddStaff from './components/pasidu/staff/addStaff';
import ViewStaff from './components/pasidu/staff/viewStaff';
import SignIn from './components/pasidu/staff/login';
import Profile from './components/pasidu/staff/userProfile';
import Footer from './components/pasidu/comman/footer';
=======
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Reports from "./components/report-component/reports";
import NavBar from "./components/senith/navBar/navBar.js";
import Home from "./components/senith/home/home.js";
import View from "./components/senith/bookM/view";
import AddBook from "./components/senith/addBook/addBook";
import AddStaff from "./components/pasidu/staff/addStaff";
import ViewStaff from "./components/pasidu/staff/viewStaff";
import SignIn from "./components/pasidu/staff/login";
import Profile from "./components/pasidu/staff/userProfile";
// import Footer from './components/pasidu/comman/footer';
>>>>>>> Stashed changes
import AddReservation from "./components/nirasha/reservation-component/addReservation";
import ViewReservations from "./components/nirasha/reservation-component/viewResrvations";
import AddMember from "./components/IT19220048/addMember";
import MemberTable from "./components/IT19220048/viewMember";
import AddBarrow from "./components/pasidu/barrow/addBarrow";
import Barrow from "./components/pasidu/barrow/barrowHome";


>>>>>>> Stashed changes
function App() {
  return (
    <div>
      <Router>
<<<<<<< Updated upstream
        <NavBar />
        <section>
          <Switch>
            <Route path="/addMember" component={AddMember} />
            <Route path="/viewMember" component={MemberTable} />
=======
        {/* <userContext.Provider value={{userData, setUserData}}> */}
        <NavBar />
        <section>
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/book" component={View} />
            <Route path="/insertBook" component={AddBook} />
            <Route path="/staff" component={ViewStaff} />
            <Route path="/addStaff" component={AddStaff} />
            <Route path="/signin" component={SignIn} />
            <Route path="/profile" component={Profile} />
            <Route path="/addReservation" component={AddReservation} />
            <Route path="/viewReservation" component={ViewReservations} />
            <Route path="/addMember" component={AddMember} />
            <Route path="/viewMember" component={MemberTable} />
            <Route path="/addBarrow" component={AddBarrow} />
            <Route path="/barrow" component={Barrow} />
>>>>>>> Stashed changes
            <Route path="/reports" component={Reports} />
          </Switch>
        </section>
        {/* <Footer/> */}
        {/* </userContext.Provider> */}
      </Router>
    </div>
  );
}
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
export default App;
