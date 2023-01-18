import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useCookies } from "react-cookie";

import { UserContext } from "./components/context/UserContext";

import Index from "./components/pages/Index";
import Auth from "./components/pages/Auth";
import Lists from "./components/pages/Lists";
import Experiment from "./components/pages/Experiment";
import Wips from "./components/pages/Wips";
import Navbar from "./components/Navbar";
import Menu from "./components/Menu";

function App() {
  const [user, setUser] = useState("");
  const [auth, setAuth] = useState(false);
  const [menu, setMenu] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["auth", "username"]);

  const login = async (username, password) => {
    const data = { username, password };
    await fetch(`http://localhost:5000/login/${username}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "cors",
      },
      body: JSON.stringify(data),
    })
      .then((response) =>
        response.json().then((responseData) => {
          setCookie("auth", true, {
            path: "/",
            maxAge: 60 * 60 * 24,
          });

          // console.log(responseData.access_token);
        })
      )
      .catch((error) => {
        console.log("error is:", error);
      });
    setAuth(true);
    setUser(username);
    setCookie("username", username, {
      maxAge: 60 * 60 * 24,
    });
  };

  const logout = () => {
    removeCookie("auth");
    removeCookie("user");
    setAuth(false);
    setUser("");
  };

  useEffect(() => {
    if (cookies.auth && cookies.username) {
      setAuth(true);
      setUser(cookies.username);
    } else {
      setAuth(false);
    }
  });

  return (
    <Router>
      <Switch>
        <div className="App">
          <UserContext.Provider value={{ user, setUser, login, logout }}>
            {auth ? (
              <div className="app-wrapper">
                <Menu menu={menu} setMenu={setMenu} />
                <div className="navbar-container">
                  <Navbar menu={menu} setMenu={setMenu} />
                </div>
                <div className="page-container">
                  <Route path="/" exact component={Index}></Route>
                  <Route path="/lists" component={Lists}></Route>
                  <Route path="/experiment" component={Experiment}></Route>
                  <Route path="/wips" component={Wips}></Route>
                </div>
              </div>
            ) : (
              <div>
                <Auth />
              </div>
            )}
          </UserContext.Provider>
        </div>
      </Switch>
    </Router>
  );
}

export default App;
