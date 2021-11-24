import { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { UserContext } from "./context/UserContext";

import Index from "./pages/Index";
import Auth from "./pages/Auth";

function App() {
  // const [user, setUser] = useState({ username: "", auth: false });
  const [user, setUser] = useState("");
  const [auth, setAuth] = useState(false);

  const login = (user) => {
    setUser(user);
  };

  return (
    <Router>
      <div className="App">
        <UserContext.Provider value={{ user, setUser, login }}>
          <div>navbar component placeholder</div>

          <div>{user}</div>
          <Route path="/" exact component={Index}></Route>
          <Route path="/auth" component={Auth}></Route>
        </UserContext.Provider>
      </div>
    </Router>
  );
  // const { user } = React.useContext(UserContext);

  // return user.auth ? <AuthApp /> : <UnauthApp />;
}

// {user.auth ? (
//   <Route path="/" exact component={Home}></Route>
// ) : (
//   <div>auth component</div>
// )}

export default App;
