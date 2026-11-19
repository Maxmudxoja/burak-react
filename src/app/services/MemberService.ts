/**
 * ============================================================
 *  MemberService.ts — FOYDALANUVCHILAR (MEMBER) BO'YICHA BACKEND BILAN ALOQA
 * ============================================================
 * ProductService bilan bir xil g'oya: barcha member'ga oid API so'rovlar shu klassda.
 * Kelajakda bu yerga signup, login, logout, updateMember kabi metodlar qo'shiladi.
 */
import axios from "axios";
import { serverApi } from "../../lib/config";
import { Member } from "../../lib/types/member";

class MemberService {
  private readonly path: string;

  constructor() {
    this.path = serverApi;
  }

  /**
   * Eng faol foydalanuvchilarni oladi (bosh sahifadagi "Active Users" bo'limi uchun).
   * GET {serverApi}/member/top-users  ->  Member[]
   */
  public async getTopUsers(): Promise<Member[]> {
    try {
      const url = this.path + "/member/top-users";
      const result = await axios.get(url);
      console.log("getTopUsers: ", result);
      return result.data;
    } catch (err) {
      console.log("Error, getTopUsers: ", err);
      throw err;
    }
  }

  /**
   * Restoran (MemberType.RESTAURANT) ma'lumotini oladi — ChosenProduct'da nomi va telefoni chiqadi.
   * GET {serverApi}/member/restaurant  ->  Member
   */
  public async getRestaurant(): Promise<Member> {
    try {
      const url = this.path + "/member/restaurant";
      const result = await axios.get(url);
      console.log("getRestaurant: ", result);

      const restaurant: Member = result.data;

      return restaurant;
    } catch (err) {
      console.log("Error, getRestaurant: ", err);
      throw err;
    }
  }
}

export default MemberService;
