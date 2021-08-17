import React from "react";
import { BrowserRouter as  Router, Route } from "react-router-dom";

import AddMember from "./components/kaveena/addMember";
import MemberTable from "./components/kaveena/viewMember";
function App() {
  return (
    <div>
      <Router>

    <Route path="/addMember" component={AddMember} />
    <Route path="/viewMember" component={MemberTable} />
      </Router>
    </div>
  );
}


export default App;
