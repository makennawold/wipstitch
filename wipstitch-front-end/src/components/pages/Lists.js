import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { FaPlusCircle } from "react-icons/fa";

import ReactiveCarousel from "../Carousel";
import ListEditorForm from "../lists/ListEditorForm";

import useWindowDimensions from "../WindowDimensions";

export default function Lists() {
  const { user, login } = useContext(UserContext);
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(0);
  const [mode, setMode] = useState("lists");

  const { height, width } = useWindowDimensions();

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
        })
      )
      .catch((error) => {
        console.log("error is:", error);
      });
  };

  useEffect(() => {
    async function getData() {
      await fetch(`http://localhost:5000/${mode}/${user}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          "Access-Control-Allow-Origin": "cors",
        },
      }).then((response) => {
        response.json().then((responseData) => {
          setData(responseData);
        });
      });
    }

    getData();
  }, []);

  return (
    <div className="list-wrapper">
      <div className="list-menu">
        {console.log(data.length)}
        {width >= 400 ? (
          <div>desktop</div>
        ) : (
          <div className="list-carousel">
            <FaPlusCircle className="new-list-btn" />
            <ReactiveCarousel
              mode="lists"
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
              data={data}
              setData={setData}
              itemClassName="carousel-item-list"
            />
          </div>
        )}
      </div>
      <ListEditorForm
        data={data}
        selectedItem={selectedItem}
        createList={createList}
      />
    </div>
  );
}
