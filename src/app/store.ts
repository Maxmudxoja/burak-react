/**
 * ============================================================
 *  store.ts — REDUX STORE (GLOBAL "OMBOR")
 * ============================================================
 * Store — butun ilova uchun umumiy ma'lumotlar saqlanadigan joy.
 * Har bir sahifa o'zining "slice" (bo'lak) iga ega. Hozircha faqat homePage bor.
 *
 *   state = {
 *     homePage: { popularDishes: [], newDishes: [], topUsers: [] }
 *   }
 *
 * Yangi sahifa uchun state kerak bo'lsa: shu sahifaning slice.ts ini yozib,
 * pastdagi `reducer` obyektiga qo'shasiz (masalan productsPage: ProductsPageReducer).
 */
import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import HomePageReducer from "./screens/homePage/slice";
import reduxLogger from "redux-logger";
import ProductPageReducer from "./screens/productsPage/slice";

export const store = configureStore({
  // middleware — har bir dispatch'dan oldin/keyin ishlaydigan qatlam.
  // reduxLogger — har bir action va state o'zgarishini brauzer console'ga chiqaradi (debug uchun juda qulay).
  middleware: (getDefaultMiddleware) =>
    //@ts-ignore
    getDefaultMiddleware().concat(reduxLogger),
  // reducer — state'ning qaysi kaliti qaysi reducer bilan boshqarilishi
  reducer: {
    homePage: HomePageReducer,
    productsPage: ProductPageReducer,
  },
});

// Quyidagi type'lar TypeScript uchun: dispatch va state'ning aniq turini bilish.
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
