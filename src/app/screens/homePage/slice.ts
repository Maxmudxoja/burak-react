/**
 * ============================================================
 *  slice.ts — HOMEPAGE UCHUN REDUX "BO'LAGI" (YOZISH TOMONI)
 * ============================================================
 * Slice = state bo'lagi + uni o'zgartiruvchi funksiyalar (reducers) + action'lar.
 * createSlice bularning hammasini bitta joyda avtomatik yaratib beradi.
 *
 * Oqim:
 *   dispatch(setNewDishes(data))  ->  reducer `setNewDishes` ishlaydi
 *   ->  state.homePage.newDishes = data  ->  shu ma'lumotni o'qiyotgan komponentlar qayta render bo'ladi
 */
import { createSlice } from "@reduxjs/toolkit";
import { HomePageState } from "../../../lib/types/screen";

// Boshlang'ich holat: hammasi bo'sh massiv (backenddan hali hech narsa kelmagan)
const initialState: HomePageState = {
  popularDishes: [],
  newDishes: [],
  topUsers: [],
};

const homePageSlice = createSlice({
  name: "homePage", // action nomlari "homePage/setNewDishes" ko'rinishida bo'ladi
  initialState,
  reducers: {
    // Har bir reducer: action.payload (yuborilgan ma'lumot) ni state'ga yozadi.
    // Redux Toolkit ichida Immer bor, shuning uchun `state.x = ...` deb to'g'ridan-to'g'ri yozish mumkin.
    setPopularDishes: (state, action) => {
      state.popularDishes = action.payload;
    },
    setNewDishes: (state, action) => {
      state.newDishes = action.payload;
    },
    setTopUsers: (state, action) => {
      state.topUsers = action.payload;
    },
  },
});

// Action creator'lar — komponentlar dispatch() qilish uchun import qiladi
export const { setPopularDishes, setNewDishes, setTopUsers } =
  homePageSlice.actions;

// Reducer — store.ts da `homePage` kalitiga ulanadi
const HomePageReducer = homePageSlice.reducer;

export default HomePageReducer;
