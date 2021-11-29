import React, { useContext, useState, useEffect } from "react";
import { FaCheck } from "react-icons/fa";

export default function ListEditorForm({ data, selectedItem }) {
  const selectedListData = data[selectedItem];

  const [listName, setListName] = useState(selectedListData.list_name);
  const [items, setItems] = useState(selectedListData.items);
  const [publicStatus, setPublicStatus] = useState(selectedListData.public);

  return (
    <div className="list-editor">
      get data and mode from parent lists component get selected item get the
      data from selected item specifically
      <div>{listName}</div>
      <div>{items}</div>
      <div>{publicStatus}</div>
    </div>
  );
}
