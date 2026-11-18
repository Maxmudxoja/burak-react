import { createSelector } from "reselect";
import ProductsPage from ".";
import { AppRootState } from "../../../lib/types/screen";

const selectProductsPage = (state: AppRootState) => state.productsPage;
export const retrieveRestaurant = createSelector(
  selectProductsPage,
  (ProductsPage) => ProductsPage.restaurant,
);

export const retrieveChosenProduct = createSelector(
  selectProductsPage,
  (ProductsPage) => ProductsPage.chosenProduct,
);

export const retrieveProduct = createSelector(
  selectProductsPage,
  (ProductsPage) => ProductsPage.products,
);
