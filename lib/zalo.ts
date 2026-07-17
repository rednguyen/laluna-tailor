import { couponDiscountPercent } from "./coupon";

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

function formatAppointmentTime(raw: string): string {
  const date = new Date(raw);
  if (Number.isNaN(date.getTime())) return raw;
  return date.toLocaleString("en-US", { dateStyle: "full", timeStyle: "short" });
}

export async function sendCouponZaloNotification(args: SendCouponZaloNotificationArgs) {
  const botToken = process.env.ZALO_BOT_TOKEN;
  const chatId = process.env.ZALO_CHAT_ID;

  if (!botToken || !chatId) {
    throw new Error("Missing Zalo configuration: ZALO_BOT_TOKEN and ZALO_CHAT_ID must be set.");
  }

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

  const res = await fetch(`https://bot-api.zaloplatforms.com/bot${botToken}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text }),
  });

  if (!res.ok) {
    throw new Error(`Zalo API responded with ${res.status}`);
  }
}
