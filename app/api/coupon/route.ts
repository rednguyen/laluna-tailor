import { NextRequest, NextResponse } from "next/server";
import { couponFormSchema } from "@/lib/formFields";
import { generateCouponCode } from "@/lib/coupon";
import { sendCouponEmail } from "@/lib/email";

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = couponFormSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const data = parsed.data;
  const couponCode = generateCouponCode();

  try {
    await sendCouponEmail({
      couponCode,
      shopName: data.shopName,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      appointmentTime: data.appointmentTime,
      comments: data.comments,
    });
  } catch (err) {
    console.error("Failed to send coupon email", err);
    return NextResponse.json(
      { error: "Could not send confirmation email. Please try again later." },
      { status: 502 }
    );
  }

  return NextResponse.json({ couponCode });
}
