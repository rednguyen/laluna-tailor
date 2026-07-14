import { z } from "zod";

export type FormFieldType = "text" | "email" | "tel" | "textarea" | "datetime-local";

export type FormFieldDef = {
  name: string;
  label: string;
  type: FormFieldType;
  required: boolean;
  placeholder?: string;
};

// Drives the rendered coupon form. Keep couponFormSchema below in sync when
// fields are added, removed, or renamed.
export const couponFormFields: FormFieldDef[] = [
  { name: "firstName", label: "First Name", type: "text", required: true },
  { name: "lastName", label: "Last Name", type: "text", required: true },
  { name: "email", label: "Email Address", type: "email", required: true },
  { name: "phone", label: "Phone Number", type: "tel", required: false },
  {
    name: "appointmentTime",
    label: "Appointment Date & Time",
    type: "datetime-local",
    required: true,
  },
  {
    name: "comments",
    label: "Comments",
    type: "textarea",
    required: false,
    placeholder: "Anything you'd like the shop to know?",
  },
];

export const couponFormSchema = z.object({
  firstName: z.string().min(1, "First Name is required"),
  lastName: z.string().min(1, "Last Name is required"),
  email: z.string().email("Email Address must be a valid email"),
  phone: z.string().optional().or(z.literal("")),
  appointmentTime: z.string().min(1, "Appointment Date & Time is required"),
  comments: z.string().optional().or(z.literal("")),
  shopId: z.string().min(1, "Shop is required"),
  shopName: z.string().min(1, "Shop is required"),
});

export type CouponFormValues = z.infer<typeof couponFormSchema>;
