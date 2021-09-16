import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import AddMember from "./components/kaveena/addMember";
import MemberTable from "./components/kaveena/viewMember";
function App() {
  return (
    <div>
      <Router>
        <NavBar />
        <section>
          <Switch>
            <Route path="/addMember" component={AddMember} />
            <Route path="/viewMember" component={MemberTable} />
          </Switch>
        </section>
        {/* <Footer/> */}
        {/* </userContext.Provider> */}
      </Router>
    </div>
  );
}

export default App;
