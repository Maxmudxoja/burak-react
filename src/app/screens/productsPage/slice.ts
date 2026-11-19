/**
 * ============================================================
 *  productsPage/slice.ts — PRODUCTS SAHIFASI UCHUN REDUX "BO'LAGI" (YOZISH TOMONI)
 * ============================================================
 * homePage/slice.ts bilan AYNAN bir xil pattern. Farqi faqat saqlanadigan ma'lumotda:
 *   restaurant    — restoran (admin) ma'lumoti      -> ChosenProduct'da nomi/telefoni chiqadi
 *   chosenProduct — tanlangan BITTA mahsulot        -> ChosenProduct (/products/:id)
 *   products      — mahsulotlar RO'YXATI            -> Products (/products)
 *
 * store.ts da `productsPage: ProductPageReducer` deb ulangan, shuning uchun
 * bu ma'lumotlar state.productsPage.* ichida yashaydi.
 */
import { createSlice } from "@reduxjs/toolkit";
import { ProductsPageState } from "../../../lib/types/screen";

// Boshlang'ich holat. restaurant va chosenProduct — bitta obyekt bo'lgani uchun
// "hali yo'q" degani null; products — ro'yxat bo'lgani uchun bo'sh massiv [].
const initialState: ProductsPageState = {
  restaurant: null,
  chosenProduct: null,
  products: [],
};

const productsPageSlice = createSlice({
  name: "productsPage", // action nomlari: "productsPage/setProducts" va h.k.
  initialState,
  reducers: {
    // Har bir reducer: kelgan ma'lumotni (action.payload) state'ning tegishli joyiga yozadi
    setRestaurant: (state, action) => {
      state.restaurant = action.payload;
    },
    setChosenProduct: (state, action) => {
      state.chosenProduct = action.payload;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
  },
});

// Action creator'lar — komponentlar dispatch() bilan chaqiradi
export const { setRestaurant, setChosenProduct, setProducts } =
  productsPageSlice.actions;

// Reducer — store.ts ga ulanadi
const ProductPageReducer = productsPageSlice.reducer;

export default ProductPageReducer;
