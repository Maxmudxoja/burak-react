/**
 * ============================================================
 *  Products.tsx — MAHSULOTLAR RO'YXATI (/products)
 * ============================================================
 * Bo'limlar: sarlavha + qidiruv, saralash (New/Price/Views), kategoriyalar
 * (Dish/Salad/...), mahsulot kartalari, pagination, "Family Brands", xarita.
 *
 * HOZIRCHA STATIK: `products` va `brands` massivlari shu faylda qo'lda yozilgan.
 * Keyingi qadam (HomePage kabi): ProductService.getProducts() -> Redux slice -> useSelector.
 * Qidiruv, saralash va kategoriya tugmalari hali hech narsa qilmaydi.
 */
import React, { useEffect, useState } from "react";
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
import { Product } from "../../../lib/types/product";
import { retrieveProduct } from "./selector";
import ProductService from "../../services/ProductServices";
import { ProductCollection } from "../../../lib/enums/product_enum";
import { serverApi } from "../../../lib/config";

/** REDUX SLICE & SELECTOR **/
const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Product[]) => dispatch(setProducts(data)),
});

const productRetriever = createSelector(retrieveProduct, (products) => ({
  products,
}));

export default function Products() {
  const [page, setPage] = useState<number>(1);

  /** HANDLERS **/
  const paginationHandler = (e: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const { setProducts } = actionDispatch(useDispatch());

  const { products } = useSelector(productRetriever);

  useEffect(() => {
    const product = new ProductService();
    product
      .getProducts({
        page: 1,
        limit: 8,
        order: "createdAt",
        productCollection: ProductCollection.DISH,
        search: "",
      })
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, []);

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
              />
              <Button
                className={"single-button-search"}
                variant={"contained"}
                endIcon={<SearchIcon />}
              >
                Search
              </Button>
            </Stack>
          </Stack>

          {/* SORT FILTERS */}
          <Stack className={"dishes-filter-section"}>
            <Stack className={"dishes-filter-box"}>
              <Button
                variant={"contained"}
                color={"primary"}
                className={"order"}
              >
                New
              </Button>
              <Button
                variant={"contained"}
                color={"secondary"}
                className={"order"}
              >
                Price
              </Button>
              <Button
                variant={"contained"}
                color={"secondary"}
                className={"order"}
              >
                Views
              </Button>
            </Stack>
          </Stack>

          {/* CATEGORIES + PRODUCTS */}
          <Stack className={"list-category-section"}>
            <Stack className={"product-category"}>
              <Button variant={"contained"} color={"primary"}>
                Dish
              </Button>
              <Button variant={"contained"} color={"secondary"}>
                Salad
              </Button>
              <Button variant={"contained"} color={"secondary"}>
                Drink
              </Button>
              <Button variant={"contained"} color={"secondary"}>
                Desert
              </Button>
              <Button variant={"contained"} color={"secondary"}>
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
                    <Stack key={product._id} className={"product-card"}>
                      <Stack
                        className={"product-img"}
                        sx={{ backgroundImage: `url(${imagePath})` }}
                      >
                        <div className={"product-sale"}> {sizeVolume}</div>
                        <Button className={"shop-btn"}>
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

          {/* PAGINATION */}
          <Stack className={"pagination-section"}>
            <Pagination
              count={3}
              page={page}
              onChange={paginationHandler}
              renderItem={(item) => (
                <PaginationItem
                  components={{
                    previous: ArrowBackIcon,
                    next: ArrowForwardIcon,
                  }}
                  {...item}
                />
              )}
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
