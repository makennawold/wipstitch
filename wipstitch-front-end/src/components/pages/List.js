import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { FaCheck, FaEdit, FaTrashAlt, FaArrowLeft } from "react-icons/fa";

import { Link } from "react-router-dom";

import NewList from "../list/NewList";

export default function List() {
  const {
    listsData,
    selectedItem,
    editMode,
    setEditMode,
    user,
    getListsData,
    databaseURL,
  } = useContext(UserContext);

  const [publicStatus, setPublicStatus] = useState(true);
  const [title, setTitle] = useState("");
  const [items, setItems] = useState("");

  const createLists = () => {
    const listItems = listsData.filter((item) => item.id == selectedItem)[0]
      .items;
    const listItemsArray = listItems.split(", ");
    return listItemsArray.map((item) => {
      return <div key={item}>{item}</div>;
    });
  };

  const updateList = async (list_name, items, public_status, id) => {
    const data = { list_name, items, public_status, id };
    await fetch(`${databaseURL}list/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "cors",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        getListsData(user);
        setEditMode("viewList");
      })
      .catch((error) => {
        console.log("error is:", error);
      });
  };

  const deleteList = async () => {
    await fetch(`${databaseURL}list/${selectedItem}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "cors",
      },
    })
      .then((response) => {
        getListsData(user);
        setEditMode("viewList");
      })
      .catch((error) => {
        console.log("error is:", error);
      });
    getListsData(user);
    setEditMode("viewList");
  };

  useEffect(() => {
    getListsData(user);
    if (listsData.filter((item) => item.id == selectedItem)[0] !== undefined) {
      setTitle(
        listsData.filter((item) => item.id == selectedItem)[0].list_name
      );
      setItems(listsData.filter((item) => item.id == selectedItem)[0].items);
      setPublicStatus(
        listsData.filter((item) => item.id == selectedItem)[0].public
      );
    }
  }, []);

  return (
    <div className="list-wrapper">
      {editMode == "newList" ? (
        <NewList />
      ) : (
        <div className="list-card">
          <Link to="/lists" className="back-button">
            <FaArrowLeft /> back
          </Link>
          <div className="title-wrapper">
            {editMode == "viewList" ? (
              <div className="title">{title}</div>
            ) : (
              <div className="title-input">
                title
                <input
                  placeholder="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
            )}

            <div className="mode-buttons-wrapper">
              {editMode == "viewList" ? (
                <FaEdit onClick={() => setEditMode("editList")} />
              ) : (
                <FaCheck onClick={() => setEditMode("viewList")} />
              )}

              <Link
                to="/lists"
                className="delete-button"
                onClick={() => deleteList()}
              >
                <FaTrashAlt style={{ color: "black" }} />
              </Link>
            </div>
          </div>
          {editMode == "viewList" ? (
            <div className="list-items-wrapper">{createLists()}</div>
          ) : (
            <div className="list-items-input">
              items
              <input
                placeholder="separate your items by commas"
                value={items}
                onChange={(e) => setItems(e.target.value)}
              />
            </div>
          )}
          {editMode == "editList" ? (
            <div className="button-wrapper">
              <Link
                to="/lists"
                className="submit-button"
                onClick={() =>
                  updateList(title, items, publicStatus, selectedItem)
                }
              >
                submit
              </Link>

              <div
                className={`toggle-button ${
                  publicStatus ? "public" : "private"
                }`}
              >
                <div
                  className={`toggle-label ${
                    publicStatus ? "public" : "private"
                  }`}
                >
                  {publicStatus ? "public" : "private"}
                </div>
                <div
                  className={`toggle ${publicStatus ? "public" : "private"}`}
                  onClick={() => {
                    setPublicStatus(!publicStatus);
                  }}
                ></div>
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      )}
    </div>
  );
}
