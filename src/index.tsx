/**
 * ============================================================
 *  index.tsx — ILOVANING KIRISH NUQTASI (ENTRY POINT)
 * ============================================================
 * Brauzer public/index.html ni ochadi -> unda <div id="root"> bor.
 * Bu fayl o'sha div ichiga butun React ilovani "o'rnatadi" (mount).
 *
 * O'rash tartibi (tashqaridan ichkariga) — har biri ichidagilarga xizmat beradi:
 *   StrictMode     -> dev rejimda xatolarni oldindan ko'rsatadi
 *   Provider       -> Redux store'ni BUTUN ilovaga ulaydi (useSelector/useDispatch ishlashi uchun)
 *   ThemeProvider  -> MUI rang/shrift (theme) ni barcha MUI komponentlarga beradi
 *   CssBaseline    -> brauzerlar orasidagi default CSS farqlarini tozalaydi
 *   Router         -> URL bo'yicha sahifa almashtirish (react-router) imkonini beradi
 *   App            -> bizning asosiy komponentimiz (navbar + sahifalar + footer)
 */
import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./app/App";
import reportWebVitals from "./reportWebVitals";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./app/MaterialTheme";
import "./css/index.css"; // global CSS (butun sayt uchun)
import { BrowserRouter as Router } from "react-router-dom";
import ContextProvider from "./app/context/ContextProvider";

// index.html dagi <div id="root"> ni topamiz. "!" — TypeScript'ga "bu null emas" deymiz.
const container = document.getElementById("root")!;
// React 18 usuli: root yaratib, unga render qilamiz.
const root = createRoot(container);

root.render(
  <React.StrictMode>
    {/* Redux store — global state shu yerdan butun ilovaga tarqaladi */}
    <Provider store={store}>
      <ContextProvider>
        {/* MUI theme — MaterialTheme/index.ts dagi ranglar */}
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {/* Router — App ichida useLocation, Route, NavLink ishlashi uchun shart */}
          <Router>
            <App />
          </Router>
        </ThemeProvider>
      </ContextProvider>
    </Provider>
  </React.StrictMode>,
);

// Performance o'lchash (CRA default). Hozircha hech narsa qilmaydi.
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
