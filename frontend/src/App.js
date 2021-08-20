import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import NavBar from './components/senith/navBar/navBar.js';
import Home from './components/senith/home/home.js';
import View from './components/senith/bookM/view';
import AddBook from './components/senith/addBook/addBook';
import AddStaff from './components/pasidu/staff/addStaff';
import ViewStaff from './components/pasidu/staff/viewStaff';
import SignIn from './components/pasidu/staff/login';
import Profile from './components/pasidu/staff/userProfile';



function App() {
  return (
    <div>
    <Router>
      {/* <userContext.Provider value={{userData, setUserData}}> */}
        <NavBar/>
        <section>
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/book" component={View}  />
            <Route path="/insertBook" component={AddBook}  />
            <Route path="/staff" component={ViewStaff}  />
            <Route path="/addStaff" component={AddStaff}  />
            <Route path="/signin" component={SignIn}  />
            <Route path="/profile" component={Profile}  />
          </Switch>
        </section>
        {/* <Footer/>
        </userContext.Provider> */}
      </Router>
    </div>
  );
}

export default App;
