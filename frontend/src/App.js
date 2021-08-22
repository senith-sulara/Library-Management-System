import React from "react";
import { BrowserRouter as  Router, Route } from "react-router-dom";

import AddMember from "./components/kaveena/addMember";
import MemberTable from "./components/kaveena/viewMember";
import AddBook from "./components/senith/senith";
import NavBar from './components/kaveena/navBar/navBar.js';
function App() {
  return (
    <div>
      <Router>
      <NavBar/>
    <Route path="/addMember" component={AddMember} />
    <Route path="/viewMember" component={MemberTable} />
    <Route path="/addBook" component={AddBook} />
      </Router>
    </div>
  );
}


export default App;
