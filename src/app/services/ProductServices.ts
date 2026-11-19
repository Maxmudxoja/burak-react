/**
 * ============================================================
 *  ProductServices.ts — MAHSULOTLAR BO'YICHA BACKEND BILAN ALOQA
 * ============================================================
 * Service qatlami nima uchun kerak?
 *   Komponent "qanday qilib" serverdan olishni bilmasligi kerak — u faqat
 *   `productService.getProducts(...)` ni chaqiradi. URL, axios, xato ushlash
 *   hammasi shu yerda. Backend URL o'zgarsa — faqat shu faylni o'zgartirasiz.
 *
 * Oqim:  Komponent -> ProductService.getProducts() -> axios.get -> BACKEND
 *        BACKEND -> result.data (Product[]) -> komponentga qaytadi
 */
import axios from "axios";
import { serverApi } from "../../lib/config";
import { Product, ProductInquiry } from "../../lib/types/product";

class ProductService {
  // Backend manzili (masalan http://localhost:3003). readonly — keyin o'zgartirib bo'lmaydi.
  private readonly path: string;

  constructor() {
    this.path = serverApi;
  }

  /**
   * Mahsulotlar ro'yxatini oladi.
   * @param input — qidiruv shartlari (ProductInquiry):
   *   order  — saralash maydoni ("productViews" = eng ko'p ko'rilgan, "createdAt" = eng yangi)
   *   page   — nechanchi sahifa
   *   limit  — nechta mahsulot
   *   productCollection — (ixtiyoriy) DISH / SALAD / DRINK ...
   *   search — (ixtiyoriy) nom bo'yicha qidiruv
   * Natija URL misoli: /product/all?order=createdAt&page=1&limit=4&productCollection=DISH
   */
  public async getProducts(input: ProductInquiry): Promise<Product[]> {
    try {
      // Majburiy parametrlar
      let url = `${this.path}/product/all?order=${input.order}&page=${input.page}&limit=${input.limit}`;
      // Ixtiyoriy parametrlar faqat berilgan bo'lsa qo'shiladi
      if (input.productCollection)
        url += `&productCollection=${input.productCollection}`;
      if (input.search) url += `&search=${input.search}`;

      const result = await axios.get(url); // GET so'rov backendga
      console.log("GetProducts: ", result);

      return result.data; // axios javobning tanasi .data ichida bo'ladi
    } catch (err) {
      console.log("Error, getProducts: ", err);
      throw err; // xatoni chaqirgan joyga uzatamiz (u .catch() da ushlaydi)
    }
  }

  /**
   * BITTA mahsulotni id bo'yicha oladi (ChosenProduct sahifasi uchun).
   * GET {serverApi}/product/:productId  ->  Product
   * withCredentials: true — brauzer cookie'larni ham yuboradi. Backend login bo'lgan
   * foydalanuvchini taniydi (masalan, ko'rishlar sonini (productViews) har user uchun 1 marta oshirish uchun).
   */
  public async getProduct(productId: string): Promise<Product> {
    try {
      const url = `${this.path}/product/${productId}`;
      const result = await axios.get(url, { withCredentials: true });
      console.log("getProduct: ", result);
      return result.data;
    } catch (err) {
      console.log("Error, getProduct: ", err);
      throw err; // xatoni chaqirgan joyga uzatamiz (u .catch() da ushlaydi)
    }
  }
}

export default ProductService;
