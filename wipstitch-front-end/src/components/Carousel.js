import React, { useState, useEffect, useContext } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import { UserContext } from "./context/UserContext";

export default function ReactiveCarousel({
  mode,
  selectedItem,
  setSelectedItem,
  data,
}) {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 6,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4,
    },
    middle: {
      breakpoint: { max: 464, min: 300 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 300, min: 0 },
      items: 2,
    },
  };

  const createCarouselItems = () => {
    return data.map((item) => {
      return (
        <div
          key={item.id}
          className={`carousel-item ${
            item.id === selectedItem ? "selected" : ""
          }`}
          onClick={() => setSelectedItem(item.id)}
        >
          {mode === "lists" ? item.list_name : item.wip_name}
        </div>
      );
    });
  };

  return (
    <div className="carousel">
      {/* make class name responsive on what type of carousel */}
      <Carousel responsive={responsive}>{createCarouselItems()}</Carousel>
    </div>
  );
}
