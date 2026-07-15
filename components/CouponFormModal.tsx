"use client";

import { useState } from "react";
import Modal from "./Modal";
import { couponFormFields } from "@/lib/formFields";
import type { Shop } from "@/lib/shops";

type CouponFormModalProps = {
  shop: Shop;
  onClose: () => void;
};

type Status = "idle" | "submitting" | "success" | "error";

export default function CouponFormModal({ shop, onClose }: CouponFormModalProps) {
  const [values, setValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(couponFormFields.map((field) => [field.name, ""]))
  );
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [couponCode, setCouponCode] = useState<string | null>(null);

  const handleChange = (name: string, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);

    try {
      const res = await fetch("/api/coupon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, shopId: shop.id, shopName: shop.name }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      setCouponCode(data.couponCode);
      setStatus("success");
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <Modal title="You're all set!" onClose={onClose}>
        <p className="text-gray-700">
          Your coupon for <strong>{shop.name}</strong> has been emailed to{" "}
          <strong>{values.email}</strong>.
        </p>
        <div className="mt-4 rounded-lg bg-brand-tint/40 p-4 text-center">
          <p className="text-sm text-gray-500">Your 10% off code</p>
          <p className="text-xl font-bold tracking-wide text-brand-dark">{couponCode}</p>
        </div>
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
    <Modal title={`Get Coupon — ${shop.name}`} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        {couponFormFields.map((field) => (
          <div key={field.name}>
            <label
              htmlFor={field.name}
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              {field.label}
              {field.required && <span className="text-red-500"> *</span>}
            </label>
            {field.type === "textarea" ? (
              <textarea
                id={field.name}
                required={field.required}
                placeholder={field.placeholder}
                value={values[field.name]}
                onChange={(e) => handleChange(field.name, e.target.value)}
                rows={3}
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-brand focus:outline-none"
              />
            ) : (
              <input
                id={field.name}
                type={field.type}
                required={field.required}
                placeholder={field.placeholder}
                value={values[field.name]}
                onChange={(e) => handleChange(field.name, e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-brand focus:outline-none"
              />
            )}
          </div>
        ))}

        {status === "error" && (
          <p className="text-sm text-red-600">{errorMessage}</p>
        )}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand py-2 font-medium text-brand-contrast transition-all duration-150 hover:bg-brand-hover hover:shadow-md active:scale-95 disabled:cursor-not-allowed disabled:opacity-60 disabled:active:scale-100"
        >
          {status === "submitting" && (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-brand-contrast/30 border-t-brand-contrast" />
          )}
          {status === "submitting" ? "Sending..." : "Get My Coupon"}
        </button>
      </form>
    </Modal>
  );
}
