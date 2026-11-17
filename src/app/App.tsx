/**
 * ============================================================
 *  App.tsx — ILOVANING SKELETI (LAYOUT + ROUTING)
 * ============================================================
 * Har bir sahifada bir xil tuzilma:
 *     [ NAVBAR ]   <- "/" da HomeNavbar (katta header), boshqa joyda OtherNavbar
 *     [ SAHIFA ]   <- URL ga qarab Switch tanlaydi
 *     [ FOOTER ]   <- hamma sahifada bir xil
 *
 * URL -> Sahifa:
 *   /products     -> ProductsPage  (menyu, mahsulotlar)
 *   /orders       -> OrdersPage    (buyurtmalar)
 *   /member-page  -> UserPage      (profil sozlamalari)
 *   /help         -> HelpPage      (qoidalar, FAQ, aloqa)
 *   /             -> HomePage      (bosh sahifa)
 */
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import React from "react";
import { Link, Route, Switch, useLocation } from "react-router-dom";
import HomePage from "./screens/homePage";
import OrdersPage from "./screens/ordersPage";
import ProductsPage from "./screens/productsPage";
import UserPage from "./screens/userPage";
import HomeNavbar from "./components/headers/HomeNavbar";
import OtherNavBar from "./components/headers/OtherNavbar";
import Footer from "./components/footer";
// Navbar/footer hamma sahifada bo'lgani uchun ularning CSS'i shu yerda import qilinadi
import "../css/app.css";
import "../css/navbar.css";
import "../css/footer.css";
import HelpPage from "./screens/helpPage";
import Test from "./screens/Test"; // faqat o'rganish uchun (class component misoli), ishlatilmayapti

function App() {
  // useLocation — hozirgi URL ma'lumotini beradi (pathname = "/products" kabi)
  const location = useLocation();

  return (
    <>
      {/* Bosh sahifada katta header'li navbar, qolganlarida oddiy navbar */}
      {location.pathname === "/" ? <HomeNavbar /> : <OtherNavBar />}

      {/* Switch — birinchi mos kelgan Route'ni render qiladi (tepadan pastga).
          Shuning uchun "/" ENG OXIRIDA turadi: aks holda "/" hamma URL ga mos kelib,
          doim HomePage chiqib qolar edi (react-router v5 da path prefix bo'yicha solishtiriladi). */}
      <Switch>
        <Route path="/products">
          <ProductsPage />
        </Route>
        <Route path="/orders">
          <OrdersPage />
        </Route>
        <Route path="/member-page">
          <UserPage />
        </Route>
        <Route path="/help">
          <HelpPage />
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>

      {/* Footer — barcha sahifalar ostida */}
      <Footer />
    </>
  );
}

export default App;
