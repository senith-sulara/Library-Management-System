import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import AddReservation from "./components/nirasha/reservation-component/addReservation";
import ViewReservations from "./components/nirasha/reservation-component/viewResrvations";

function App() {
  return (
    <div>
      <Router>
        <section>
          <Switch>
            <Route path="/addReservation" component={AddReservation} />
            <Route path="/viewReservation" component={ViewReservations} />
          </Switch>
        </section>
      </Router>
    </div>
  );
}

export default App;
