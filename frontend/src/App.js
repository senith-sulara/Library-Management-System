import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import NavBar from './components/senith/navBar/navBar.js';
import Home from './components/senith/home/home.js';
import ViewBooks from './components/senith/bookM/viewBooks';
import View from './components/senith/bookM/view';
import AddBook from './components/senith/addBook/addBook';



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
          </Switch>
        </section>
        {/* <Footer/>
        </userContext.Provider> */}
      </Router>
    </div>
  );
}

export default App;
