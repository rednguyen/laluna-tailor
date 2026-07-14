import ShopCard from "@/components/ShopCard";
import HotelLogo from "@/components/HotelLogo";
import { shops } from "@/lib/shops";

export default function Home() {
  return (
    <div className="min-h-screen bg-brand-50">
      <header className="border-b-2 border-brand bg-white px-6 py-8 text-center">
        <HotelLogo />
        <h1 className="text-2xl font-bold text-brand-contrast">
          Laluna Hoi An Riverside Hotel &amp; Spa
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Our recommended tailor shops — get your exclusive discount coupon below
        </p>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {shops.map((shop) => (
            <ShopCard key={shop.id} shop={shop} />
          ))}
        </div>
      </main>
    </div>
  );
}
