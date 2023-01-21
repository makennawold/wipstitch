import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";

import { FaPlus } from "react-icons/fa";

export default function Lists() {
  const {
    listsData,
    selectedItem,
    mode,
    changeSelectedItem,
    setEditMode,
  } = useContext(UserContext);

  //viewList, editList, newList
  //lists component contains buttons for each list and a direct new list button
  //clicking list button takes you to List component at mode viewList
  //pass down data to List component
  //use grid auto rows/columns to auto sort into grids based on how much space is available
  //have contingency for when there aren't any lists "you have no lists please make some etc"

  const createLists = () => {
    return listsData.map((item) => {
      // console.log("mapping", item);
      return (
        <Link
          to="/list"
          key={item.id}
          className={`list ${item.id === selectedItem ? "selected" : ""}`}
          onClick={() => changeSelectedItem(item)}
        >
          {mode === "lists" ? item.list_name : item.wip_name}
        </Link>
      );
    });
  };

  return (
    <div className="lists-wrapper">
      <div className="title-card">
        <div className="page-title">my lists</div>
        <Link
          to="/list"
          className="new-list-button"
          onClick={() => setEditMode("newList")}
        >
          <FaPlus /> new list
        </Link>
      </div>

      <div className="lists-grid">{createLists()}</div>

      {/* <List /> */}
    </div>
  );
}
