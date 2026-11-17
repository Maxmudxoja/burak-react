import React from "react";
import { Box, Container, Stack } from "@mui/material";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import Typography from "@mui/joy/Typography";
import { CssVarsProvider } from "@mui/joy/styles";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Divider from "../../components/divider";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveNewDishes } from "./selector";
import { Product } from "../../../lib/types/product";
import { serverApi } from "../../../lib/config";
import { ProductCollection } from "../../../lib/enums/product_enum";

/**
 * ============================================================
 *  NewDishes.tsx — "FRESH MENU" BO'LIMI (bosh sahifa)
 * ============================================================
 * Eng yangi qo'shilgan 4 ta mahsulotni karta ko'rinishida chiqaradi.
 * Ma'lumot manbai: Redux -> state.homePage.newDishes
 *   (uni HomePage (index.tsx) useEffect ichida backenddan olib yozgan).
 * Bu komponent backendga O'ZI murojaat qilmaydi — faqat Redux'dan O'QIYDI.
 */

/** REDUX SLICE & SELECTOR **/
// retrieveNewDishes natijasini { newDishes } obyektiga o'raydi, shunda pastda destructuring qilamiz.
const newDishesRetriever = createSelector(retrieveNewDishes, (newDishes) => ({
  newDishes,
}));

export default function NewDishes() {
  // useSelector — Redux'dan o'qiydi. newDishes o'zgarsa, komponent avtomatik qayta render bo'ladi.
  const { newDishes } = useSelector(newDishesRetriever);

  console.log("newDishes: ", newDishes);
  return (
    <div className={"new-products-frame"}>
      <Container>
        <Stack className={"main"}>
          <Box className={"category-title"}>Fresh Menu</Box>
          <Stack className={"cards-frame"}>
            {/* CssVarsProvider — MUI Joy komponentlari (Card, Typography) to'g'ri ishlashi uchun kerak */}
            <CssVarsProvider>
              {/* Ma'lumot bo'lsa — kartalar, bo'lmasa — "not available" xabari */}
              {newDishes.length !== 0 ? (
                newDishes.map((product: Product) => {
                  // Rasm backendda saqlanadi, shuning uchun to'liq manzil = server + rasm yo'li
                  const imagePath = `${serverApi}/${product.productImages[0]}`;
                  // Ichimlik bo'lsa hajmi (L), boshqa bo'lsa o'lchami (size) ko'rsatiladi
                  const sizeVolume =
                    product.productCollection === ProductCollection.DRINK
                      ? product.productVolume + " L"
                      : product.productSize + " size";
                  return (
                    <Card
                      key={product._id}
                      variant="outlined"
                      className={"card"}
                    >
                      <CardOverflow>
                        <div className="product-sale">{sizeVolume}</div>
                        <AspectRatio ratio="1">
                          <img src={imagePath} alt="" />
                        </AspectRatio>
                      </CardOverflow>

                      <CardOverflow variant="soft" className="product-detail">
                        <Stack className="info">
                          <Stack flexDirection={"row"}>
                            <Typography className={"title"}>
                              {product.productName}
                            </Typography>
                            <Divider width="2" height="24" bg="#d9d9d9" />
                            <Typography className={"price"}>
                              ${product.productPrice}
                            </Typography>
                          </Stack>
                          <Stack>
                            <Typography className={"views"}>
                              {product.productViews}
                              <VisibilityIcon
                                sx={{ fontSize: 20, marginLeft: "5px" }}
                              />
                            </Typography>
                          </Stack>
                        </Stack>
                      </CardOverflow>
                    </Card>
                  );
                })
              ) : (
                <Box className="no-data">New products are not available!</Box>
              )}
            </CssVarsProvider>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
