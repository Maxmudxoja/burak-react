/**
 * ============================================================
 *  homePage/index.tsx — BOSH SAHIFA ("/")
 * ============================================================
 * Bu komponent 2 ta ish qiladi:
 *   1) MA'LUMOT YUKLASH: sahifa ochilganda backenddan ma'lumot olib, Redux'ga yozadi.
 *   2) BO'LIMLARNI JOYLASH: Statistics, PopularDishes, NewDishes ... ni tartib bilan chiqaradi.
 *
 * TO'LIQ OQIM (eng muhim qism!):
 *
 *   HomePage ochiladi
 *        │  useEffect (faqat 1 marta)
 *        ▼
 *   ProductService / MemberService  ──axios──►  BACKEND
 *        │                                         │
 *        │◄────────────── data (JSON) ─────────────┘
 *        ▼
 *   dispatch(setPopularDishes(data))   (slice.ts)
 *        ▼
 *   Redux store: state.homePage.popularDishes = data
 *        ▼
 *   PopularDishes komponenti useSelector(...) orqali o'qiydi -> ekranda chiqadi
 *
 * Ya'ni: HomePage faqat YOZADI, bolalar (PopularDishes, NewDishes, ActiveUsers) faqat O'QIYDI.
 * Props orqali uzatish shart emas — hamma Redux'dan oladi.
 */
import React, { useEffect } from "react";
import ActiveUsers from "./ActiveUsers";
import Advertisement from "./Advertisement";
import NewDishes from "./NewDishes";
import PopularDishes from "./PopularDishes";
import Statistics from "./Statistics";
import Events from "./Events";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setNewDishes, setPopularDishes, setTopUsers } from "./slice";
import { Product } from "../../../lib/types/product";
import ProductService from "../../services/ProductServices";
import { ProductCollection } from "../../../lib/enums/product_enum";
import MemberService from "../../services/MemberService";
import { Member } from "../../../lib/types/member";
import "../../../css/home.css";

/** REDUX SLICE & SELECTOR **/
// actionDispatch — dispatch'ni action'lar bilan "o'rab" qulay funksiyalar yasaydi.
// Shunda komponent ichida `dispatch(setPopularDishes(data))` o'rniga
// shunchaki `setPopularDishes(data)` deb yozamiz.
const actionDispatch = (dispatch: Dispatch) => ({
  setPopularDishes: (data: Product[]) => dispatch(setPopularDishes(data)),
  setNewDishes: (data: Product[]) => dispatch(setNewDishes(data)),
  setTopUsers: (data: Member[]) => dispatch(setTopUsers(data)),
});

export default function HomePage() {
  // Dispatch funksiyalarini olamiz (Redux'ga YOZISH uchun)
  const { setPopularDishes, setNewDishes, setTopUsers } =
    actionDispatch(useDispatch());

  // useEffect(..., []) — bo'sh massiv = faqat komponent birinchi marta ekranga chiqqanda ishlaydi
  // (class component'dagi componentDidMount bilan bir xil). Backenddan data olish uchun ideal joy.
  useEffect(() => {
    // Backend server data fetch=>Data

    const product = new ProductService();

    // 1) POPULAR DISHES: faqat DISH kategoriyasi, ko'rishlar soni bo'yicha, 4 ta
    product
      .getProducts({
        page: 1,
        limit: 4,
        order: "productViews",
        productCollection: ProductCollection.DISH,
      })
      .then((data) => {
        setPopularDishes(data); // -> state.homePage.popularDishes
      })
      .catch((err) => console.log(err));

    // 2) NEW DISHES (Fresh Menu): barcha kategoriya, yaratilgan sana bo'yicha (eng yangisi), 4 ta
    product
      .getProducts({
        page: 1,
        limit: 4,
        order: "createdAt",
      })
      .then((data) => {
        setNewDishes(data); // -> state.homePage.newDishes
      })
      .catch((err) => console.log(err));

    // 3) TOP USERS (Active Users)
    const member = new MemberService();

    member
      .getTopUsers()
      .then((data) => {
        setTopUsers(data); // -> state.homePage.topUsers
      })
      .catch((err) => console.log(err));
  }, []);

  // Bo'limlar ekranda yuqoridan pastga shu tartibda chiqadi
  return (
    <div className={"homepage"}>
      <Statistics /> {/* statik raqamlar (backendsiz) */}
      <PopularDishes /> {/* Redux: popularDishes */}
      <NewDishes /> {/* Redux: newDishes */}
      <Advertisement /> {/* reklama video */}
      <ActiveUsers /> {/* Redux: topUsers */}
      <Events /> {/* slider, lib/data/plans.ts dan */}
    </div>
  );
}
