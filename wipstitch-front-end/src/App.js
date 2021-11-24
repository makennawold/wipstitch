import { useState, useMemo } from "react";
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

  // const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  // const login = (user) => {
  //   setUser((user) => ({
  //     username: user,
  //     auth: true,
  //   }));
  // };

  // const logout = () => {
  //   setUser(() => ({
  //     username: "",
  //     auth: false,
  //   }));
  // };
  return (
    <Router>
      <div className="App">
        <UserContext.Provider value={{ user, setUser, login }}>
          <div>navbar component placeholder</div>
          <Route path="/" exact component={Index}></Route>
          <Route path="/auth" component={Auth}></Route>
        </UserContext.Provider>
      </div>
    </Router>
  );
  // const { user } = React.useContext(UserContext);

  // return user.auth ? <AuthApp /> : <UnauthApp />;
}

export default App;
