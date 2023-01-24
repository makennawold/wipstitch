import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { FaUserAlt } from "react-icons/fa";

import ReactiveCarousel from "../Carousel";

export function Index() {
  const {
    user,
    listsData,
    setListsData,
    selectedItem,
    setSelectedItem,
    mode,
    setMode,
    changeSelectedItem,
    getListsData,
  } = useContext(UserContext);
  const [generatedItem, setGeneratedItem] = useState(0);

  const randomGenerate = () => {
    const listItems = listsData.filter((item) => item.id == selectedItem)[0]
      .items;
    const listItemsArray = listItems.split(", ");
    const randomListIndex = Math.floor(Math.random() * listItemsArray.length);
    setGeneratedItem(listItemsArray[randomListIndex]);
  };

  useEffect(() => {
    getListsData(user);
  }, []);

  return (
    <div className="home">
      <div className="user-container">
        <FaUserAlt />
        <div className="username">{user}</div>
      </div>
      <div></div>
      <ReactiveCarousel itemClassName="carousel-item" data={listsData} />

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
    </div>
  );
}

export default Index;
