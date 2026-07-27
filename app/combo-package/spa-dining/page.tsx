import type { Metadata } from "next";
import Link from "next/link";
import DiningSpaComboCard from "@/components/DiningSpaComboCard";
import { diningSpaCombos } from "@/lib/diningSpaCombos";

export const metadata: Metadata = {
  title: "Spa + Dining | Laluna Hoi An Riverside Hotel & Spa",
  description: "Curated Spa + Dining combo packages for our guests.",
};

export default function SpaDiningComboPage() {
  return (
    <div className="mx-auto w-full max-w-4xl flex-1 px-4 py-8">
      <Link
        href="/combo-package"
        className="text-sm text-gray-500 underline decoration-1 underline-offset-2 hover:text-brand-dark"
      >
        ← Back to Combo Packages
      </Link>

      <h2 className="mt-4 mb-6 text-center text-xl font-semibold text-brand-contrast">
        Spa + Dining
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {diningSpaCombos.map((combo) => (
          <DiningSpaComboCard key={combo.id} combo={combo} />
        ))}
      </div>
    </div>
  );
}
