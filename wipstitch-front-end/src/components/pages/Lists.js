import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { FaPlusCircle } from "react-icons/fa";

import ReactiveCarousel from "../Carousel";
import ListEditorForm from "../lists/ListEditorForm";
import ListCreateForm from "../lists/ListCreateForm";

import useWindowDimensions from "../WindowDimensions";

export default function Lists() {
  const { user, login } = useContext(UserContext);
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(0);
  const [mode, setMode] = useState("lists");
  const [editorMode, setEditorMode] = useState("view");
  const [triggerValue, triggerReload] = useState(false);

  //change value from view to edit to create

  const { height, width } = useWindowDimensions();

  async function getData() {
    await fetch(`http://localhost:5000/${mode}/${user}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "cors",
      },
    }).then((response) => {
      response.json().then((responseData) => {
        console.log(responseData, "this is new response");
        setData(responseData);
      });
    });
    console.log("got data");
    console.log(data);
  }

  const changeSelectedItem = (id) => {
    setSelectedItem(id);
    setEditorMode("view");
  };

  const createList = async (list_name, items, public_status) => {
    const username = user;
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
          // const newData = data;
          // newData.push(responseData);
          // setData(newData);
          getData();
        })
      )
      .catch((error) => {
        console.log("error is:", error);
      });

    setEditorMode("view");
    // setSelectedItem(0);
    // triggerReload(!triggerValue);
  };

  const deleteList = async (id, index) => {
    await fetch(`http://localhost:5000/list/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "cors",
      },
    })
      // .then((response) => {
      //   if (response.ok) {
      //     // setSelectedItem(0);
      //     setEditorMode("view");
      //     triggerReload(!triggerValue);
      //   }
      // })
      .catch((error) => {
        console.log("error is:", error);
      });
    // const newData = data;
    // newData.splice(index, 1);
    // setData(newData);
    getData();
    setEditorMode("view");
    // triggerReload(!triggerValue);
  };

  const updateList = async (list_name, items, public_status, id) => {
    const data = { list_name, items, public_status };
    await fetch(`http://localhost:5000/list/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "cors",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          setEditorMode("view");
          triggerReload(!triggerValue);
        }
      })
      .catch((error) => {
        console.log("error is:", error);
      });
  };

  useEffect(() => {
    console.log(selectedItem);

    getData();
  }, [selectedItem, triggerValue]);

  return (
    <div className="list-wrapper">
      <div className="list-menu">
        {editorMode}
        <div className="list-carousel">
          <FaPlusCircle
            className="new-list-btn"
            onClick={() => {
              setEditorMode("create");
              setSelectedItem(0);
            }}
          />
          <ReactiveCarousel
            mode="lists"
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
            data={data}
            setData={setData}
            itemClassName="carousel-list-item"
            changeSelectedItem={changeSelectedItem}
          />
        </div>
      </div>
      {editorMode === "create" ? (
        <div>
          <ListCreateForm
            data={data}
            selectedItem={selectedItem}
            createList={createList}
          />
        </div>
      ) : (
        <div>
          {selectedItem === 0 ? (
            <div>please select a list</div>
          ) : (
            <div>
              <ListEditorForm
                data={data}
                selectedItem={selectedItem}
                createList={createList}
                editorMode={editorMode}
                setEditorMode={setEditorMode}
                updateList={updateList}
                deleteList={deleteList}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
