import { couponDiscountPercent } from "./coupon";
import { formatUsd } from "./diningMenu";

type SendCouponZaloNotificationArgs = {
  couponCode: string;
  shopName: string;
  firstName: string;
  lastName: string;
  roomNumber: string;
  email: string;
  phone?: string;
  appointmentTime: string;
  comments?: string;
};

type SendComboBookingZaloNotificationArgs = {
  comboName: string;
  mainDish: string;
  spaTreatment: string;
  appetizer: string;
  dessert: string;
  secondo?: string;
  totalCost: number;
  firstName: string;
  lastName: string;
  roomNumber: string;
  email: string;
  phone?: string;
  appointmentTime: string;
  comments?: string;
};

function formatAppointmentTime(raw: string): string {
  const date = new Date(raw);
  if (Number.isNaN(date.getTime())) return raw;
  return date.toLocaleString("en-US", { dateStyle: "full", timeStyle: "short" });
}

async function sendZaloMessage(text: string) {
  const botToken = process.env.ZALO_BOT_TOKEN;
  const chatId = process.env.ZALO_CHAT_ID;

  if (!botToken || !chatId) {
    throw new Error("Missing Zalo configuration: ZALO_BOT_TOKEN and ZALO_CHAT_ID must be set.");
  }

  const res = await fetch(`https://bot-api.zaloplatforms.com/bot${botToken}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text }),
  });

  if (!res.ok) {
    throw new Error(`Zalo API responded with ${res.status}`);
  }
}

export async function sendCouponZaloNotification(args: SendCouponZaloNotificationArgs) {
  const text = [
    `New coupon issued — ${args.shopName}`,
    "",
    `Code: ${args.couponCode} (${couponDiscountPercent}% off)`,
    `Guest: ${args.firstName} ${args.lastName}`,
    `Room: ${args.roomNumber}`,
    `Email: ${args.email}`,
    `Phone: ${args.phone || "-"}`,
    `Appointment: ${formatAppointmentTime(args.appointmentTime)}`,
    `Comments: ${args.comments || "-"}`,
  ].join("\n");

  await sendZaloMessage(text);
}

export async function sendComboBookingZaloNotification(args: SendComboBookingZaloNotificationArgs) {
  const text = [
    `New combo booking — ${args.comboName}`,
    "",
    `Appetizer & Salad: ${args.appetizer}`,
    `Main Course: ${args.mainDish}`,
    `Dessert: ${args.dessert}`,
    `Secondo: ${args.secondo || "-"}`,
    `Spa Treatment: ${args.spaTreatment}`,
    `Total Cost: ${formatUsd(args.totalCost)}`,
    `-----------------------------------------`,
    `Guest: ${args.firstName} ${args.lastName}`,
    `Room: ${args.roomNumber}`,
    `Email: ${args.email}`,
    `Phone: ${args.phone || "-"}`,
    `Appointment: ${formatAppointmentTime(args.appointmentTime)}`,
    `Comments: ${args.comments || "-"}`,
  ].join("\n");

  await sendZaloMessage(text);
}
