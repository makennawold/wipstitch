import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";
// import { FaCheck } from "react-icons/fa";

import ReactiveCarousel from "../Carousel";
import ListCarousel from "../ListCarousel";
import ListEditorForm from "../lists/ListEditorForm";

import useWindowDimensions from "../WindowDimensions";

export default function Lists() {
  const { user, login } = useContext(UserContext);
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(0);
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

  return (
    <div className="lists-wrapper">
      <div className="list-menu">
        fetch data with useeffect then call function here that maps through data
        to go through list component has to check for mobile actually to render
        a carousel or the desktop menu
        {width >= 400 ? (
          <div>desktop</div>
        ) : (
          // <ListCarousel
          //   selectedItem={selectedItem}
          //   setSelectedItem={setSelectedItem}
          //   data={data}
          //   setData={setData}
          // />
          <ReactiveCarousel
            mode="lists"
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
            data={data}
            setData={setData}
          />
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
