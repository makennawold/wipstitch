import { useState, useEffect, useContext } from "react";
import { FaPlusCircle, FaCheck, FaEdit, FaTimes } from "react-icons/fa";

import { UserContext } from "../context/UserContext";
import { ListContext } from "../context/ListContext";
import Lists from "../experiment/Lists";
import ListEditorForm from "../experiment/ListEditorForm";

export default function Experiment() {
  const { user, login } = useContext(UserContext);
  const [listData, setListData] = useState([]);
  const [selectedList, setSelectedList] = useState(null);
  const [editorMode, setEditorMode] = useState("view");
  const [listName, setListName] = useState("");
  const [listItems, setListItems] = useState("");
  const [publicStatus, setPublicStatus] = useState(true);

  async function getData() {
    await fetch(`http://localhost:5000/lists/${user}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "cors",
      },
    }).then((response) => {
      response.json().then((responseData) => {
        setListData(responseData);
      });
    });
  }

  const createList = async () => {
    const username = user;
    const list_name = "delete this";
    const items = "one, two, three";
    const public_status = true;
    const data = { username, list_name, items, public_status };

    await fetch(`http://localhost:5000/list`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "cors",
      },
      body: JSON.stringify(data),
    })
      .then((response) =>
        response.json().then((responseData) => {
          console.log(responseData);
        })
      )
      .catch((error) => {
        console.log("error is:", error);
      });

    getData();
  };

  const deleteList = async (id) => {
    await fetch(`http://localhost:5000/list/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "cors",
      },
    }).catch((error) => {
      console.log("error is:", error);
    });
    getData();
  };

  const updateList = async (id) => {
    const username = user;
    const list = findList(id); //quick and dirty until i have form
    // const list_name = `${list.list_name} edited`;
    // const items = `${list.items} edited`;
    // const public_status = true;
    const list_name = listName;
    const items = listItems;
    const public_status = publicStatus;
    const data = { list_name, items, public_status };

    await fetch(`http://localhost:5000/list/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "cors",
      },
      body: JSON.stringify(data),
    })
      .then((response) =>
        response.json().then((responseData) => {
          console.log(responseData);
        })
      )
      .catch((error) => {
        console.log("error is:", error);
      });

    getData();
  };

  const showLists = () => {
    return listData.map((item) => {
      return (
        <div
          key={item.id}
          className={`list-item ${item.id === selectedList ? "selected" : ""}`}
          onClick={() => changeSelectedList(item.id)}
        >
          {item.list_name}
        </div>
      );
    });
  };

  const findList = (id) => {
    const selectedItem = listData.find((item) => item.id === id);
    return selectedItem;
  };

  const changeSelectedList = (id) => {
    const selectedItem = findList(id);
    setSelectedList(selectedItem.id);
    setListName(selectedItem.list_name);
    setListItems(selectedItem.items);
    setPublicStatus(selectedItem.public);
  };

  useEffect(() => {
    getData();
    console.log(listData);
  }, []);
  return (
    <div>
      Hello from experimenting with lifecycle and hooks notes: create function
      that sends out get request, function that can send PUT request, function
      that sends DELETE request, const empty data and other selectedItem
      <ListContext.Provider
        value={{
          listData,
          showLists,
          selectedList,
          changeSelectedList,
          listName,
          setListName,
          listItems,
          setListItems,
          publicStatus,
          setPublicStatus,
          updateList,
        }}
      >
        <div>{editorMode}</div>
        <div className="list-selection">
          <FaPlusCircle onClick={() => setEditorMode("create")} />
          <Lists />
        </div>
        <div className="list-crud">
          {selectedList === null ? (
            <div>please select a list</div>
          ) : (
            <div>
              {editorMode === "view" ? (
                <div className="view-wrapper">
                  <div>
                    {listName}
                    <FaEdit onClick={() => setEditorMode("edit")} />
                  </div>
                  <div>{listItems}</div>
                  <div>{publicStatus}</div>
                </div>
              ) : (
                <div className="form-wrapper">
                  {editorMode === "create" ? (
                    <div className="create-wrapper"></div>
                  ) : (
                    <div className="edit-wrapper">
                      <ListEditorForm></ListEditorForm>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* <button onClick={() => createList()}>create</button>
        <button onClick={() => deleteList(selectedList)}>delete</button>
        <button onClick={() => updateList(selectedList)}>update</button> */}
        <div>{selectedList}</div>
      </ListContext.Provider>
    </div>
  );
}
