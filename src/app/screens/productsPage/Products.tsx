import React, { useState } from "react";
import { Box, Button, Container, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Badge from "@mui/material/Badge";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const products = [
  { productName: "Cutlet", imagePath: "/img/cutlet.webp" },
  { productName: "Kebab", imagePath: "/img/kebab-fresh.webp" },
  { productName: "Kebab", imagePath: "/img/kebab.webp" },
  { productName: "Lavash", imagePath: "/img/lavash.webp" },
  { productName: "Lavash", imagePath: "/img/lavash.webp" },
  { productName: "Cutlet", imagePath: "/img/cutlet.webp" },
  { productName: "Kebab", imagePath: "/img/kebab.webp" },
  { productName: "Kebab", imagePath: "/img/kebab-fresh.webp" },
];

const brands = [
  { brandName: "Gurme", imagePath: "/img/gurme.webp" },
  { brandName: "Seafood", imagePath: "/img/seafood.webp" },
  { brandName: "Sweets", imagePath: "/img/sweets.webp" },
  { brandName: "Doner", imagePath: "/img/doner.webp" },
];

export default function Products() {
  const [page, setPage] = useState<number>(1);

  /** HANDLERS **/
  const paginationHandler = (e: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
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
                products.map((product, index) => {
                  return (
                    <Stack key={index} className={"product-card"}>
                      <Stack
                        className={"product-img"}
                        sx={{ backgroundImage: `url(${product.imagePath})` }}
                      >
                        <div className={"product-sale"}>Large size</div>
                        <Button className={"shop-btn"}>
                          <img src={"/icons/shopping-cart.svg"} alt={"cart"} />
                        </Button>
                        <Button className={"view-btn"}>
                          <Badge badgeContent={20} color={"secondary"}>
                            <RemoveRedEyeIcon sx={{ color: "white" }} />
                          </Badge>
                        </Button>
                      </Stack>
                      <Box className={"product-desc"}>
                        <span className={"product-title"}>
                          {product.productName}
                        </span>
                        <div className={"product-price"}>
                          <MonetizationOnIcon />
                          {15}
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

      {/* FAMILY BRANDS */}
      <div className={"brands-logo"}>
        <Container className={"family-brands"}>
          <Box className={"category-title"}>Our Family Brands</Box>
          <Stack className={"brand-list"}>
            {brands.map((brand, index) => {
              return (
                <Box key={index} className={"review-box"}>
                  <img src={brand.imagePath} alt={brand.brandName} />
                </Box>
              );
            })}
          </Stack>
        </Container>
      </div>

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
