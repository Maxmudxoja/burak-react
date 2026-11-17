# Burak React — Workflow Konspekti

Burak restorani uchun React + TypeScript frontend. Backend (Node/Express) alohida server, manzili `.env` faylida (`REACT_APP_API_URL`).

---

## 1. Texnologiyalar (nima uchun kerak)

| Kutubxona | Vazifasi |
|---|---|
| **React 18 + TypeScript** | UI komponentlar, type xavfsizligi |
| **react-router-dom v5** | URL bo'yicha sahifa almashtirish (`Switch`, `Route`, `NavLink`) |
| **Redux Toolkit + react-redux** | Global state (backenddan kelgan ma'lumotlarni saqlash) |
| **reselect** | `createSelector` — state'dan memoize qilib o'qish |
| **redux-logger** | Har bir action/state o'zgarishini console'da ko'rsatadi |
| **axios** | Backendga HTTP so'rovlar |
| **MUI (material, joy, lab, icons)** | Tayyor UI komponentlar (Button, Card, Tabs, Menu ...) |
| **styled-components** | JS ichida CSS (Footer, Divider) |
| **swiper** | Slider/karusel (Events, ChosenProduct) |

---

## 2. Papkalar tuzilmasi

```
public/
  index.html          <- <div id="root"> shu yerda; React shu divga o'rnatiladi
  icons/, img/, video/ <- statik fayllar, URL'dan to'g'ridan-to'g'ri: "/icons/burak.svg"
.env                  <- REACT_APP_API_URL (backend manzili)

src/
  index.tsx           <- KIRISH NUQTASI: Provider(store) + Theme + Router + <App/>
  css/                <- har sahifaning CSS fayli
  app/
    App.tsx           <- Navbar + Switch(sahifalar) + Footer
    store.ts          <- Redux store (reducer'lar shu yerda ulanadi)
    hooks.ts          <- typed useAppDispatch / useAppSelector
    MaterialTheme/    <- MUI ranglar, shriftlar, soyalar
    components/       <- QAYTA ISHLATILADIGAN qismlar (headers, footer, divider)
    screens/          <- SAHIFALAR (har biri o'z papkasida)
      homePage/       <- index.tsx + bo'limlar + slice.ts + selector.ts
      productsPage/   <- Products (ro'yxat) + ChosenProduct (bitta mahsulot)
      ordersPage/     <- 3 ta tab: Paused / Process / Finished
      userPage/       <- profil + Settings formasi
      helpPage/       <- Terms / FAQ / Contact
    services/         <- BACKEND bilan aloqa (axios): ProductService, MemberService
  lib/
    config.ts         <- serverApi + umumiy xabarlar
    types/            <- TypeScript interfeyslar (Member, Product, Redux state)
    enums/            <- MemberType, ProductCollection, OrderStatus ...
    data/             <- statik ma'lumotlar (faq, plans, terms)
```

**Qoida:** `components/` = ko'p joyda ishlatiladigan; `screens/` = bitta sahifaga tegishli.

---

## 3. Ilova qanday ishga tushadi

```
yarn start
  -> public/index.html ochiladi
  -> src/index.tsx ishlaydi
       <Provider store>        Redux butun ilovaga ulanadi
         <ThemeProvider>       MUI ranglari
           <Router>            URL boshqaruvi
             <App/>
  -> App.tsx:
       pathname === "/" ? <HomeNavbar/> : <OtherNavbar/>
       <Switch> ... URL ga mos sahifa ... </Switch>
       <Footer/>
```

### Routing jadvali

| URL | Komponent |
|---|---|
| `/` | HomePage |
| `/products` | ProductsPage -> Products |
| `/products/:productId` | ProductsPage -> ChosenProduct |
| `/orders` | OrdersPage |
| `/member-page` | UserPage |
| `/help` | HelpPage |

`Switch` birinchi mos kelgan `Route`ni tanlaydi, shuning uchun `"/"` **eng oxirida** turadi.

---

## 4. ASOSIY WORKFLOW: Backend -> Redux -> UI

Bu loyihaning eng muhim qismi. Hozir to'liq faqat **HomePage** da ishlaydi.

```
┌──────────────────────────────────────────────────────────────────┐
│ 1. HomePage (homePage/index.tsx) ochiladi                        │
│    useEffect(() => {...}, [])  -> faqat 1 marta ishlaydi         │
└──────────────┬───────────────────────────────────────────────────┘
               ▼
┌──────────────────────────────────────────────────────────────────┐
│ 2. SERVICE (services/ProductServices.ts, MemberService.ts)       │
│    new ProductService().getProducts({page, limit, order, ...})   │
│    -> axios.get(`${serverApi}/product/all?order=...`)            │
└──────────────┬───────────────────────────────────────────────────┘
               ▼   BACKEND JSON qaytaradi -> result.data
┌──────────────────────────────────────────────────────────────────┐
│ 3. DISPATCH  .then(data => setPopularDishes(data))               │
│    actionDispatch() yordamchi funksiyasi orqali                  │
└──────────────┬───────────────────────────────────────────────────┘
               ▼
┌──────────────────────────────────────────────────────────────────┐
│ 4. SLICE (homePage/slice.ts) — reducer state'ga YOZADI           │
│    state.homePage.popularDishes = action.payload                 │
└──────────────┬───────────────────────────────────────────────────┘
               ▼
┌──────────────────────────────────────────────────────────────────┐
│ 5. SELECTOR (homePage/selector.ts) — state'dan O'QIYDI           │
│    retrievePopularDishes = state => state.homePage.popularDishes │
└──────────────┬───────────────────────────────────────────────────┘
               ▼
┌──────────────────────────────────────────────────────────────────┐
│ 6. KOMPONENT (PopularDishes.tsx)                                 │
│    const { popularDishes } = useSelector(popularDishesRetriever) │
│    popularDishes.map(product => <Card .../>)                     │
│    State o'zgarganda avtomatik qayta render bo'ladi              │
└──────────────────────────────────────────────────────────────────┘
```

### HomePage'dagi 3 ta so'rov

| Bo'lim | Service chaqiruvi | Redux kaliti | O'qiydigan komponent |
|---|---|---|---|
| Popular Dishes | `getProducts({order:"productViews", productCollection: DISH, limit:4})` | `popularDishes` | PopularDishes |
| Fresh Menu | `getProducts({order:"createdAt", limit:4})` | `newDishes` | NewDishes |
| Active Users | `getTopUsers()` -> `/member/top-users` | `topUsers` | ActiveUsers |

### Nega aynan shunday (props o'rniga Redux)?
- HomePage ma'lumotni **bir marta** oladi, bolalar Redux'dan o'zi o'qiydi — props zanjiri kerak emas.
- Boshqa sahifa ham shu ma'lumotni ishlatsa, qayta yuklash shart emas.
- `redux-logger` tufayli har bir o'zgarishni console'da ko'rasiz (debug oson).

### Rasmlar qayerdan
- Backend mahsulotlari: `` `${serverApi}/${product.productImages[0]}` `` (serverdagi upload papkasi)
- Statik rasmlar: `"/img/kebab.webp"` -> `public/img/` papkasidan

---

## 5. Yangi sahifaga backend ulash RETSEPTI (masalan ProductsPage)

HomePage'dagi patternni takrorlaysiz:

1. **Type** — `lib/types/screen.ts`:
   `export interface ProductsPageState { products: Product[]; ... }` va `AppRootState` ga qo'shish.
2. **Slice** — `screens/productsPage/slice.ts`: `initialState`, `setProducts` reducer, action va reducer export.
3. **Store** — `store.ts` dagi `reducer: { homePage, productsPage: ProductsPageReducer }`.
4. **Selector** — `screens/productsPage/selector.ts`: `retrieveProducts`.
5. **Service** — kerak bo'lsa `ProductService` ga yangi metod (masalan `getProduct(id)`).
6. **Komponent** — `useEffect` ichida service chaqirish -> `dispatch(setProducts(data))`;
   ko'rsatuvchi komponentda `useSelector(...)`.

---

## 6. Sahifalar holati (hozir)

| Sahifa | Holat |
|---|---|
| HomePage | ✅ Backend + Redux ulangan (Popular, New, Active Users). Statistics/Events/Ads — statik |
| ProductsPage | ⏳ UI tayyor, ma'lumot statik massivdan (`products`, `brands`) |
| ChosenProduct | ⏳ Statik ("Kebab", $12) |
| OrdersPage | ⏳ Tablar ishlaydi, buyurtmalar soxta (`[1,2].map`) |
| UserPage / Settings | ⏳ Statik ("Martin"), input'lar tahrirlanmaydi (onChange yo'q) |
| HelpPage | ✅ Terms/FAQ `lib/data` dan; Contact formasi hech qayerga yubormaydi |
| Basket | ⏳ Statik namuna |
| Login / Auth | ❌ Yo'q — hamma joyda `const authMember = null` |

---

## 7. Muhim React tushunchalari (loyihada qayerda)

| Tushuncha | Qayerda | Mazmuni |
|---|---|---|
| `useState` | OrdersPage, HelpPage (tab), Basket (menyu), Products (page) | Komponent ichki holati |
| `useEffect(fn, [])` | HomePage | Faqat birinchi render'da — backenddan data olish |
| `useEffect(fn, [value])` | HomeNavbar | `value` o'zgarganda qayta ishlaydi; `return` = cleanup |
| Class component | screens/Test.tsx | Eski uslub: `this.state`, `componentDidMount` |
| `useLocation` | App.tsx | Hozirgi URL -> qaysi navbar |
| `useRouteMatch` | productsPage/index.tsx | Nested route uchun bazaviy path |
| `useSelector` / `useDispatch` | homePage | Redux'dan o'qish / yozish |
| `createSelector` | selector.ts + komponentlar | Memoize qilingan o'qish |
| Conditional render | `authMember ? ... : null`, `list.length !== 0 ? map : "no data"` | Shartga qarab ko'rsatish |
| `.map()` + `key` | barcha ro'yxatlar | Massivdan elementlar; `key` React uchun majburiy |

---

## 8. Enum'lar (lib/enums)

- **MemberType**: `USER`, `RESTAURANT`
- **MemberStatus**: `ACTIVE`, `BLOCK`, `DELETE`
- **ProductCollection**: `DISH`, `SALAD`, `DESSERT`, `DRINK`, `OTHER`
- **ProductSize**: `SMALL`, `NORMAL`, `LARGE`, `SET` (ovqatlar uchun)
- **ProductVolume**: `0.5 / 1 / 1.2 / 1.5 / 2` L (ichimliklar uchun — NewDishes'da `DRINK` bo'lsa "L" ko'rsatiladi)
- **OrderStatus**: `PAUSE` -> `PROCESS` -> `FINISH` (yoki `DELETE`) — OrdersPage tablari shunga mos

---

## 9. Qisqa xulosa (yodlab olish uchun)

1. **index.tsx** — hamma narsani o'raydi (Redux, Theme, Router).
2. **App.tsx** — Navbar + Switch + Footer.
3. **Sahifa** `useEffect` da **Service** ni chaqiradi.
4. **Service** `axios` bilan **Backend** ga boradi.
5. Javob `dispatch` orqali **Slice** ga yoziladi.
6. **Selector** + `useSelector` bilan **komponent** o'qiydi va chizadi.
