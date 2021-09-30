import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import NavBar from "./components/IT19143828/navBar/navBar.js";
import Home from "./components/IT19143828/home/home.js";
import View from "./components/IT19143828/bookM/view";
import AddBook from "./components/IT19143828/addBook/addBook";
import Reports from "./components/report-component/reports";
import AddStaff from "./components/IT19099132/staff/addStaff";
import ViewStaff from "./components/IT19099132/staff/viewStaff";
import SignIn from "./components/IT19099132/staff/login";
import Profile from "./components/IT19099132/staff/userProfile";
import Footer from "./components/IT19099132/common/footer";
import AddReservation from "./components/IT19204062/reservation-component/addReservation";
import ViewReservations from "./components/IT19204062/reservation-component/viewReservations";
import AddReturnBook from "./components/IT19204062/return-book-component/addReturnBook";
import ViewReturnBooks from "./components/IT19204062/return-book-component/viewReturnBook";
import AddMember from "./components/IT19220048/addMember";
import MemberTable from "./components/IT19220048/viewMember";
import AddBarrow from "./components/IT19099132/barrow/addBarrow";
import Barrow from "./components/IT19099132/barrow/barrowHome";
import ViewBarrow from "./components/IT19099132/barrow/viewBarrows";

function App() {
  return (
    <div>
      <Router>
        <NavBar />
        <section>
          {localStorage.getItem("token") ? (
            <Switch>
              <Route path="/home" component={Home} exact />
              <Route path="/book" component={View} />
              <Route path="/insertBook" component={AddBook} />
              <Route path="/reports" component={Reports} />
              <Route path="/staff" component={ViewStaff} />
              <Route path="/addStaff" component={AddStaff} />
              <Route path="/profile" component={Profile} />
              <Route path="/addReservation" component={AddReservation} />
              <Route path="/viewReservation" component={ViewReservations} />
              <Route path="/addReturnBook" component={AddReturnBook} />
              <Route path="/viewReturnBooks" component={ViewReturnBooks} />
              <Route path="/addMember" component={AddMember} />
              <Route path="/viewMember" component={MemberTable} />
              <Route path="/addBarrow" component={AddBarrow} />
              <Route path="/barrow" component={Barrow} />
              <Route path="/viewbarrow" component={ViewBarrow} />
              <Route path="/" component={SignIn} />
            </Switch>
          ) : (
            <Switch>
              <Route path="/" component={SignIn} />
            </Switch>
          )}
        </section>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
