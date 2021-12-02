import { useState, useEffect, useContext } from "react";

import { UserContext } from "../context/UserContext";
import { ListContext } from "../context/ListContext";

export default function ListEditorForm() {
  const { user, login } = useContext(UserContext);
  const {
    selectedList,
    listName,
    setListName,
    listItems,
    setListItems,
    publicStatus,
    setPublicStatus,
  } = useContext(ListContext);

  const createFormListItems = () => {
    const itemsList = listItems.split(", ");
    return itemsList.map((item) => {
      return (
        <div className="list-item-wrapper" key={itemsList.indexOf(item)}>
          {item}
        </div>
      );
    });
  };
  return (
    <div>
      Hello from edit form
      <div className="form">
        <input
          className="list-name"
          value={listName}
          onChange={(e) => setListName(e.target.value)}
        />
        {createFormListItems()}
      </div>
    </div>
  );
}
