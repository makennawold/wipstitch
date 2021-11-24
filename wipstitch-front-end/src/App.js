import { useState, useContext } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <div className="App">
        <div>navbar placeholder</div>
        <Route path="/" exact component={Home}></Route>
      </div>
    </Router>
  );
  // const { user } = React.useContext(UserContext);

  // return user.auth ? <AuthApp /> : <UnauthApp />;
}

export default App;
