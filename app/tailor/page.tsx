import type { Metadata } from "next";
import ShopCard from "@/components/ShopCard";
import { shops } from "@/lib/shops";

export const metadata: Metadata = {
  title: "Tailor Services | Laluna Hoi An Riverside Hotel & Spa",
  description: "Get exclusive discount coupons for our partner tailor shops in Hoi An.",
};

export default function TailorPage() {
  return (
    <div className="mx-auto w-full max-w-3xl flex-1 px-4 py-8">
      <p className="mb-6 text-center text-sm text-gray-600">
        Our recommended tailor shops — get your exclusive discount coupon below
      </p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {shops.map((shop) => (
          <ShopCard key={shop.id} shop={shop} />
        ))}
      </div>
    </div>
  );
}
