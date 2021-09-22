import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import NavBar from './components/IT19143828/navBar/navBar.js';
import Home from './components/IT19143828/home/home.js';
import View from './components/IT19143828/bookM/view';
import AddBook from './components/IT19143828/addBook/addBook';
import Reports from "./components/report-component/reports";


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
            <Route path="/reports" component={Reports} />
          </Switch>
        </section>
        {/* <Footer/>
        </userContext.Provider> */}
      </Router>
    </div>
  );
}

export default App;
