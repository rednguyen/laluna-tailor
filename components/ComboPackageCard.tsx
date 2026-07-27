import Link from "next/link";
import { comboServiceLabels, type ComboPackage } from "@/lib/comboPackages";

export default function ComboPackageCard({ comboPackage }: { comboPackage: ComboPackage }) {
  return (
    <Link
      href={`/combo-package/${comboPackage.id}`}
      className="group rounded-2xl border border-gray-200 bg-white p-8 text-left shadow-sm transition-all duration-150 hover:-translate-y-0.5 hover:shadow-md active:scale-95"
    >
      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-brand-dark">
        {comboPackage.name}
      </h3>
      <p className="mt-2 text-sm text-gray-500">
        Includes {comboPackage.includes.map((s) => comboServiceLabels[s]).join(", ")}.
      </p>
    </Link>
  );
}
