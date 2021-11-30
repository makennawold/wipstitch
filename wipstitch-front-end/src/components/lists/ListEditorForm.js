import React, {
  useContext,
  useState,
  useEffect,
  useLayoutEffect,
  useReducer,
} from "react";
import { FaTimes, FaEdit } from "react-icons/fa";

import formReducer from "../../reducers/formReducer";

import FormItems from "./FormItems";
import FormItem from "./FormItem";

export default function ListEditorForm({
  data,
  selectedItem,
  editorMode,
  setEditorMode,
  updateList,
}) {
  const initialFormState = {
    listName: "",
    items: [],
    public: true,
  };

  const [formState, dispatch] = useReducer(formReducer, initialFormState);

  const handleFormChange = (e) => {
    dispatch({
      type: "HANDLE UPDATE",
      field: e.target.name,
      payload: e.target.value,
    });
  };

  const handleInitial = (name, value) => {
    dispatch({
      type: "HANDLE UPDATE",
      field: name,
      payload: value,
    });
  };

  const updateItems = (e, id) => {
    const updatedItems = formState.items;
    updatedItems[id] = e;
    // setItems(updatedItems);
    //use reducer to change items
    dispatch({
      type: "HANDLE CHANGE",
      field: "items",
      payload: updatedItems,
    });
    console.log(formState.items);
  };

  const cancelUpdate = () => {
    setEditorMode("view");
  };

  const deleteItem = (item) => {
    const updatedItems = formState.items;
    const index = updatedItems.indexOf(item);
    updatedItems.splice(index, 1);
    // setItems(updatedItems);
    //use reducer to change items
    dispatch({
      type: "HANDLE CHANGE",
      field: "items",
      payload: updatedItems,
    });
  };

  const handleSubmit = () => {
    const newItems = formState.items.join(", ");
    const id = data[selectedItem - 1].id;
    updateList(formState.listName, newItems, formState.public, id);
  };

  useEffect(() => {
    const selectedListData = data[selectedItem - 1];
    handleInitial("listName", selectedListData.list_name);
    handleInitial("items", selectedListData.items.split(", "));
    handleInitial("public", selectedListData.public);

    // setSelectedListData(data[selectedItem - 1]);
    // setListName(selectedListData.list_name);
    // setItems(selectedListData.items.split(", "));//
    // setPublicStatus(selectedListData.public);

    cancelUpdate();
  }, [selectedItem]);

  const formItems = () => {
    // const itemList = items.split(", ");
    return formState.items.map((item) => {
      return (
        <div className="list-item-wrapper" key={formState.items.indexOf(item)}>
          {editorMode === "edit" ? (
            <FormItem
              itemValue={item}
              updateItems={updateItems}
              id={formState.items.indexOf(item)}
              deleteItem={deleteItem}
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

  return (
    <div className="list-editor">
      get data and mode from parent lists component get selected item get the
      data from selected item specifically
      {editorMode === "edit" ? (
        <div className="list-name-wrapper">
          <input
            className="list-name"
            value={formState.listName}
            // onChange={(e) => setListName(e.target.value)}
            onChange={(e) => handleFormChange(e)}
          />
          <div onClick={() => cancelUpdate()}>cancel</div>
        </div>
      ) : (
        <div className="list-name-wrapper">
          <div className="list-name">{formState.listName}</div>
          <FaEdit onClick={() => setEditorMode("edit")} />
        </div>
      )}
      {/* <div>{items}</div> */}
      {/* {formItems()} */}
      {console.log("hello")}
      <FormItems
        items={formState.items}
        deleteItem={deleteItem}
        updateItems={updateItems}
        editorMode={editorMode}
      />
      {editorMode === "edit" ? (
        <button onClick={() => handleSubmit()}>update api</button>
      ) : null}
    </div>
  );
}
