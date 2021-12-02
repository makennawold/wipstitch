import { useState, useEffect, useContext } from "react";

import { UserContext } from "../context/UserContext";
import { ListContext } from "../context/ListContext";

export default function ListItemForm({ item, key, handleChange, index }) {
  const {
    selectedList,
    listName,
    setListName,
    listItems,
    setListItems,
    publicStatus,
    setPublicStatus,
  } = useContext(ListContext);

  const [itemValue, setItemValue] = useState("");

  return (
    <div className="list-item-wrapper">
      <input value={item} onChange={(e) => handleChange(e, index)} />
    </div>
  );
}
