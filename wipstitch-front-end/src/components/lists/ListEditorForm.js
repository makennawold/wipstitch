import React, { useContext, useState, useEffect } from "react";
import { FaTimes, FaEdit } from "react-icons/fa";

export default function ListEditorForm({ data, selectedItem, editorMode }) {
  const selectedListData = data[selectedItem];

  const [listName, setListName] = useState(selectedListData.list_name);
  const [items, setItems] = useState(selectedListData.items.split(", "));
  const [publicStatus, setPublicStatus] = useState(selectedListData.public);

  const updateItems = (e) => {
    const updatedItems = items;
    updatedItems[e.key] = e;
    setItems(updatedItems);
  };

  const formItems = () => {
    // const itemList = items.split(", ");
    return items.map((item) => {
      return (
        <div className="list-item-wrapper" key={items.indexOf(item)}>
          {editorMode === "edit" ? (
            <div className="list-item">
              <FaTimes />
              <input value={item} onChange={(e) => updateItems(e)} />
            </div>
          ) : (
            <div className="list-item">
              <span className="circle" />
              <div>{item}</div>
            </div>
          )}
        </div>
      );
    });
  };

  //   useEffect

  return (
    <div className="list-editor">
      get data and mode from parent lists component get selected item get the
      data from selected item specifically
      {editorMode === "edit" ? (
        <div className="list-name-wrapper">
          <input className="list-name" value={listName} />
          <FaTimes />
        </div>
      ) : (
        <div className="list-name-wrapper">
          <div className="list-name">{listName}</div>
          <FaEdit />
        </div>
      )}
      <div>{items}</div>
      {formItems()}
    </div>
  );
}
