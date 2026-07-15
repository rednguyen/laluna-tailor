"use client";

import { useState } from "react";
import Image from "next/image";
import ShopLogo from "./ShopLogo";
import ShopInfoModal from "./ShopInfoModal";
import CouponFormModal from "./CouponFormModal";
import type { Shop } from "@/lib/shops";
import { googleMapsUrl } from "@/lib/googleMaps";

export default function ShopCard({ shop }: { shop: Shop }) {
  const [openModal, setOpenModal] = useState<"info" | "coupon" | null>(null);
  const [coverFailed, setCoverFailed] = useState(false);
  const hasCover = !coverFailed;

  return (
    <div
      className={`relative flex flex-col items-center gap-3 overflow-hidden rounded-2xl border p-6 text-center shadow-sm ${
        hasCover ? "border-white/10" : "border-gray-200 bg-white"
      }`}
    >
      {hasCover && (
        <>
          <Image
            src={shop.coverImage}
            alt=""
            fill
            sizes="(min-width: 640px) 480px, 100vw"
            className="object-cover"
            onError={() => setCoverFailed(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/45 to-black/70" />
        </>
      )}

      <div className="relative z-10 flex w-full flex-col items-center gap-3">
        <div className="rounded-full shadow-md ring-4 ring-white">
          <ShopLogo src={shop.logo} name={shop.name} size={72} />
        </div>
        <h3 className={`text-lg font-semibold ${hasCover ? "text-white" : "text-gray-900"}`}>
          {shop.name}
        </h3>
        <a
          href={googleMapsUrl(shop.address)}
          target="_blank"
          rel="noopener noreferrer"
          className={`text-sm underline decoration-1 underline-offset-2 ${
            hasCover ? "text-white/80 hover:text-white" : "text-gray-500 hover:text-brand-dark"
          }`}
        >
          {shop.address}
        </a>

        <div className="mt-2 flex w-full gap-2">
          <button
            type="button"
            onClick={() => setOpenModal("info")}
            className={`flex-1 rounded-lg border py-2 text-sm font-medium transition-all duration-150 active:scale-95 ${
              hasCover
                ? "border-white text-white hover:bg-white/10 hover:shadow-sm"
                : "border-brand-dark text-brand-dark hover:bg-brand-tint/40 hover:shadow-sm"
            }`}
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
