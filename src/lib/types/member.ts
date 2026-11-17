/**
 * member.ts — foydalanuvchi bilan bog'liq TypeScript interfeyslari (backend modeliga mos).
 *   Member            — backenddan keladigan to'liq foydalanuvchi obyekti
 *   MemberInput       — ro'yxatdan o'tish (signup) uchun yuboriladigan ma'lumot
 *   LoginInput        — login uchun (nick + parol)
 *   MemberUpdateInput — profilni yangilash uchun (hammasi ixtiyoriy "?")
 * "?" belgisi — maydon ixtiyoriy (bo'lmasligi ham mumkin).
 */
import { MemberStatus, MemberType } from "../enums/member_enum";

export interface Member {
  _id: string;
  memberType: MemberType;
  memberStatus: MemberStatus;
  memberNick: string;
  memberPhone: string;
  memberPassword?: string;
  memberAddress?: string;
  memberDesc?: string;
  memberImage?: string;
  memberPoints: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface MemberInput {
  memberType?: MemberType;
  memberStatus?: MemberStatus;
  memberNick: string;
  memberPhone: string;
  memberPassword: string;
  memberAddress?: string;
  memberDesc?: string;
  memberImage?: string;
  memberPoints?: number;
}

export interface LoginInput {
  memberNick: string;
  memberPassword: string;
}

export interface MemberUpdateInput {
  memberNick?: string;
  memberPhone?: string;
  memberPassword?: string;
  memberAddress?: string;
  memberDesc?: string;
  memberImage?: string;
}
