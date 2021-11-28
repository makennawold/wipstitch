import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { FaUserAlt } from "react-icons/fa";

import ReactiveCarousel from "../Carousel";

export function Index() {
  const { user, login } = useContext(UserContext);

  return (
    <div className="home">
      <div className="user-container">
        <FaUserAlt />
        <div className="username">{user}</div>
      </div>
      <div>
        <p>this is index</p>
      </div>
      <div>list carousel component</div>
      <ReactiveCarousel mode="lists" />
      <div>wips carousel component</div>
      {/* note: each of these components should be getting lists, which has individual list items, and all of it is styled in the actual carousel component, list editor =, or wip editor */}
    </div>
  );
}

export default Index;

// {user.auth ? (
//   <Route path="/" exact component={Home}></Route>
// ) : (
//   <div>auth component</div>
// )}
