import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";

export default function Lists() {
  const { listsData, selectedItem, mode, changeSelectedItem } = useContext(
    UserContext
  );

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
      <div>welcome to lists</div>
      <Link to="/list" className="link">
        go to list
      </Link>
      <div className="lists-grid">{createLists()}</div>

      {/* <List /> */}
    </div>
  );
}
