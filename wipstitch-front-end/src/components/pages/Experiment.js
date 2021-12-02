import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";

import { ListContext } from "../context/ListContext";
import Lists from "../experiment/Lists";
import ListEditorForm from "../experiment/ListEditorForm";

export default function Experiment() {
  const { user, login } = useContext(UserContext);
  const [listData, setListData] = useState([]);
  const [selectedList, setSelectedList] = useState(null);

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
        value={{ listData, showLists, selectedList, changeSelectedList }}
      >
        <Lists />

        <button onClick={() => createList()}>create</button>
        <button onClick={() => deleteList(selectedList)}>delete</button>
        <div>{selectedList}</div>
        <ListEditorForm></ListEditorForm>
      </ListContext.Provider>
    </div>
  );
}
