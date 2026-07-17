import { Resend } from "resend";
import { couponDiscountPercent } from "./coupon";

type SendCouponEmailArgs = {
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
  return date.toLocaleString("en-US", {
    dateStyle: "full",
    timeStyle: "short",
  });
}

function buildEmailHtml(args: SendCouponEmailArgs): string {
  const appointment = formatAppointmentTime(args.appointmentTime);

  return `
    <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; color: #1f2937;">
      <h1 style="color: #0f4c81;">Laluna Hoi An Riverside Hotel &amp; Spa</h1>
      <p>Dear ${args.firstName} ${args.lastName},</p>
      <p>Thank you for your interest in <strong>${args.shopName}</strong>! Here is your exclusive coupon:</p>
      <div style="background: #f3f4f6; border-radius: 8px; padding: 16px 20px; margin: 20px 0; text-align: center;">
        <p style="margin: 0; font-size: 14px; color: #6b7280;">${couponDiscountPercent}% OFF discount code</p>
        <p style="margin: 4px 0 0; font-size: 24px; font-weight: bold; letter-spacing: 1px; color: #0f4c81;">${args.couponCode}</p>
      </div>
      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        <tbody>
          <tr><td style="padding: 4px 0; color: #6b7280;">Shop</td><td style="padding: 4px 0;">${args.shopName}</td></tr>
          <tr><td style="padding: 4px 0; color: #6b7280;">Room Number</td><td style="padding: 4px 0;">${args.roomNumber}</td></tr>
          <tr><td style="padding: 4px 0; color: #6b7280;">Appointment</td><td style="padding: 4px 0;">${appointment}</td></tr>
          <tr><td style="padding: 4px 0; color: #6b7280;">Phone</td><td style="padding: 4px 0;">${args.phone || "-"}</td></tr>
          <tr><td style="padding: 4px 0; color: #6b7280;">Comments</td><td style="padding: 4px 0;">${args.comments || "-"}</td></tr>
        </tbody>
      </table>
      <p style="margin-top: 24px;">Please present this email or the code above when you visit ${args.shopName}.</p>
      <p>We hope you enjoy your stay!</p>
      <p style="color: #6b7280; font-size: 12px; margin-top: 32px;">Laluna Hoi An Riverside Hotel &amp; Spa</p>
    </div>
  `;
}

export async function sendCouponEmail(args: SendCouponEmailArgs) {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.FROM_EMAIL;
  const hotelEmail = process.env.HOTEL_EMAIL;

  if (!apiKey || !fromEmail) {
    throw new Error(
      "Missing email configuration: RESEND_API_KEY and FROM_EMAIL must be set."
    );
  }

  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from: fromEmail,
    to: args.email,
    cc: hotelEmail,
    subject: `Your ${couponDiscountPercent}% Off Coupon for ${args.shopName}`,
    html: buildEmailHtml(args),
  });

  if (error) {
    throw new Error(`Failed to send email: ${error.message}`);
  }
}
