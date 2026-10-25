import { Box, Button, Container, Stack, Typography } from "@mui/material";
import React from "react";
import { Link, Route, Switch, useLocation } from "react-router-dom";
import "../css/app.css";
import { Footer } from "./components/footer";
import { HomeNavBar } from "./components/headers/HomeNavbar";
import { OtherNavBar } from "./components/headers/OtherNavbar";

import { HomePage } from "./screens/homePage";
import { OrdersPage } from "./screens/ordersPage/intex";
import { ProductsPage } from "./screens/productsPage";
import { UserPage } from "./screens/userPage";

function App() {
  const location = useLocation();
  console.log("locaion: ", location);

  return (
    <>
      {location.pathname === "/" ? <HomeNavBar /> : <OtherNavBar />}
      <Switch>
        <Route path="/products">
          <ProductsPage />
        </Route>
        <Route path="/orders">
          <OrdersPage />
        </Route>
        <Route path="/member-page">
          <UserPage />
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
      <Footer />
    </>
  );
}

export default App;
