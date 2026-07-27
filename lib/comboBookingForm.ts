import { z } from "zod";

export const comboBookingSchema = z.object({
  comboId: z.string().min(1),
  comboName: z.string().min(1),
  mainDish: z.string().min(1),
  spaTreatment: z.string().min(1),
  appetizer: z.string().min(1, "Please choose an appetizer or salad"),
  dessert: z.string().min(1, "Please choose a dessert"),
  secondo: z.string().optional().or(z.literal("")),
  firstName: z.string().min(1, "First Name is required"),
  lastName: z.string().min(1, "Last Name is required"),
  roomNumber: z.string().min(1, "Room Number is required"),
  email: z.string().email("Email Address must be a valid email"),
  phone: z.string().optional().or(z.literal("")),
  appointmentTime: z.string().min(1, "Appointment Date & Time is required"),
  comments: z.string().optional().or(z.literal("")),
});

export type ComboBookingFormValues = z.infer<typeof comboBookingSchema>;
