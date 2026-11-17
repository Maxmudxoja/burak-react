/**
 * config.ts — umumiy sozlamalar.
 *
 * serverApi — backend server manzili. U .env faylidagi REACT_APP_API_URL dan olinadi.
 *   - CRA (react-scripts) faqat "REACT_APP_" bilan boshlanadigan env o'zgaruvchilarni frontendga beradi.
 *   - .env o'zgarsa, `yarn start` ni QAYTA ishga tushirish kerak.
 * Ishlatilishi:
 *   - Service'larda API so'rov uchun:   `${serverApi}/product/all`
 *   - Rasmlar uchun:                    `${serverApi}/${product.productImages[0]}`
 */
export const serverApi: string = `${process.env.REACT_APP_API_URL}`;

// Foydalanuvchiga ko'rsatiladigan standart xabarlar (bir joyda saqlanadi).
export const Messages = {
  error1: "Something went wrong!",
  error2: "Please , Login first!",
  error3: "Please fulfill all inputs!",
  error4: "Message is empty",
  error5: "Only images with jpeg, jpg, png formats are allowed",
};
