import { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { UserContext } from "./context/UserContext";

import Index from "./pages/Index";
import Auth from "./pages/Auth";

function App() {
  // const [user, setUser] = useState({ username: "", auth: false });
  const [user, setUser] = useState("");
  const [auth, setAuth] = useState(false);

  const login = (username, password) => {
    setUser(user);
    setAuth(true);
  };

  return (
    <Router>
      <div className="App">
        <UserContext.Provider value={{ user, setUser, login }}>
          {auth ? (
            <div>
              <Route path="/" exact component={Index}></Route>
            </div>
          ) : (
            <div>
              <Auth />
            </div>
          )}
        </UserContext.Provider>
      </div>
    </Router>
  );
}

export default App;
