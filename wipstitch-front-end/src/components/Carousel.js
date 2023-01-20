import React, { useState, useEffect, useContext } from "react";
import { FaPlusCircle } from "react-icons/fa";

import { UserContext } from "./context/UserContext";

export default function ReactiveCarousel({
  itemClassName = "carousel-item",
  data,
}) {
  const { selectedItem, mode, changeSelectedItem } = useContext(UserContext);

  const createCarouselItems = () => {
    return data.map((item) => {
      console.log("mapping", item);
      return (
        <div
          key={item.id}
          className={`${itemClassName} ${
            item.id === selectedItem ? "selected" : ""
          }`}
          onClick={() => changeSelectedItem(item)}
        >
          {mode === "lists" ? item.list_name : item.wip_name}
        </div>
      );
    });
  };

  return <div className="carousel">{createCarouselItems()}</div>;
}
