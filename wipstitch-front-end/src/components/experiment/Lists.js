import { useState, useEffect, useContext } from "react";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import { UserContext } from "../context/UserContext";
import { ListContext } from "../context/ListContext";

export default function Lists() {
  const { user, login } = useContext(UserContext);
  const { listData, showLists, changeSelectedList } = useContext(ListContext);

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

  return (
    <div>
      <div className="new-list-carousel">
        <Carousel responsive={responsive}>{showLists()}</Carousel>
      </div>
    </div>
  );
}
