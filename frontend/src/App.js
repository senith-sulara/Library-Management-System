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
        <NavBar />
        <section>
          <Switch>
            <Route path="/addMember" component={AddMember} />
            <Route path="/viewMember" component={MemberTable} />
            <Route path="/reports" component={Reports} />
          </Switch>
        </section>
        {/* <Footer/> */}
        {/* </userContext.Provider> */}
      </Router>
    </div>
  );
}
export default App;
