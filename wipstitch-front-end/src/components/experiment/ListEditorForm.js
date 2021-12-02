import { useState, useEffect, useContext } from "react";

import { UserContext } from "../context/UserContext";
import { ListContext } from "../context/ListContext";

import ListItemForm from "./ListItemForm";

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
      return <ListItemForm item={item} key={itemsList.indexOf(item)} />;
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
