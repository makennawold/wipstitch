import React, {
  useContext,
  useState,
  useEffect,
  useLayoutEffect,
  useReducer,
} from "react";
import { FaCheck, FaEdit } from "react-icons/fa";

export default function ListEditorForm({
  data,
  selectedItem,
  editorMode,
  setEditorMode,
  updateList,
}) {
  const [listName, setListName] = useState("");
  const [items, setItems] = useState("");
  const [publicStatus, setPublicStatus] = useState(true);

  const cancelUpdate = () => {
    setEditorMode("view");
  };

  const handleSubmit = () => {
    const id = data[selectedItem - 1].id;
    updateList(listName, items, publicStatus, id);
  };

  const displayFormItems = () => {
    const itemsList = items.split(", ");
    return itemsList.map((item) => {
      return (
        <div className="list-item-wrapper" key={itemsList.indexOf(item)}>
          {item}
        </div>
      );
    });
  };

  useEffect(() => {
    const selectedListData = data[selectedItem - 1];
    setListName(selectedListData.list_name);
    setItems(selectedListData.items);
    setPublicStatus(selectedListData.public);
    cancelUpdate();
  }, [selectedItem]);

  return (
    <div className="list-editor">
      get data and mode from parent lists component get selected item get the
      data from selected item specifically
      {editorMode === "edit" ? (
        <div className="list-form-wrapper">
          <div className="list-name-wrapper">
            <input
              className="list-name"
              value={listName}
              onChange={(e) => setListName(e.target.value)}
            />
            <div onClick={() => cancelUpdate()}>cancel</div>
          </div>

          <input
            className="list-items"
            value={items}
            onChange={(e) => setItems(e.target.value)}
          />

          <div className="checkbox">
            {publicStatus ? "public" : "private"}
            <div
              className={`check ${publicStatus ? "public" : "private"}`}
              onClick={() => {
                setPublicStatus(!publicStatus);
              }}
            >
              {publicStatus ? "" : <FaCheck />}
            </div>
          </div>
          <button onClick={() => handleSubmit()}>update api</button>
        </div>
      ) : (
        <div className="list-form-wrapper">
          <div className="list-name-wrapper">
            <div className="list-name">{listName}</div>
            <FaEdit onClick={() => setEditorMode("edit")} />
          </div>
          {displayFormItems()}
        </div>
      )}
    </div>
  );
}
