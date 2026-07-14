"use client";

import { useState } from "react";
import ShopLogo from "./ShopLogo";
import ShopInfoModal from "./ShopInfoModal";
import CouponFormModal from "./CouponFormModal";
import type { Shop } from "@/lib/shops";

export default function ShopCard({ shop }: { shop: Shop }) {
  const [openModal, setOpenModal] = useState<"info" | "coupon" | null>(null);

  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm">
      <ShopLogo src={shop.logo} name={shop.name} size={72} />
      <h3 className="text-lg font-semibold text-gray-900">{shop.name}</h3>
      <p className="text-sm text-gray-500">{shop.address}</p>

      <div className="mt-2 flex w-full gap-2">
        <button
          type="button"
          onClick={() => setOpenModal("info")}
          className="flex-1 rounded-lg border border-brand-dark py-2 text-sm font-medium text-brand-dark transition-all duration-150 hover:bg-brand-tint/40 hover:shadow-sm active:scale-95"
        >
          More Info
        </button>
        <button
          type="button"
          onClick={() => setOpenModal("coupon")}
          className="flex-1 rounded-lg bg-brand py-2 text-sm font-medium text-brand-contrast transition-all duration-150 hover:bg-brand-hover hover:shadow-md active:scale-95"
        >
          Get Coupon
        </button>
      </div>

      {openModal === "info" && (
        <ShopInfoModal shop={shop} onClose={() => setOpenModal(null)} />
      )}
      {openModal === "coupon" && (
        <CouponFormModal shop={shop} onClose={() => setOpenModal(null)} />
      )}
    </div>
  );
}
