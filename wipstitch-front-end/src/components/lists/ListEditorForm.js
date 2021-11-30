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
  //   const [listName, setListName] = useState("");
  // //   const [items, setItems] = useState([]);
  //   const items = [];
  //   const [publicStatus, setPublicStatus] = useState(true);

  //     function itemReducer(state, action) {
  //         switch (action.type) {
  //             case 'update':
  //             return
  //         }
  //     }
  const initialFormState = {
    listName: "",
    items: [],
    public: true,
  };

  //   const [selectedListData, setSelectedListData] = useState(
  //     data[selectedItem - 1]
  //   );
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
  };

  const handleSubmit = () => {
    const newItems = formState.items.join(", ");
    const id = data[selectedItem - 1].id;
    updateList(formState.listName, newItems, formState.publicStatus, id);
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
      {/* <FormItems
        items={items}
        deleteItem={deleteItem}
        updateItems={updateItems}
        editorMode={editorMode}
      /> */}
      {editorMode === "edit" ? (
        <button onClick={() => handleSubmit()}>update api</button>
      ) : null}
    </div>
  );
}
