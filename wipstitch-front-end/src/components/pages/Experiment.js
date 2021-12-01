import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";

import { ListContext } from "../context/ListContext";

export default function Experiment() {
  const { user, login } = useContext(UserContext);
  const [listData, setListData] = useState([]);

  async function getData() {
    await fetch(`http://localhost:5000/lists/${user}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "cors",
      },
    }).then((response) => {
      response.json().then((responseData) => {
        setListData(responseData);
      });
    });
  }

  const showLists = () => {
    return listData.map((item) => {
      return <div key={item.id}>{item.list_name}</div>;
    });
  };

  useEffect(() => {
    getData();
    console.log(listData);
  }, []);
  return (
    <div>
      Hello from experimenting with lifecycle and hooks notes: create function
      that sends out get request, function that can send PUT request, function
      that sends DELETE request, const empty data and other selectedItem
      {showLists()}
    </div>
  );
}
