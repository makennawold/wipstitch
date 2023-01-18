import React, { useContext, useState } from "react";
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
  } = useContext(UserContext);
  const [generatedItem, setGeneratedItem] = useState(0);

  const randomGenerate = () => {
    const listItems = listsData.filter((item) => item.id == selectedItem)[0]
      .items;
    const listItemsArray = listItems.split(", ");
    const randomListIndex = Math.floor(Math.random() * listItemsArray.length);
    setGeneratedItem(listItemsArray[randomListIndex]);
  };

  return (
    <div className="home">
      <div className="user-container">
        <FaUserAlt />
        <div className="username">{user}</div>
      </div>
      <div></div>
      <ReactiveCarousel itemClassName="carousel-item" />
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

      {/* note: each of these components should be getting lists, which has individual list items, and all of it is styled in the actual carousel component, list editor =, or wip editor */}
    </div>
  );
}

export default Index;
