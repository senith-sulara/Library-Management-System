import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import NavBar from './components/senith/navBar/navBar.js';
import Home from './components/senith/home/home.js';
import View from './components/senith/bookM/view';
import AddBook from './components/senith/addBook/addBook';

import Reports from "./components/report-component/reports";
import AddStaff from './components/pasidu/staff/addStaff';
import ViewStaff from './components/pasidu/staff/viewStaff';
import SignIn from './components/pasidu/staff/login';
import Profile from './components/pasidu/staff/userProfile';
import Footer from './components/pasidu/comman/footer';
import AddReservation from "./components/nirasha/reservation-component/addReservation";
import ViewReservations from "./components/nirasha/reservation-component/viewResrvations";
import AddMember from "./components/kaveena/addMember";
import MemberTable from "./components/kaveena/viewMember";
import AddBarrow from "./components/pasidu/barrow/addBarrow";
import Barrow from "./components/pasidu/barrow/barrowHome";
import ViewBarrow from "./components/pasidu/barrow/viewBarrows";


function App() {
  return (
    <div>
    <Router>
      {/* <userContext.Provider value={{userData, setUserData}}> */}
        <NavBar/>
        <section>
          <Switch>
            <Route path="/" component={Home}  exact/>
            <Route path="/book" component={View}  />
            <Route path="/insertBook" component={AddBook}  />

            <Route path="/reports" component={Reports} />

            <Route path="/staff" component={ViewStaff}  />
            <Route path="/addStaff" component={AddStaff}  />
            <Route path="/signin" component={SignIn}  />
            <Route path="/profile" component={Profile}  />
            <Route path="/addReservation" component={AddReservation} />
            <Route path="/viewReservation" component={ViewReservations} />
            <Route path="/addMember" component={AddMember} />
            <Route path="/viewMember" component={MemberTable} />

            <Route path="/addBarrow" component={AddBarrow} />
            <Route path="/barrow" component={Barrow} />
            <Route path="/viewbarrow" component={ViewBarrow} />
          </Switch>
        </section>
        <Footer/>
        {/* </userContext.Provider> */}
      </Router>
           

    </div>
  );
}


export default App;
