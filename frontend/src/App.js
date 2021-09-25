import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Reports from "./components/report-component/reports";
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
