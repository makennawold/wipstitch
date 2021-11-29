import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { FaUserAlt } from "react-icons/fa";

import ReactiveCarousel from "../Carousel";

export function Index() {
  const { user, login } = useContext(UserContext);
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(0);
  const [generatedItem, setGeneratedItem] = useState(0);

  const randomGenerate = () => {
    // random list vv
    // let randomIndex = Math.floor(Math.random() * data.length);
    // setGeneratedItem(data[randomIndex].id);
    // console.log(generatedItem);
    const listItems = data[selectedItem].items;
    const listItemsArray = listItems.split(", ");
    const randomListIndex = Math.floor(Math.random() * listItemsArray.length);
    const randomListItem = setGeneratedItem(listItemsArray[randomListIndex]);
  };

  return (
    <div className="home">
      <div className="user-container">
        <FaUserAlt />
        <div className="username">{user}</div>
      </div>
      <div></div>
      <ReactiveCarousel
        mode="lists"
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
        data={data}
        setData={setData}
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
      {/* note: each of these components should be getting lists, which has individual list items, and all of it is styled in the actual carousel component, list editor =, or wip editor */}
    </div>
  );
}

export default Index;

// {user.auth ? (
//   <Route path="/" exact component={Home}></Route>
// ) : (
//   <div>auth component</div>
// )}
