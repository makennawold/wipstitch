import React, { useContext, useState, useEffect } from "react";
import { FaTimes, FaEdit } from "react-icons/fa";

import FormItem from "./FormItem";

export default function ListEditorForm({
  data,
  selectedItem,
  editorMode,
  setEditorMode,
  updateList,
}) {
  const [listName, setListName] = useState("");
  const [items, setItems] = useState([]);
  const [publicStatus, setPublicStatus] = useState(true);

  const updateItems = (e, id) => {
    const updatedItems = items;
    updatedItems[id] = e;
    setItems(updatedItems);
    console.log(items);
  };

  const formItems = () => {
    // const itemList = items.split(", ");
    return items.map((item) => {
      return (
        <div className="list-item-wrapper" key={items.indexOf(item)}>
          {editorMode === "edit" ? (
            <FormItem
              itemValue={item}
              updateItems={updateItems}
              id={items.indexOf(item)}
            />
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

  const cancelUpdate = () => {
    setEditorMode("view");
  };

  const handleSubmit = () => {
    const newItems = items.join(", ");
    const id = data[selectedItem - 1].id;
    updateList(listName, newItems, publicStatus, id);
  };

  useEffect(() => {
    const selectedListData = data[selectedItem - 1];
    setListName(selectedListData.list_name);
    setItems(selectedListData.items.split(", "));
    setPublicStatus(selectedListData.public);
    cancelUpdate();
  }, [selectedItem]);

  return (
    <div className="list-editor">
      get data and mode from parent lists component get selected item get the
      data from selected item specifically
      {editorMode === "edit" ? (
        <div className="list-name-wrapper">
          <input
            className="list-name"
            value={listName}
            onChange={(e) => setListName(e.target.value)}
          />
          <div onClick={() => cancelUpdate()}>cancel</div>
        </div>
      ) : (
        <div className="list-name-wrapper">
          <div className="list-name">{listName}</div>
          <FaEdit onClick={() => setEditorMode("edit")} />
        </div>
      )}
      <div>{items}</div>
      {formItems()}
      {editorMode === "edit" ? (
        <button onClick={() => handleSubmit()}>update api</button>
      ) : null}
    </div>
  );
}
