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
  return (
    <div>
      Hello from edit form
      <div className="form">
        <input className="list-name" value={listName} />
        {selectedList}
      </div>
    </div>
  );
}
