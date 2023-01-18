import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { FaUserAlt } from "react-icons/fa";

import ReactiveCarousel from "../Carousel";

export function Index() {
  const { user, login, listsData } = useContext(UserContext);
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(0);
  const [generatedItem, setGeneratedItem] = useState(0);
  const [mode, setMode] = useState("lists");

  const randomGenerate = () => {
    const listItems = data.filter((item) => item.id == selectedItem)[0].items;
    const listItemsArray = listItems.split(", ");
    const randomListIndex = Math.floor(Math.random() * listItemsArray.length);
    const randomListItem = setGeneratedItem(listItemsArray[randomListIndex]);
    console.log(selectedItem, listItems);
  };

  const changeSelectedItem = (item) => {
    setSelectedItem(item.id);
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
    <div className="home">
      <div className="user-container">
        <FaUserAlt />
        <div className="username">{user}</div>
      </div>
      <div></div>
      <ReactiveCarousel
        mode={mode}
        selectedItem={selectedItem}
        changeSelectedItem={changeSelectedItem}
        data={data}
        setData={setData}
        itemClassName="carousel-item"
      />
      <div className="generate-prompt-wrapper">
        <p className="generate-btn" onClick={randomGenerate}>
          generate
        </p>
        {generatedItem ? (
          <p>{generatedItem}</p>
        ) : (
          <p>pick a list to generate a random prompt!</p>
        )}
      </div>
      <div>wips progress carousel component</div>
      <div>selected item is {selectedItem}</div>
      {console.log(listsData, "this is listsData from app.js")}
      {console.log(data, "this is data from here")}
      {/* <div>selected item data is {data[selectedItem]}</div> */}
      {/* note: each of these components should be getting lists, which has individual list items, and all of it is styled in the actual carousel component, list editor =, or wip editor */}
    </div>
  );
}

export default Index;
