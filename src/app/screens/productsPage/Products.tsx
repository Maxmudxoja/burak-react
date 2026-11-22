/**
 * ============================================================
 *  Products.tsx — MAHSULOTLAR RO'YXATI (/products)
 * ============================================================
 * Bo'limlar: sarlavha + qidiruv, saralash (New/Price/Views), kategoriyalar
 * (Dish/Salad/...), mahsulot kartalari, pagination, "Family Brands", xarita.
 *
 * BACKENDGA ULANGAN. Asosiy g'oya — HAMMA NARSA BITTA `productSearch` STATE ORQALI:
 *
 *   Foydalanuvchi tugma bosadi (Dish / Price / 2-sahifa / Search)
 *        ▼  HANDLER
 *   productSearch o'zgaradi  { page, limit, order, productCollection, search }
 *        ▼  useEffect([productSearch]) — productSearch o'zgarganini "sezadi"
 *   ProductService.getProducts(productSearch)  ──►  BACKEND
 *        ▼
 *   dispatch(setProducts(data))  ->  state.productsPage.products
 *        ▼  useSelector
 *   products.map(...) -> kartalar qayta chiziladi
 *
 * Ya'ni handler'lar backendga O'ZI bormaydi — faqat productSearch'ni o'zgartiradi,
 * qolganini useEffect qiladi.
 */
import React, { ChangeEvent, useEffect, useState } from "react";
import { Box, Button, Container, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Badge from "@mui/material/Badge";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setProducts } from "./slice";
import { createSelector } from "reselect";
import { Product, ProductInquiry } from "../../../lib/types/product";
import { retrieveProduct } from "./selector";
import ProductService from "../../services/ProductServices";
import { ProductCollection } from "../../../lib/enums/product_enum";
import { serverApi } from "../../../lib/config";
import { useHistory } from "react-router-dom";
import { CartItem } from "../../../lib/types/search";

/** REDUX SLICE & SELECTOR **/
// YOZISH uchun: setProducts(data) -> dispatch(setProducts(data)) -> state.productsPage.products
const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Product[]) => dispatch(setProducts(data)),
});

// O'QISH uchun: state.productsPage.products ni { products } ko'rinishida beradi
const productRetriever = createSelector(retrieveProduct, (products) => ({
  products,
}));

interface ProductsProps {
  onAdd: (item: CartItem) => void;
}

export default function Products(props: ProductsProps) {
  const { onAdd } = props;
  // ESKI qoldiq: endi sahifa raqami productSearch.page da saqlanadi, bu state ishlatilmaydi.
  const [page, setPage] = useState<number>(1);

  const { setProducts } = actionDispatch(useDispatch());

  // Redux'dagi mahsulotlar ro'yxati (o'zgarsa — komponent qayta render bo'ladi)
  const { products } = useSelector(productRetriever);

  // ENG MUHIM STATE: backendga qanday so'rov yuborishni belgilaydi.
  // Boshlang'ich holat: 1-sahifa, 8 ta, eng yangilari, faqat DISH, qidiruvsiz.
  const [productSearch, setProductSearch] = useState<ProductInquiry>({
    page: 1,
    limit: 8,
    order: "createdAt",
    productCollection: ProductCollection.DISH,
    search: "",
  });

  // Input'ga yozilayotgan matn. Har harfda o'zgaradi, LEKIN backendga darhol bormaydi —
  // faqat Search/Enter bosilganda productSearch.search ga ko'chiriladi.
  const [searchText, setSearchText] = useState<string>("");
  // history — kod orqali boshqa sahifaga o'tish uchun (history.push("/url"))
  const history = useHistory();

  // EFFECT 1: productSearch har o'zgarganda backenddan mahsulotlarni qayta oladi.
  // [productSearch] — "dependency": shu qiymat o'zgarsa effect qayta ishlaydi.
  useEffect(() => {
    const product = new ProductService();
    product
      .getProducts(productSearch)
      .then((data) => setProducts(data)) // -> Redux
      .catch((err) => console.log(err));
  }, [productSearch]);

  // EFFECT 2: foydalanuvchi qidiruv maydonini TOZALASA (searchText === ""),
  // qidiruv filtri ham olib tashlanadi va to'liq ro'yxat qaytadi.
  // Eslatma: bu effect sahifa ochilganda ham 1 marta ishlaydi (searchText boshida ""),
  // shuning uchun sahifa ochilganda getProducts 2 marta chaqiriladi (zarari yo'q, lekin bilib qo'ying).
  useEffect(() => {
    if (searchText === "") {
      productSearch.search = "";
      setProductSearch({ ...productSearch });
    }
  }, [searchText]);

  /** HANDLERS */
  // Handler = foydalanuvchi harakatiga (click, Enter, sahifa tanlash) javob beruvchi funksiya.
  // Hammasi bir xil ishlaydi: productSearch ni o'zgartiradi -> EFFECT 1 backendga boradi.
  //
  // Nega `{ ...productSearch }`? React state o'zgarganini OBYEKT MANZILI (reference) o'zgarganidan biladi.
  // `...` (spread) bilan YANGI obyekt yasaymiz, shunda React "o'zgardi" deb qayta render qiladi
  // va useEffect([productSearch]) ishga tushadi. Bir xil obyektni bersak — hech narsa bo'lmaydi.
  // (Toza variant: setProductSearch({ ...productSearch, page: 1 }) — eski obyektni o'zgartirmasdan.)

  // Kategoriya tugmasi (Dish/Salad/...) — kategoriyani almashtiradi va 1-sahifaga qaytaradi
  const searchCollectionHandler = (collection: ProductCollection) => {
    productSearch.page = 1;
    productSearch.productCollection = collection;
    setProductSearch({ ...productSearch });
  };

  // Saralash tugmasi (New/Price/Views) — order maydonini almashtiradi va 1-sahifaga qaytaradi
  const searchOrderHandler = (order: string) => {
    productSearch.page = 1;
    productSearch.order = order;
    setProductSearch({ ...productSearch });
  };

  // Search tugmasi yoki Enter — input'dagi matnni so'rovga qo'shadi
  const searchProductHandler = () => {
    productSearch.search = searchText;
    setProductSearch({ ...productSearch });
  };

  // Pagination — tanlangan sahifa raqamini (value) so'rovga yozadi
  const paginationHandler = (e: ChangeEvent<any>, value: number) => {
    productSearch.page = value;
    setProductSearch({ ...productSearch });
  };

  // Kartaga bosilganda — o'sha mahsulot sahifasiga o'tadi: /products/<id>
  // productsPage/index.tsx dagi ":productId" route'i ChosenProduct'ni ochadi.
  const chooseDishHandler = (id: string) => {
    history.push(`/products/${id}`);
  };

  return (
    <div className={"products"}>
      <Container>
        <Stack flexDirection={"column"} alignItems={"center"}>
          {/* TITLE + SEARCH */}
          <Stack className={"avatar-big-box"}>
            <Box className={"top-title"}>Burak Restaurant</Box>
            <Stack className={"single-search"}>
              <input
                type={"search"}
                className={"single-search-input"}
                name={"singleResearch"}
                placeholder={"Type here"}
                // "Controlled input": qiymat state'dan keladi, har harf state'ga yoziladi
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") searchProductHandler();
                }}
              />
              <Button
                className={"single-button-search"}
                variant={"contained"}
                endIcon={<SearchIcon />}
                onClick={searchProductHandler}
              >
                Search
              </Button>
            </Stack>
          </Stack>

          {/* SORT FILTERS — tanlangan tugma "primary" (to'q), qolganlari "secondary" (oltin) rangda */}
          <Stack className={"dishes-filter-section"}>
            <Stack className={"dishes-filter-box"}>
              <Button
                variant={"contained"}
                color={
                  productSearch.order === "createdAt" ? "primary" : "secondary"
                }
                className={"order"}
                onClick={() => searchOrderHandler("createdAt")}
              >
                New
              </Button>
              <Button
                variant={"contained"}
                color={
                  productSearch.order === "productPrice"
                    ? "primary"
                    : "secondary"
                }
                className={"order"}
                onClick={() => searchOrderHandler("productPrice")}
              >
                Price
              </Button>
              <Button
                variant={"contained"}
                color={
                  productSearch.order === "productViews"
                    ? "primary"
                    : "secondary"
                }
                className={"order"}
                onClick={() => searchOrderHandler("productViews")}
              >
                Views
              </Button>
            </Stack>
          </Stack>

          {/* CATEGORIES + PRODUCTS */}
          <Stack className={"list-category-section"}>
            <Stack className={"product-category"}>
              <Button
                variant={"contained"}
                color={
                  productSearch.productCollection === ProductCollection.DISH
                    ? "primary"
                    : "secondary"
                }
                onClick={() => searchCollectionHandler(ProductCollection.DISH)}
              >
                Dish
              </Button>
              <Button
                variant={"contained"}
                color={
                  productSearch.productCollection === ProductCollection.SALAD
                    ? "primary"
                    : "secondary"
                }
                onClick={() => searchCollectionHandler(ProductCollection.SALAD)}
              >
                Salad
              </Button>
              <Button
                variant={"contained"}
                color={
                  productSearch.productCollection === ProductCollection.DRINK
                    ? "primary"
                    : "secondary"
                }
                onClick={() => searchCollectionHandler(ProductCollection.DRINK)}
              >
                Drink
              </Button>
              <Button
                variant={"contained"}
                color={
                  productSearch.productCollection === ProductCollection.DESSERT
                    ? "primary"
                    : "secondary"
                }
                onClick={() =>
                  searchCollectionHandler(ProductCollection.DESSERT)
                }
              >
                Desert
              </Button>
              <Button
                variant={"contained"}
                color={
                  productSearch.productCollection === ProductCollection.OTHER
                    ? "primary"
                    : "secondary"
                }
                onClick={() => searchCollectionHandler(ProductCollection.OTHER)}
              >
                Other
              </Button>
            </Stack>

            <Stack className={"product-wrapper"}>
              {products.length !== 0 ? (
                products.map((product: Product) => {
                  const imagePath = `${serverApi}/${product.productImages[0]}`;
                  const sizeVolume =
                    product.productCollection === ProductCollection.DRINK
                      ? product.productVolume + " litr"
                      : product.productSize + " size";
                  return (
                    <Stack
                      key={product._id}
                      className={"product-card"}
                      onClick={() => chooseDishHandler(product._id)}
                    >
                      <Stack
                        className={"product-img"}
                        sx={{ backgroundImage: `url(${imagePath})` }}
                      >
                        <div className={"product-sale"}> {sizeVolume}</div>
                        <Button
                          className={"shop-btn"}
                          onClick={(e) => {
                            onAdd({
                              _id: product._id,
                              quantity: 1,
                              name: product.productName,
                              price: product.productPrice,
                              image: product.productImages[0],
                            });
                            e.stopPropagation();
                          }}
                        >
                          <img src={"/icons/shopping-cart.svg"} alt={"cart"} />
                        </Button>
                        <Button className={"view-btn"}>
                          <Badge
                            badgeContent={product.productViews}
                            color={"secondary"}
                          >
                            <RemoveRedEyeIcon
                              sx={{
                                color:
                                  product.productViews === 0 ? "gray" : "white",
                              }}
                            />
                          </Badge>
                        </Button>
                      </Stack>
                      <Box className={"product-desc"}>
                        <span className={"product-title"}>
                          {product.productName}
                        </span>
                        <div className={"product-price"}>
                          <MonetizationOnIcon />
                          {product.productPrice}
                        </div>
                      </Box>
                    </Stack>
                  );
                })
              ) : (
                <Box className={"no-data"}>Products are not available!</Box>
              )}
            </Stack>
          </Stack>

          {/* PAGINATION
              Backend jami mahsulot sonini qaytarmaydi, shuning uchun "hiyla":
              shu sahifada mahsulot bo'lsa — yana 1 ta sahifa bor deb ko'rsatamiz (page + 1),
              bo'sh bo'lsa — oxirgi sahifa shu. */}
          <Stack className={"pagination-section"}>
            <Pagination
              count={
                products.length !== 0
                  ? productSearch.page + 1
                  : productSearch.page
              }
              page={productSearch.page}
              renderItem={(item) => (
                <PaginationItem
                  components={{
                    previous: ArrowBackIcon,
                    next: ArrowForwardIcon,
                  }}
                  {...item}
                  color={"secondary"}
                />
              )}
              onChange={paginationHandler}
            />
          </Stack>
        </Stack>
      </Container>

      {/* ADDRESS */}
      <div className={"address"}>
        <Container>
          <Stack className={"address-area"}>
            <Box className={"title"}>Our address</Box>
            <iframe
              title={"Burak restaurant location"}
              className={"address-map"}
              src={
                "https://maps.google.com/maps?q=CZN%20Burak%20Gurme%20Dubai&t=&z=14&ie=UTF8&iwloc=&output=embed"
              }
              loading={"lazy"}
              referrerPolicy={"no-referrer-when-downgrade"}
            ></iframe>
          </Stack>
        </Container>
      </div>
    </div>
  );
}
