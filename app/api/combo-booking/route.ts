import { NextRequest, NextResponse } from "next/server";
import { comboBookingSchema } from "@/lib/comboBookingForm";
import { diningSpaCombos } from "@/lib/diningSpaCombos";
import { findDiningItem } from "@/lib/diningMenu";
import { sendComboBookingEmail } from "@/lib/email";
import { sendComboBookingZaloNotification } from "@/lib/zalo";

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = comboBookingSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const data = parsed.data;

  const combo = diningSpaCombos.find((c) => c.id === data.comboId);
  if (!combo) {
    return NextResponse.json({ error: "Invalid combo package." }, { status: 400 });
  }

  const secondoItem = data.secondo ? findDiningItem(data.secondo) : undefined;
  if (data.secondo && !secondoItem) {
    return NextResponse.json({ error: "Invalid secondo selection." }, { status: 400 });
  }

  const totalCost = combo.price + (secondoItem?.price_usd ?? 0);

  try {
    await sendComboBookingEmail({
      comboName: data.comboName,
      mainDish: data.mainDish,
      spaTreatment: data.spaTreatment,
      appetizer: data.appetizer,
      dessert: data.dessert,
      secondo: secondoItem?.name,
      totalCost,
      firstName: data.firstName,
      lastName: data.lastName,
      roomNumber: data.roomNumber,
      email: data.email,
      phone: data.phone,
      appointmentTime: data.appointmentTime,
      comments: data.comments,
    });
  } catch (err) {
    console.error("Failed to send combo booking email", err);
    return NextResponse.json(
      { error: "Could not send booking confirmation email. Please try again later." },
      { status: 502 }
    );
  }

  try {
    await sendComboBookingZaloNotification({
      comboName: data.comboName,
      mainDish: data.mainDish,
      spaTreatment: data.spaTreatment,
      appetizer: data.appetizer,
      dessert: data.dessert,
      secondo: secondoItem?.name,
      totalCost,
      firstName: data.firstName,
      lastName: data.lastName,
      roomNumber: data.roomNumber,
      email: data.email,
      phone: data.phone,
      appointmentTime: data.appointmentTime,
      comments: data.comments,
    });
  } catch (err) {
    console.error("Failed to send combo booking Zalo notification", err);
  }

  return NextResponse.json({ success: true });
}
