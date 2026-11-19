# Burak React — Workflow Konspekti

Burak restorani uchun React + TypeScript frontend. Backend (Node/Express) alohida server, manzili `.env` faylida (`REACT_APP_API_URL`).

**Mundarija**
0. [Qanday o'qish kerak (o'qish tartibi)](#0-qanday-oqish-kerak)
1. [LUG'AT: state, effect, reducer, slice, selector, handler ...](#1-lugat--terminlar-oddiy-tilda)
2. [Texnologiyalar](#2-texnologiyalar)
3. [Papkalar tuzilmasi](#3-papkalar-tuzilmasi)
4. [Ilova qanday ishga tushadi](#4-ilova-qanday-ishga-tushadi)
5. [ASOSIY WORKFLOW: Backend → Redux → UI](#5-asosiy-workflow-backend--redux--ui)
6. [ProductsPage workflow (qidiruv, filter, pagination, bitta mahsulot)](#6-productspage-workflow)
7. [Yangi sahifaga backend ulash retsepti](#7-yangi-sahifaga-backend-ulash-retsepti)
8. [Sahifalar holati](#8-sahifalar-holati)
9. [Enum'lar](#9-enumlar)
10. [Bilib qo'yish kerak bo'lgan kamchiliklar](#10-bilib-qoyish-kerak-bolgan-kamchiliklar)
11. [Qisqa xulosa](#11-qisqa-xulosa)

---

## 0. Qanday o'qish kerak

Hamma faylni birdaniga o'qishga urinmang. Quyidagi tartibda o'qing: har bir bosqich oldingisiga tayanadi.
Har bir faylning **boshidagi katta izohni** o'qing, keyin kodni izohlari bilan birga ko'ring.

### 1-bosqich — Avval terminlar (15 daqiqa)
Pastdagi **1-bo'lim (LUG'AT)** ni o'qing. `state`, `effect`, `reducer` kabi so'zlarni bilmasangiz, kodning qolgan qismi tushunarsiz bo'ladi.

### 2-bosqich — Ilova qanday ochiladi (skelet)
| # | Fayl | Nimani tushunasiz |
|---|---|---|
| 1 | [src/index.tsx](src/index.tsx) | Hamma narsa qayerdan boshlanadi, Provider/Router nima |
| 2 | [src/app/App.tsx](src/app/App.tsx) | Navbar + sahifalar + footer, URL → sahifa |
| 3 | [src/app/components/headers/HomeNavbar.tsx](src/app/components/headers/HomeNavbar.tsx) | `useState`, `useEffect` ning oddiy misoli, `NavLink` |

### 3-bosqich — Ma'lumot shakli (type va enum)
| # | Fayl | Nimani tushunasiz |
|---|---|---|
| 4 | [src/lib/enums/product_enum.ts](src/lib/enums/product_enum.ts) | Mahsulot kategoriyalari, o'lchamlari |
| 5 | [src/lib/types/product.ts](src/lib/types/product.ts) | `Product` obyekti qanday ko'rinadi |
| 6 | [src/lib/types/member.ts](src/lib/types/member.ts) | `Member` obyekti |
| 7 | [src/lib/types/screen.ts](src/lib/types/screen.ts) | Redux state'ining shakli |

### 4-bosqich — Backend bilan aloqa
| # | Fayl | Nimani tushunasiz |
|---|---|---|
| 8 | [src/lib/config.ts](src/lib/config.ts) | `serverApi` qayerdan keladi |
| 9 | [src/app/services/ProductServices.ts](src/app/services/ProductServices.ts) | `axios`, `async/await`, URL yasash |
| 10 | [src/app/services/MemberService.ts](src/app/services/MemberService.ts) | Xuddi shu g'oya, member uchun |

### 5-bosqich — Redux (eng muhim qism). Aynan shu tartibda o'qing
| # | Fayl | Nimani tushunasiz |
|---|---|---|
| 11 | [src/app/store.ts](src/app/store.ts) | Ombor (store) qanday yig'iladi |
| 12 | [src/app/screens/homePage/slice.ts](src/app/screens/homePage/slice.ts) | Redux'ga **YOZISH** |
| 13 | [src/app/screens/homePage/selector.ts](src/app/screens/homePage/selector.ts) | Redux'dan **O'QISH** |
| 14 | [src/app/screens/homePage/index.tsx](src/app/screens/homePage/index.tsx) | Backend → dispatch (yozish) |
| 15 | [src/app/screens/homePage/PopularDishes.tsx](src/app/screens/homePage/PopularDishes.tsx) | useSelector (o'qish) → ekranga chizish |

👉 Shu 5 fayldan keyin **5-bo'limdagi chizmani** qayta ko'ring. Hammasi bir-biriga ulanishi kerak.

### 6-bosqich — Murakkabroq: ProductsPage
| # | Fayl | Nimani tushunasiz |
|---|---|---|
| 16 | [src/app/screens/productsPage/index.tsx](src/app/screens/productsPage/index.tsx) | Ichki routing (`/products/:productId`) |
| 17 | [src/app/screens/productsPage/slice.ts](src/app/screens/productsPage/slice.ts) + [selector.ts](src/app/screens/productsPage/selector.ts) | HomePage bilan bir xil pattern |
| 18 | [src/app/screens/productsPage/Products.tsx](src/app/screens/productsPage/Products.tsx) | Handler'lar, `productSearch` state, `[dependency]` li useEffect |
| 19 | [src/app/screens/productsPage/ChosenProduct.tsx](src/app/screens/productsPage/ChosenProduct.tsx) | `useParams`, `null` holat, `?.` |

### 7-bosqich — Qolganlari (statik UI, istalgan tartibda)
OrdersPage, HelpPage (tablar), UserPage, Basket, Footer, Events (slider).

### 💡 Tushunish uchun amaliy maslahatlar
- **Brauzer console'ini oching** (F12). `redux-logger` har bir action'ni ko'rsatadi: `prev state` → `action` → `next state`. Products'da "Salad" tugmasini bosing va console'da nima o'zgarganini kuzating. Bu Redux'ni tushunishning eng tez yo'li.
- **O'zingiz `console.log` qo'ying**: masalan handler ichiga `console.log("bosildi", productSearch)`.
- **Bitta oqimni oxirigacha kuzating**: "Salad tugmasi bosildi → qaysi funksiya → qaysi state → qaysi effect → qaysi service → qaysi reducer → qaysi komponent qayta chizildi". Buni qog'ozga yozib chiqing.
- **Network tab** (F12 → Network): qaysi URL'ga so'rov ketganini va backend nima qaytarganini ko'rasiz.

---

## 1. LUG'AT — terminlar oddiy tilda

### 🍽️ Avval bitta o'xshatish: Redux = restoran oshxonasi

| Restoranda | Redux'da | Loyihada misol |
|---|---|---|
| **Omborxona** (hamma mahsulot bir joyda) | **store** | `store.ts` |
| Omborxonadagi **bitta javon** (masalan "ichimliklar javoni") | **slice** (state bo'lagi) | `homePage`, `productsPage` |
| Ofitsiant yozgan **buyurtma qog'ozi** ("javonga 4 ta yangi taom qo'y") | **action** | `setNewDishes(data)` |
| Qog'ozdagi **narsaning o'zi** (4 ta taom) | **payload** | `data` (backenddan kelgan massiv) |
| Ofitsiantning qog'ozni **oshxonaga topshirishi** | **dispatch** | `dispatch(setNewDishes(data))` |
| Qog'ozni o'qib, **javonni yangilaydigan oshpaz** | **reducer** | `setNewDishes: (state, action) => { state.newDishes = action.payload }` |
| Javondan **kerakli narsani olib keladigan** yordamchi | **selector** | `retrieveNewDishes` |
| Mijozning stoli (javon o'zgarsa yangi taom keltiriladi) | **komponent + useSelector** | `NewDishes.tsx` |

**Bir gapda:** komponent **dispatch** orqali **action** yuboradi → **reducer** uni o'qib **store**dagi **slice**ni yangilaydi → **selector** orqali o'qiyotgan komponentlar avtomatik qayta chiziladi.

---

### React terminlari

#### **Component (komponent)**
Ekranning bir bo'lagini qaytaradigan **funksiya**. `function NewDishes() { return <div>...</div> }`.
Lego g'ishti kabi: kichiklaridan kattasini yig'asiz (`HomePage` ichida `NewDishes`, `PopularDishes` ...).

#### **JSX**
JavaScript ichida HTML'ga o'xshash yozuv: `<Box className="title">Fresh Menu</Box>`.
`{ }` ichida JS yoziladi: `{product.productName}`. JSX ichida izoh: `{/* izoh */}`.

#### **Props**
Komponentga **tashqaridan** beriladigan ma'lumot (funksiya argumenti kabi).
`<Divider width="2" height="64" bg="#E3C08D" />` → `Divider` ichida `props.width === "2"`.

#### **State (holat)**
Komponentning **xotirasi**: vaqt o'tishi bilan o'zgaradigan ma'lumot. **State o'zgarsa, React komponentni qayta chizadi (re-render).**
```ts
const [searchText, setSearchText] = useState<string>("");
//      ↑ hozirgi qiymat  ↑ o'zgartiruvchi funksiya     ↑ boshlang'ich qiymat
```
- O'qish: `searchText`
- O'zgartirish: `setSearchText("kebab")` — **to'g'ridan-to'g'ri `searchText = ...` deb yozib bo'lmaydi!**
- Ikki xil state bor:
  - **Local state** (`useState`): faqat shu komponentga kerak. Misollar: tanlangan tab, input matni.
  - **Global state** (Redux): ko'p komponentga yoki backenddan kelgan ma'lumot uchun. Misollar: mahsulotlar, foydalanuvchilar.

#### **Hook**
`use` bilan boshlanadigan maxsus React funksiyalari: `useState`, `useEffect`, `useSelector`, `useDispatch`, `useParams`, `useHistory`, `useLocation`.
Qoida: faqat komponentning **eng yuqori qismida** chaqiriladi (`if` yoki loop ichida emas).

#### **Effect (useEffect)**
"Chizib bo'lgandan **keyin** bajariladigan ish". Asosan **backenddan ma'lumot olish** uchun ishlatiladi.
```ts
useEffect(() => {
  // shu yerdagi kod ishlaydi
  return () => { /* cleanup: komponent o'chganda */ };
}, [dependency]);
```
**Dependency massivi** (`[...]`) qachon ishlashini belgilaydi:

| Yozilishi | Qachon ishlaydi | Loyihada |
|---|---|---|
| `[]` | Faqat **1 marta**, birinchi chizishdan keyin | HomePage, ChosenProduct (data yuklash) |
| `[productSearch]` | Birinchi marta **va** `productSearch` har o'zgarganda | Products.tsx (filtr o'zgarsa qayta yuklash) |
| `[searchText]` | `searchText` o'zgarganda | Products.tsx (qidiruv tozalanganda) |
| massivsiz | **Har** render'dan keyin (kamdan-kam kerak) | — |

#### **Handler**
Foydalanuvchi **harakatiga javob beradigan** oddiy funksiya (click, yozish, Enter bosish).
Nomlash odati: `...Handler` (masalan `searchOrderHandler`, `paginationHandler`, `chooseDishHandler`).
```tsx
const chooseDishHandler = (id: string) => { history.push(`/products/${id}`); };
<Stack onClick={() => chooseDishHandler(product._id)}>
```
⚠️ `onClick={chooseDishHandler(id)}` — **XATO**: render paytida darhol chaqirib yuboradi. To'g'risi `onClick={() => chooseDishHandler(id)}`.

#### **Render / Re-render**
React komponent funksiyasini chaqirib, ekranni chizishi. State yoki props o'zgarsa → **re-render** (qayta chizish).

#### **Conditional rendering (shartli chizish)**
```tsx
{products.length !== 0 ? <kartalar/> : <Box>Products are not available!</Box>}
{authMember ? <Link>Orders</Link> : null}
```

#### **`.map()` va `key`**
Massivdan elementlar ro'yxatini yasash. `key` — React har elementni tanib olishi uchun **noyob** qiymat (`product._id`).

#### **Controlled input**
Input qiymati state'dan keladi va har harf state'ga yoziladi: `value={searchText} onChange={(e) => setSearchText(e.target.value)}`.

---

### Redux terminlari (batafsil)

#### **Store**
Butun ilova uchun **bitta global ombor**. `store.ts` da yaratiladi, `index.tsx` da `<Provider store={store}>` orqali ulanadi. Shundan keyin istalgan komponent unga kira oladi.

#### **Slice**
Store'ning **bir sahifaga tegishli bo'lagi**. Uch narsadan iborat: **boshlang'ich state, reducer'lar va action'lar**.
`createSlice({ name, initialState, reducers })` hammasini bir yo'la yaratadi.
Loyihada: `homePage/slice.ts`, `productsPage/slice.ts`.

#### **Action**
"Nima bo'lishini" bildiradigan **oddiy obyekt**: `{ type: "homePage/setNewDishes", payload: [...] }`.
`setNewDishes(data)` funksiyasi (**action creator**) shu obyektni yasab beradi. U o'zi state'ni o'zgartirmaydi, faqat "xat" yasaydi.

#### **Payload**
Action ichidagi **ma'lumot**. `setNewDishes(data)` → `action.payload === data`.

#### **Dispatch**
Action'ni **store'ga yuborish**. `dispatch(setNewDishes(data))`.
`useDispatch()` hook'i `dispatch` funksiyasini beradi.
Loyihadagi `actionDispatch` — qisqartirish uchun yordamchi: `setNewDishes(data)` deb yozsangiz, ichida `dispatch(...)` qiladi.

#### **Reducer**
Action kelganda **state'ni qanday o'zgartirishni** biladigan funksiya: `(state, action) => { state.x = action.payload }`.
Nomi: "reduce" = "(eski state + action) → yangi state ga keltirish".
Redux Toolkit ichida **Immer** bor, shuning uchun `state.x = ...` deb to'g'ridan-to'g'ri yozish mumkin.

#### **Selector**
State'dan **kerakli bo'lakni o'qiydigan** funksiya: `state => state.homePage.newDishes`.

#### **retrieve / retriever** (bu loyihadagi nomlash odati)
- `retrieve` = inglizcha "olib kelmoq".
- **`retrieveNewDishes`** (selector.ts): state'dan `newDishes` massivini oladi.
- **`newDishesRetriever`** (komponentda): o'sha massivni `{ newDishes }` obyektiga o'raydi, shunda `const { newDishes } = useSelector(newDishesRetriever)` deb destructuring qilish mumkin.
- Ikkalasi ham selector, farqi faqat qulaylikda.

#### **createSelector (reselect) / memoization**
Selector natijasini **eslab qoladi**. Kirish ma'lumoti o'zgarmasa, qayta hisoblamaydi va komponent keraksiz qayta chizilmaydi.

#### **useSelector**
Komponentdan selector orqali Redux'ni **o'qish**. Muhim xususiyati: o'qilgan qiymat o'zgarsa, komponent **avtomatik qayta chiziladi**.

#### **Middleware / redux-logger**
Har bir dispatch o'tadigan "nazorat punkti". `redux-logger` har bir action'ni console'ga chiqaradi (debug uchun).

---

### Backend / JS terminlari

| Termin | Ma'nosi |
|---|---|
| **Service** | Backend bilan gaplashadigan klass (`ProductService`). Komponent URL yoki axios'ni bilmaydi, faqat `getProducts()` ni chaqiradi |
| **axios** | HTTP so'rov yuboruvchi kutubxona. `axios.get(url)` → javob `result.data` ichida |
| **Promise** | "Kelajakda keladigan natija". `.then(data => ...)` = kelganda, `.catch(err => ...)` = xato bo'lganda |
| **async / await** | Promise'ni kutishning chiroyli yozuvi: `const result = await axios.get(url)` |
| **try / catch / throw** | Xatoni ushlash. `throw err` xatoni chaqirgan joyga uzatadi |
| **withCredentials** | So'rov bilan birga cookie'larni ham yuborish (login holati uchun) |
| **interface** | TypeScript: obyekt shakli (`Product` da qaysi maydonlar bor) |
| **enum** | Ruxsat etilgan qiymatlar ro'yxati (`ProductCollection.DISH`) |
| **`?` (type'da)** | Maydon ixtiyoriy: `productDesc?: string` |
| **`X \| null`** | Yoki X, yoki null (hali yuklanmagan) |
| **`?.` (optional chaining)** | `chosenProduct?.productName`: null bo'lsa xato bermaydi, `undefined` qaytaradi |
| **`...` (spread)** | Obyektdan nusxa: `{ ...productSearch }` → **yangi** obyekt (React o'zgarishni sezishi uchun) |
| **Destructuring** | `const { products } = obj` → `obj.products` ni `products` o'zgaruvchiga olish |

### Router terminlari

| Termin | Ma'nosi | Qayerda |
|---|---|---|
| `Switch` / `Route` | URL'ga qarab qaysi komponentni ko'rsatish | App.tsx, productsPage/index.tsx |
| `NavLink` / `Link` | Sahifani qayta yuklamasdan boshqa URL'ga o'tish linki | Navbar, Footer |
| `useLocation` | Hozirgi URL | App.tsx |
| `useHistory` | Kod orqali o'tish: `history.push("/products/123")` | Products.tsx |
| `useParams` | URL'dagi o'zgaruvchi: `/products/:productId` → `{ productId }` | ChosenProduct.tsx |
| `useRouteMatch` | Hozirgi route'ning path'i (ichki routing uchun) | productsPage/index.tsx |

---

## 2. Texnologiyalar

| Kutubxona | Vazifasi |
|---|---|
| **React 18 + TypeScript** | UI komponentlar, type xavfsizligi |
| **react-router-dom v5** | URL bo'yicha sahifa almashtirish |
| **Redux Toolkit + react-redux** | Global state |
| **reselect** | `createSelector` — memoize qilingan o'qish |
| **redux-logger** | Action/state o'zgarishlarini console'da ko'rsatish |
| **axios** | Backendga HTTP so'rovlar |
| **MUI (material, joy, lab, icons)** | Tayyor UI komponentlar |
| **styled-components** | JS ichida CSS (Footer, Divider) |
| **swiper** | Slider (Events, ChosenProduct) |

---

## 3. Papkalar tuzilmasi

```
public/               <- statik fayllar: "/icons/burak.svg", "/img/...", "/video/..."
.env                  <- REACT_APP_API_URL (backend manzili)

src/
  index.tsx           <- KIRISH NUQTASI
  css/                <- har sahifaning CSS fayli
  app/
    App.tsx           <- Navbar + Switch(sahifalar) + Footer
    store.ts          <- Redux store
    hooks.ts          <- typed useAppDispatch / useAppSelector
    MaterialTheme/    <- MUI ranglar, shriftlar
    components/       <- QAYTA ISHLATILADIGAN qismlar (headers, footer, divider)
    screens/          <- SAHIFALAR
      homePage/       <- index.tsx + bo'limlar + slice.ts + selector.ts
      productsPage/   <- index.tsx + Products + ChosenProduct + slice.ts + selector.ts
      ordersPage/     <- 3 tab
      userPage/       <- profil
      helpPage/       <- Terms / FAQ / Contact
    services/         <- BACKEND bilan aloqa
  lib/
    config.ts         <- serverApi
    types/            <- interfeyslar
    enums/            <- enum'lar
    data/             <- statik ma'lumotlar
```

**Qoida:** Redux ishlatadigan har bir sahifa papkasida `slice.ts` (yozish) + `selector.ts` (o'qish) bo'ladi.

---

## 4. Ilova qanday ishga tushadi

```
yarn start
  -> public/index.html
  -> src/index.tsx
       <Provider store>        Redux butun ilovaga ulanadi
         <ThemeProvider>       MUI ranglari
           <Router>            URL boshqaruvi
             <App/>
  -> App.tsx:
       pathname === "/" ? <HomeNavbar/> : <OtherNavbar/>
       <Switch> ... URL ga mos sahifa ... </Switch>
       <Footer/>
```

| URL | Komponent |
|---|---|
| `/` | HomePage |
| `/products` | ProductsPage → Products |
| `/products/:productId` | ProductsPage → ChosenProduct |
| `/orders` | OrdersPage |
| `/member-page` | UserPage |
| `/help` | HelpPage |

`Switch` birinchi mos kelgan `Route`ni tanlaydi, shuning uchun `"/"` **eng oxirida** turadi.

---

## 5. ASOSIY WORKFLOW: Backend → Redux → UI

```
┌──────────────────────────────────────────────────────────────────┐
│ 1. SAHIFA ochiladi (homePage/index.tsx)                          │
│    useEffect(() => {...}, [])  -> 1 marta ishlaydi               │
└──────────────┬───────────────────────────────────────────────────┘
               ▼
┌──────────────────────────────────────────────────────────────────┐
│ 2. SERVICE  new ProductService().getProducts({...})              │
│    -> axios.get(`${serverApi}/product/all?order=...`)            │
└──────────────┬───────────────────────────────────────────────────┘
               ▼   BACKEND JSON qaytaradi -> result.data
┌──────────────────────────────────────────────────────────────────┐
│ 3. DISPATCH  .then(data => setPopularDishes(data))               │
│    = dispatch({ type:"homePage/setPopularDishes", payload:data })│
└──────────────┬───────────────────────────────────────────────────┘
               ▼
┌──────────────────────────────────────────────────────────────────┐
│ 4. REDUCER (slice.ts) state'ga YOZADI                            │
│    state.homePage.popularDishes = action.payload                 │
└──────────────┬───────────────────────────────────────────────────┘
               ▼
┌──────────────────────────────────────────────────────────────────┐
│ 5. SELECTOR (selector.ts) state'dan O'QIYDI                      │
│    retrievePopularDishes = state => state.homePage.popularDishes │
└──────────────┬───────────────────────────────────────────────────┘
               ▼
┌──────────────────────────────────────────────────────────────────┐
│ 6. KOMPONENT (PopularDishes.tsx)                                 │
│    const { popularDishes } = useSelector(popularDishesRetriever) │
│    popularDishes.map(product => <Card .../>)                     │
└──────────────────────────────────────────────────────────────────┘
```

### HomePage'dagi 3 ta so'rov

| Bo'lim | Service chaqiruvi | Redux kaliti | O'qiydigan komponent |
|---|---|---|---|
| Popular Dishes | `getProducts({order:"productViews", productCollection: DISH, limit:4})` | `homePage.popularDishes` | PopularDishes |
| Fresh Menu | `getProducts({order:"createdAt", limit:4})` | `homePage.newDishes` | NewDishes |
| Active Users | `getTopUsers()` → `/member/top-users` | `homePage.topUsers` | ActiveUsers |

### Rasmlar qayerdan
- Backend mahsulotlari: `` `${serverApi}/${product.productImages[0]}` ``
- Statik rasmlar: `"/img/kebab.webp"` → `public/img/`

---

## 6. ProductsPage workflow

### 6.1 Products.tsx — ro'yxat, qidiruv, filter, pagination

HomePage'dan farqi: so'rov **bir marta emas**, foydalanuvchi har tugma bosganda qayta yuboriladi.
Buning kaliti — **bitta `productSearch` state** va **`[productSearch]` dependency'li useEffect**.

```
  "Salad" tugmasi bosildi
        ▼
  searchCollectionHandler(ProductCollection.SALAD)          <- HANDLER
        ▼
  productSearch = { ...eski, productCollection: "SALAD", page: 1 }   <- LOCAL STATE
        ▼  React: "productSearch o'zgardi!"
  useEffect(() => getProducts(productSearch), [productSearch])        <- EFFECT
        ▼
  GET /product/all?order=createdAt&page=1&limit=8&productCollection=SALAD
        ▼
  setProducts(data)  ->  state.productsPage.products = data           <- REDUX
        ▼  useSelector(productRetriever)
  products.map(...) — yangi kartalar chiziladi                        <- UI
```

| Foydalanuvchi harakati | Handler | `productSearch`da nima o'zgaradi |
|---|---|---|
| New / Price / Views tugmasi | `searchOrderHandler(order)` | `order`, `page = 1` |
| Dish / Salad / Drink ... | `searchCollectionHandler(collection)` | `productCollection`, `page = 1` |
| Search tugmasi yoki Enter | `searchProductHandler()` | `search = searchText` |
| Qidiruv maydonini tozalash | (useEffect `[searchText]`) | `search = ""` |
| Pagination raqami | `paginationHandler(e, value)` | `page = value` |
| Kartaga bosish | `chooseDishHandler(id)` | o'zgarmaydi → `/products/:id` ga o'tadi |

**Nega `searchText` va `productSearch.search` alohida?** `searchText` har harfda o'zgaradi. Agar u to'g'ridan-to'g'ri so'rovga ulanganda, har harf uchun backendga so'rov ketardi. Shuning uchun matn faqat Search yoki Enter bosilganda ko'chiriladi.

**Nega `{ ...productSearch }`?** React obyekt o'zgarganini **manzil (reference)** bo'yicha tekshiradi. Spread yangi obyekt yasaydi, shunda React o'zgarishni sezadi va effect ishlaydi.

**Tanlangan tugma rangi:** `color={productSearch.order === "createdAt" ? "primary" : "secondary"}`. Holat state'da, UI undan hisoblanadi.

### 6.2 ChosenProduct.tsx — bitta mahsulot

```
  Products'da kartaga bosish -> history.push("/products/65ab12...")
        ▼  productsPage/index.tsx: Route "/products/:productId"
  ChosenProduct ochiladi
        ▼  useParams() -> { productId: "65ab12..." }
  useEffect([], ...):
     ProductService.getProduct(productId) -> GET /product/65ab12...  -> setChosenProduct
     MemberService.getRestaurant()        -> GET /member/restaurant  -> setRestaurant
        ▼
  state.productsPage.chosenProduct / restaurant
        ▼  useSelector
  if (!chosenProduct) return null;   <- javob kelguncha hech narsa chizilmaydi
  aks holda: rasmlar slider + nom + restoran + narx
```

### 6.3 productsPage Redux state

| Kalit | Boshlang'ich | Kim yozadi | Kim o'qiydi |
|---|---|---|---|
| `products` | `[]` | Products (useEffect) | Products |
| `chosenProduct` | `null` | ChosenProduct (useEffect) | ChosenProduct |
| `restaurant` | `null` | ChosenProduct (useEffect) | ChosenProduct |

---

## 7. Yangi sahifaga backend ulash retsepti

ProductsPage aynan shu qadamlar bilan qilingan. Keyingisi (masalan OrdersPage) uchun ham shunday:

1. **Type**: `lib/types/screen.ts` ga `XxxPageState` interfeysini yozib, `AppRootState` ga qo'shing.
2. **Slice**: `screens/xxxPage/slice.ts` (`initialState`, reducer'lar, export).
3. **Store**: `store.ts` → `reducer: { ..., xxxPage: XxxPageReducer }`.
4. **Selector**: `screens/xxxPage/selector.ts` (`retrieveXxx`).
5. **Service**: kerakli metodni qo'shing (`OrderService.getMyOrders()` kabi).
6. **Komponent**: `useEffect` → service → `dispatch(setXxx(data))`; ko'rsatadigan joyda `useSelector`.

---

## 8. Sahifalar holati

| Sahifa | Holat |
|---|---|
| HomePage | ✅ Backend + Redux (Popular, New, Active Users). Statistics, Events, Ads statik |
| Products | ✅ Backend + Redux: qidiruv, saralash, kategoriya, pagination ishlaydi |
| ChosenProduct | ✅ Backend + Redux (mahsulot + restoran). "Add To Basket" hali ishlamaydi |
| OrdersPage | ⏳ Tablar ishlaydi, buyurtmalar soxta |
| UserPage / Settings | ⏳ Statik |
| HelpPage | ✅ Terms/FAQ `lib/data` dan; Contact formasi yubormaydi |
| Basket | ⏳ Statik namuna |
| Login / Auth | ❌ Yo'q (`const authMember = null`) |

---

## 9. Enum'lar

- **MemberType**: `USER`, `RESTAURANT`
- **MemberStatus**: `ACTIVE`, `BLOCK`, `DELETE`
- **ProductCollection**: `DISH`, `SALAD`, `DESSERT`, `DRINK`, `OTHER` (Products'dagi kategoriya tugmalari)
- **ProductSize**: `SMALL`, `NORMAL`, `LARGE`, `SET` (ovqatlar uchun)
- **ProductVolume**: `0.5 / 1 / 1.2 / 1.5 / 2` L (ichimliklar uchun; `DRINK` bo'lsa "litr" ko'rsatiladi)
- **OrderStatus**: `PAUSE` → `PROCESS` → `FINISH` (yoki `DELETE`); OrdersPage tablari shunga mos

---

## 10. Bilib qo'yish kerak bo'lgan kamchiliklar

Ular hozir ishlashga xalaqit bermaydi, faqat tushunib turish uchun. Kod izohlarida ham belgilangan.

1. **ChosenProduct `useEffect(..., [])`**: bir mahsulot sahifasidan to'g'ridan-to'g'ri boshqasiga o'tilsa, yangi mahsulot yuklanmasligi mumkin. Tuzatish: dependency'ni `[productId]` qilish.
2. **Products: sahifa ochilganda `getProducts` 2 marta chaqiriladi.** Sababi: `[searchText]` effect boshida ham ishlab, `productSearch`ni yangilaydi.
3. **`productSearch.page = 1` (to'g'ridan-to'g'ri o'zgartirish)**: ishlaydi, chunki keyin spread qilinadi, lekin React'da tavsiya etilmaydi. Toza yozuvi: `setProductSearch({ ...productSearch, page: 1 })`.
4. **productsPage/selector.ts** dagi `import ProductsPage from "."` ishlatilmaydi va aylana import hosil qiladi. O'chirsa bo'ladi.
5. **Products.tsx** dagi `const [page, setPage] = useState(1)` endi ishlatilmaydi (o'rniga `productSearch.page`).

---

## 11. Qisqa xulosa

1. **index.tsx** hamma narsani o'raydi (Redux, Theme, Router).
2. **App.tsx** = Navbar + Switch + Footer.
3. Foydalanuvchi bosadi → **handler** → **local state** o'zgaradi.
4. State o'zgarishi → **useEffect** ishlaydi → **service** chaqiriladi.
5. **Service** `axios` bilan **backend**ga boradi.
6. Javob → **dispatch(action)** → **reducer** → **store/slice** yangilanadi.
7. **Selector + useSelector** orqali komponent o'qiydi → **re-render** → ekran yangilanadi.
