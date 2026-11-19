/**
 * ============================================================
 *  productsPage/selector.ts — PRODUCTS SAHIFASI STATE'IDAN O'QISH
 * ============================================================
 * slice.ts YOZADI -> selector.ts O'QIYDI.
 * "retrieve" so'zi = "olib kelmoq". retrieveX = "state'dan X ni olib ber".
 */
import { createSelector } from "reselect";
// DIQQAT: bu import ishlatilmayapti (pastdagi `ProductsPage` — bu import emas, oddiy parametr nomi).
// Bundan tashqari index.tsx -> Products.tsx -> selector.ts -> index.tsx aylana import hosil qiladi.
// Xavfsiz o'chirib tashlash mumkin.
import ProductsPage from ".";
import { AppRootState } from "../../../lib/types/screen";

// Butun state'dan faqat productsPage bo'lagini oladi
const selectProductsPage = (state: AppRootState) => state.productsPage;

// state.productsPage.restaurant     -> ChosenProduct
export const retrieveRestaurant = createSelector(
  selectProductsPage,
  (ProductsPage) => ProductsPage.restaurant,
);

// state.productsPage.chosenProduct  -> ChosenProduct
export const retrieveChosenProduct = createSelector(
  selectProductsPage,
  (ProductsPage) => ProductsPage.chosenProduct,
);

// state.productsPage.products       -> Products (ro'yxat)
export const retrieveProduct = createSelector(
  selectProductsPage,
  (ProductsPage) => ProductsPage.products,
);
