import type { Metadata } from "next";
import ComboPackageCard from "@/components/ComboPackageCard";
import { comboPackages } from "@/lib/comboPackages";

export const metadata: Metadata = {
  title: "Combo Package | Laluna Hoi An Riverside Hotel & Spa",
  description: "Dining, spa, and tour packages exclusively for our guests.",
};

export default function ComboPackagePage() {
  return (
    <div className="mx-auto w-full max-w-3xl flex-1 px-4 py-8">
      <p className="mb-6 text-center text-sm text-gray-600">
        Choose a combo package to see what&apos;s included
      </p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {comboPackages.map((comboPackage) => (
          <ComboPackageCard key={comboPackage.id} comboPackage={comboPackage} />
        ))}
      </div>
    </div>
  );
}
