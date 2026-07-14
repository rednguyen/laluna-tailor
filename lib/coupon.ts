import { randomInt } from "crypto";

const CODE_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no 0/O/1/I to avoid ambiguity
const CODE_LENGTH = 8;
const DISCOUNT_PERCENT = 10;

export function generateCouponCode(): string {
  let suffix = "";
  for (let i = 0; i < CODE_LENGTH; i++) {
    suffix += CODE_CHARS[randomInt(CODE_CHARS.length)];
  }
  return `LALUNA-${suffix}`;
}

export const couponDiscountPercent = DISCOUNT_PERCENT;
