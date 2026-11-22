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
import { CartItem } from "../../../lib/types/search";

interface ProductPageProps {
  onAdd: (item: CartItem) => void;
}
export default function ProductsPage(props: ProductPageProps) {
  const { onAdd } = props;
  const products = useRouteMatch();

  return (
    <div className={"products-page"}>
      {/* Aniqroq route (":productId" bilan) birinchi turadi, aks holda "/products" hammasini ushlab qoladi */}
      <Switch>
        <Route path={`${products.path}/:productId`}>
          <ChosenProduct onAdd={onAdd} />
        </Route>
        <Route path={`${products.path}`}>
          <Products onAdd={onAdd} />
        </Route>
      </Switch>
    </div>
  );
}
