/**
 * screen.ts — Redux state'ining TUZILMASI (type'lari).
 * AppRootState — butun store'ning shakli; har bir sahifa o'z state'iga ega bo'ladi.
 * Yangi sahifa state'i qo'shilsa: avval shu yerda interfeys yoziladi, keyin slice.ts da ishlatiladi.
 */
/** REACT APP STATE */

import { Member } from "./member";
import { Product } from "./product";

/** REACT APP STATE*/
export interface AppRootState {
  homePage: HomePageState;
}

/** HOMEPAGE*/
export interface HomePageState {
  popularDishes: Product[];
  newDishes: Product[];
  topUsers: Member[];
}

/** PRODUCT PAGE*/

/** ORDERS PAGE*/
