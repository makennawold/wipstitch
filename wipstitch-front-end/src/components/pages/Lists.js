import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";

import List from "./List";

export default function Lists() {
  const {
    user,
    listsData,
    setListsData,
    selectedItem,
    setSelectedItem,
    mode,
    setMode,
  } = useContext(UserContext);

  //viewList, editList, newList
  //lists component contains buttons for each list and a direct new list button
  //clicking list button takes you to List component at mode viewList
  //pass down data to List component
  //use grid auto rows/columns to auto sort into grids based on how much space is available
  //have contingency for when there aren't any lists "you have no lists please make some etc"

  return (
    <div className="lists-wrapper">
      <div>welcome to lists</div>
      <Link to="/list" className="link">
        go to list
      </Link>
      {/* <List /> */}
    </div>
  );
}
