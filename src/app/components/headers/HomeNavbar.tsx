/**
 * ============================================================
 *  HomeNavbar.tsx — BOSH SAHIFA ("/") UCHUN NAVBAR + KATTA HEADER
 * ============================================================
 * App.tsx: pathname === "/" bo'lsa shu chiqadi, aks holda OtherNavbar.
 * Tarkibi: logo, menyu linklari, Basket (savat), Login tugmasi va
 * pastida katta banner ("World's Most Delicious Cuisine", SIGN UP).
 *
 * authMember — hozircha null (login hali yozilmagan). Login qilingach bu yerda
 * foydalanuvchi obyekti bo'ladi va "Orders", "My Page" linklari + avatar ko'rinadi.
 */
import { Button, Box, Container, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Basket from "./Basket";

export default function HomeNavbar() {
  const authMember = null;

  // --- O'RGANISH UCHUN DEMO (useState + useEffect lifecycle) ---
  // count — "{count} hours service" matnida ko'rinadi.
  const [count, setCount] = useState<number>(0);

  // value — SIGN UP bosilganda almashadi (true <-> false)
  const [value, setvalue] = useState<boolean>(true);

  // useEffect [value] ga bog'langan: birinchi render'da VA har safar value o'zgarganda ishlaydi.
  //  - ichki qism   = componentDidMount / componentDidUpdate
  //  - return () => = cleanup, keyingi effect'dan oldin yoki komponent o'chganda (componentWillUnmount)
  // Natija: SIGN UP har bosilganda count +1 bo'ladi.
  useEffect(() => {
    console.log("componentDidMount");
    setCount(count + 1);

    return () => {
      console.log("componentWillUnmount");
    };
  }, [value]);

  /**HANDLERS*/
  const buttonHandler = () => {
    setvalue(!value);
  };

  return (
    <div className="home-navbar">
      <Container className="navbar-container ">
        <Stack className="menu">
          <Box>
            <NavLink to="/">
              <img className="brand-logo" src=" /icons/burak.svg" />
            </NavLink>
          </Box>
          <Stack className="links">
            {/* NavLink — sahifani qayta yuklamasdan URL'ni o'zgartiradi.
                activeClassName — hozirgi sahifa linkiga "underline" klassini qo'shadi (tagiga chiziq) */}
            <Box className={"hover-line"}>
              <NavLink to="/" activeClassName={"underline"}>
                Home
              </NavLink>
            </Box>
            <Box className={"hover-line"}>
              <NavLink to="/products" activeClassName={"underline"}>
                Products
              </NavLink>
            </Box>
            {authMember ? (
              <Box className={"hover-line"}>
                <NavLink to="/orders" activeClassName={"underline"}>
                  Orders
                </NavLink>
              </Box>
            ) : null}
            {authMember ? (
              <Box className={"hover-line"}>
                <NavLink to="/member-page" activeClassName={"underline"}>
                  My Page
                </NavLink>
              </Box>
            ) : null}
            <Box className={"hover-line"}>
              <NavLink to="/help" activeClassName={"underline"}>
                Help
              </NavLink>
            </Box>

            <Basket />

            {!authMember ? (
              <Box>
                <Button variant="contained" className="login-button">
                  Login
                </Button>
              </Box>
            ) : (
              <img
                className="user-avatar"
                src={"/icons/default-user.svg"}
                aria-haspopup={"true"}
              />
            )}
          </Stack>
        </Stack>
        <Stack className={"header-frame"}>
          <Stack className={"detail"}>
            <Box className={"head-main-txt"}>
              World's Most Delicious Cuisine
            </Box>
            <Box className={"wel-txt"}>The Choice, not just a choice</Box>
            <Box className={"service-txt"}>{count} hours service</Box>
            <Box className={"signup"}>
              {!authMember ? (
                <Button
                  variant={"contained"}
                  className={"signup-button"}
                  onClick={buttonHandler}
                >
                  SIGN UP
                </Button>
              ) : null}
            </Box>
          </Stack>
          <Box className={"logo-frame"}>
            <div className={"logo-img"}></div>
          </Box>
        </Stack>
      </Container>
    </div>
  );
}
