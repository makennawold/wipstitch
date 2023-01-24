import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { useCookies } from "react-cookie";

import { UserContext } from "./components/context/UserContext";

import Index from "./components/pages/Index";
import ErrorPage from "./components/pages/Error";
import Auth from "./components/pages/Auth";
import Lists from "./components/pages/Lists";
import List from "./components/pages/List";
import Experiment from "./components/pages/Experiment";
import Wips from "./components/pages/Wips";
import Navbar from "./components/Navbar";
import Menu from "./components/Menu";

function App() {
  const [user, setUser] = useState("");
  const [auth, setAuth] = useState(false);
  const [menu, setMenu] = useState(false);
  const [emptyLists, setEmptyLists] = useState(false);
  //user does not have empty lists by default

  const [cookies, setCookie, removeCookie] = useCookies(["auth", "username"]);

  const [mode, setMode] = useState("lists");
  const [editMode, setEditMode] = useState("viewList");
  const [listsData, setListsData] = useState([]);
  const [wipsData, setWipsData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(0);
  const [selectedWip, setSelectedWip] = useState(0);

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

  const getListsData = async (username) => {
    await fetch(`http://localhost:5000/lists/${username}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "cors",
      },
    }).then((response) => {
      response.json().then((responseData) => {
        setListsData(responseData);
        console.log(responseData, "this is responseData");
      });
    });
    console.log("getListsData fired");
  };

  const getWipsData = async (username) => {
    await fetch(`http://localhost:5000/wips/${username}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "cors",
      },
    }).then((response) => {
      response.json().then((responseData) => {
        setWipsData(responseData);
        console.log(responseData, "this is responseData");
      });
    });
    console.log("getWipsData fired");
  };

  const logout = () => {
    removeCookie("auth");
    removeCookie("user");
    setAuth(false);
    setUser("");
  };

  const changeSelectedItem = (item) => {
    setSelectedItem(item.id);
  };

  const checkListsData = () => {
    //conditional for updating use effect
    //if user is logged in && listsData is empty && emptylists is false, check if DB lists is empty
    //if it is, change emptylists to true
    //if it's not, getlistsdata and leave emptylists false
    // if (auth == true && listsData == [] && emptyLists == false) {
    if (auth == true && listsData.length == 0 && emptyLists == false) {
      console.log(
        "user is logged in, listsData is empty, and the lists are not checked for empty"
      );
      var grabbedLists;
      const grabLists = async (username) => {
        await fetch(`http://localhost:5000/lists/${username}`, {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            "Access-Control-Allow-Origin": "cors",
          },
        }).then((response) => {
          response.json().then((responseData) => {
            console.log(responseData, "this is response on grabLists");
            grabbedLists = responseData;
            //trigger another function to do other piece
            if (grabbedLists.length == 0) {
              setEmptyLists(true);
            } else {
              setListsData(responseData);
            }
          });
        });
      };
      grabLists(user);
    }

    console.log("checkLists fired");
  };

  useEffect(() => {
    if (cookies.auth && cookies.username) {
      setAuth(true);
      setUser(cookies.username);
    } else {
      setAuth(false);
    }
    console.log(listsData);
    checkListsData();

    // if (listsData.length == 0) {
    //   getListsData(user);
    //   console.log("conditional true");
    //   // console.log(listsData, "this is new listsData");
    // }
  });

  return (
    <Router>
      <Switch>
        <div className="App">
          <UserContext.Provider
            value={{
              user,
              setUser,
              login,
              logout,
              listsData,
              setListsData,
              selectedItem,
              setSelectedItem,
              mode,
              setMode,
              changeSelectedItem,
              editMode,
              setEditMode,
              getListsData,
              getWipsData,
              wipsData,
              selectedWip,
              setSelectedWip,
            }}
          >
            {auth ? (
              <div className="app-wrapper">
                <Menu menu={menu} setMenu={setMenu} />
                <div className="navbar-container">
                  <Navbar menu={menu} setMenu={setMenu} />
                </div>
                <div className="page-container">
                  {console.log(listsData, "this is listsData on app")}
                  <Route path="/" exact component={Index}></Route>
                  <Route path="/lists" component={Lists}></Route>
                  <Route path="/list" exact component={List}></Route>
                  <Route path="/experiment" component={Experiment}></Route>
                  <Route path="/wips" component={Wips}></Route>
                  <Route path="/404" component={ErrorPage}></Route>
                  <Redirect to="/" />
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
