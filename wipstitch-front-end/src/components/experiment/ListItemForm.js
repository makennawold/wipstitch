import { useState, useEffect, useContext } from "react";

import { UserContext } from "../context/UserContext";
import { ListContext } from "../context/ListContext";

export default function ListItemForm({ item, key }) {
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
    <div className="list-item-wrapper" key={key}>
      {item}
    </div>
  );
}
