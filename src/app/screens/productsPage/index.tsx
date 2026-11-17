/**
 * ============================================================
 *  productsPage/index.tsx — "/products" SAHIFASI (ICHKI ROUTING)
 * ============================================================
 * Bu sahifaning o'zida ham kichik router bor (nested routes):
 *   /products            -> Products       (barcha mahsulotlar ro'yxati)
 *   /products/:productId -> ChosenProduct  (bitta mahsulot tafsiloti)
 * useRouteMatch() — hozirgi route'ning path'ini ("/products") beradi,
 * shunda "/products" so'zini qo'lda qayta yozmaymiz.
 */
import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import ChosenProduct from "./ChosenProduct";
import Products from "./Products";
import "../../../css/products.css";

export default function ProductsPage() {
  const products = useRouteMatch();

  return (
    <div className={"products-page"}>
      {/* Aniqroq route (":productId" bilan) birinchi turadi, aks holda "/products" hammasini ushlab qoladi */}
      <Switch>
        <Route path={`${products.path}/:productId`}>
          <ChosenProduct />
        </Route>
        <Route path={`${products.path}`}>
          <Products />
        </Route>
      </Switch>
    </div>
  );
}
