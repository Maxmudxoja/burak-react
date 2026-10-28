import React from "react";
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";
import { Container } from "@mui/material";
import ChosenProduct from "./ChosenProduct";
import Products from "./Products";

export default function ProductsPage() {
  const proudcts = useRouteMatch();
  console.log("products: ", proudcts);
  return (
    <div className="products-page">
      <Switch>
        <Route path={`${proudcts.path} /:productId`}>
          <ChosenProduct />
        </Route>

        <Route path={`${proudcts.path}`}>
          <Products />
        </Route>
      </Switch>
    </div>
  );
}
