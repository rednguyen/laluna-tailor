"use client";

import { useState } from "react";
import Modal from "./Modal";
import { findDiningItem, formatUsd, getDiningCategories, getDiningItemsByCategory } from "@/lib/diningMenu";
import type { DiningSpaCombo } from "@/lib/diningSpaCombos";

type ComboBookingFormModalProps = {
  combo: DiningSpaCombo;
  mainDish: string;
  spaTreatment: string;
  onClose: () => void;
};

type Status = "idle" | "submitting" | "success" | "error";

const appetizerOptions = getDiningItemsByCategory("Appetizer & Salad");
const dessertOptions = getDiningItemsByCategory("Desserts");
const secondoCategories = getDiningCategories([
  "Soup",
  "Spaghetti or Penne",
  "Pizza",
  "Burger - Snack",
]);

export default function ComboBookingFormModal({
  combo,
  mainDish,
  spaTreatment,
  onClose,
}: ComboBookingFormModalProps) {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    roomNumber: "",
    email: "",
    phone: "",
    appetizer: "",
    dessert: "",
    secondo: "",
    appointmentTime: "",
    comments: "",
  });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const secondoItem = values.secondo ? findDiningItem(values.secondo) : undefined;
  const totalCost = combo.price + (secondoItem?.price_usd ?? 0);

  const handleChange = (name: string, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);

    try {
      const res = await fetch("/api/combo-booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          comboId: combo.id,
          comboName: combo.name,
          mainDish,
          spaTreatment,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <Modal title="Booking Request Received!" onClose={onClose}>
        <p className="text-gray-700">
          Your booking request for <strong>{combo.name}</strong> has been sent to{" "}
          <strong>{values.email}</strong>. Our team will follow up shortly to confirm.
        </p>
        <button
          type="button"
          onClick={onClose}
          className="mt-6 w-full rounded-lg bg-brand py-2 font-medium text-brand-contrast transition-all duration-150 hover:bg-brand-hover hover:shadow-md active:scale-95"
        >
          Close
        </button>
      </Modal>
    );
  }

  return (
    <Modal title={`Book Now — ${combo.name}`} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="rounded-lg bg-brand-tint/40 p-3 text-sm text-gray-700">
          <p>
            <span className="text-gray-500">Main Course:</span> {mainDish}
          </p>
          <p>
            <span className="text-gray-500">Spa Treatment:</span> {spaTreatment}
          </p>
        </div>

         <div>
          <label htmlFor="appetizer" className="mb-1 block text-sm font-medium text-gray-700">
            Appetizer &amp; Salad<span className="text-red-500"> *</span>
          </label>
          <select
            id="appetizer"
            required
            value={values.appetizer}
            onChange={(e) => handleChange("appetizer", e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-brand focus:outline-none"
          >
            <option value="" disabled>
              Select one
            </option>
            {appetizerOptions.map((item) => (
              <option key={item.name} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="dessert" className="mb-1 block text-sm font-medium text-gray-700">
            Dessert<span className="text-red-500"> *</span>
          </label>
          <select
            id="dessert"
            required
            value={values.dessert}
            onChange={(e) => handleChange("dessert", e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-brand focus:outline-none"
          >
            <option value="" disabled>
              Select one
            </option>
            {dessertOptions.map((item) => (
              <option key={item.name} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="secondo" className="mb-1 block text-sm font-medium text-gray-700">
            Secondo (optional, additional cost)
          </label>
          <select
            id="secondo"
            value={values.secondo}
            onChange={(e) => handleChange("secondo", e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-brand focus:outline-none"
          >
            <option value="">No secondo</option>
            {secondoCategories.map((category) => (
              <optgroup key={category.category} label={category.category}>
                {category.items.map((item) => (
                  <option key={item.name} value={item.name}>
                    {item.name} (+{formatUsd(item.price_usd)})
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="firstName" className="mb-1 block text-sm font-medium text-gray-700">
            First Name<span className="text-red-500"> *</span>
          </label>
          <input
            id="firstName"
            type="text"
            required
            value={values.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-brand focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="lastName" className="mb-1 block text-sm font-medium text-gray-700">
            Last Name<span className="text-red-500"> *</span>
          </label>
          <input
            id="lastName"
            type="text"
            required
            value={values.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-brand focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="roomNumber" className="mb-1 block text-sm font-medium text-gray-700">
            Room Number<span className="text-red-500"> *</span>
          </label>
          <input
            id="roomNumber"
            type="text"
            required
            value={values.roomNumber}
            onChange={(e) => handleChange("roomNumber", e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-brand focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
            Email Address<span className="text-red-500"> *</span>
          </label>
          <input
            id="email"
            type="email"
            required
            value={values.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-brand focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="phone" className="mb-1 block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            id="phone"
            type="tel"
            value={values.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-brand focus:outline-none"
          />
        </div>


        <div>
          <label
            htmlFor="appointmentTime"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Appointment Date &amp; Time<span className="text-red-500"> *</span>
          </label>
          <input
            id="appointmentTime"
            type="datetime-local"
            required
            value={values.appointmentTime}
            onChange={(e) => handleChange("appointmentTime", e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-brand focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="comments" className="mb-1 block text-sm font-medium text-gray-700">
            Comments
          </label>
          <textarea
            id="comments"
            rows={3}
            placeholder="Anything you'd like us to know?"
            value={values.comments}
            onChange={(e) => handleChange("comments", e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-brand focus:outline-none"
          />
        </div>

        <div className="rounded-lg bg-brand-tint/40 p-3 text-center">
          <p className="text-sm text-gray-500">Total Cost</p>
          <p className="text-lg font-bold text-brand-dark">{formatUsd(totalCost)}</p>
        </div>

        {status === "error" && <p className="text-sm text-red-600">{errorMessage}</p>}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand py-2 font-medium text-brand-contrast transition-all duration-150 hover:bg-brand-hover hover:shadow-md active:scale-95 disabled:cursor-not-allowed disabled:opacity-60 disabled:active:scale-100"
        >
          {status === "submitting" && (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-brand-contrast/30 border-t-brand-contrast" />
          )}
          {status === "submitting" ? "Sending..." : "Submit Booking Request"}
        </button>
      </form>
    </Modal>
  );
}
