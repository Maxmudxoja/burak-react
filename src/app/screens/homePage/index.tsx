import React, { useEffect } from "react";
import ActiveUsers from "./ActiveUsers";
import Advertisement from "./Advertisement";
import NewDishes from "./NewDishes";
import PopularDishes from "./PopularDishes";
import Statistics from "./Statistics";
import Events from "./Events";
import "../../../css/home.css";

export default function HomePage() {
  //Selector : Get Data from Redux Store

  useEffect(() => {
    ///Backend server data request=> Data
    //Slice: Data=> Redux Store
  }, []);

  return (
    <div className={"homepage"}>
      <Statistics />
      <PopularDishes />
      <NewDishes />
      <Advertisement />
      <ActiveUsers />
      <Events />
    </div>
  );
}
