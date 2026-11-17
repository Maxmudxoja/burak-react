/**
 * ============================================================
 *  selector.ts — HOMEPAGE STATE'IDAN O'QISH (O'QISH TOMONI)
 * ============================================================
 * Selector = store'dan kerakli bo'lakni "tanlab olish" funksiyasi.
 * slice.ts -> YOZADI,  selector.ts -> O'QIYDI.
 *
 * createSelector (reselect) — natijani eslab qoladi (memoization):
 * agar state.homePage o'zgarmagan bo'lsa, qayta hisoblamaydi va
 * komponent keraksiz qayta render bo'lmaydi.
 */
import { createSelector } from "reselect";
import { AppRootState } from "../../../lib/types/screen";

// Butun state'dan faqat homePage qismini oladi (asosiy kirish)
const selectHomePage = (state: AppRootState) => state.homePage;

// state.homePage.popularDishes  -> PopularDishes komponenti ishlatadi
export const retrievePopularDishes = createSelector(
  selectHomePage,
  (HomePage) => HomePage.popularDishes,
);

// state.homePage.newDishes      -> NewDishes komponenti ishlatadi
export const retrieveNewDishes = createSelector(
  selectHomePage,
  (HomePage) => HomePage.newDishes,
);

// state.homePage.topUsers       -> ActiveUsers komponenti ishlatadi
export const retrieveTopUsers = createSelector(
  selectHomePage,
  (HomePage) => HomePage.topUsers,
);
