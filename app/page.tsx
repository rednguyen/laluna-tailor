import ShopCard from "@/components/ShopCard";
import HotelLogo from "@/components/HotelLogo";
import Footer from "@/components/Footer";
import { shops } from "@/lib/shops";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-brand-50">
      <header className="border-b-2 border-brand bg-brand-contrast px-6 py-8 text-center">
        <HotelLogo />
        <h1 className="text-2xl font-bold text-white">
          Laluna Hoi An Riverside Hotel &amp; Spa
        </h1>
        <p className="mt-1 text-sm text-white/70">
          Our recommended tailor shops — get your exclusive discount coupon below
        </p>
      </header>

      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {shops.map((shop) => (
            <ShopCard key={shop.id} shop={shop} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
