import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ComboPackageDetails from "@/components/ComboPackageDetails";
import { comboPackages } from "@/lib/comboPackages";

type PageProps = {
  params: Promise<{ packageId: string }>;
};

export function generateStaticParams() {
  // "spa-dining" has its own dedicated page at app/combo-package/spa-dining/page.tsx
  return comboPackages
    .filter((comboPackage) => comboPackage.id !== "spa-dining")
    .map((comboPackage) => ({ packageId: comboPackage.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { packageId } = await params;
  const comboPackage = comboPackages.find((p) => p.id === packageId);

  return {
    title: comboPackage
      ? `${comboPackage.name} | Laluna Hoi An Riverside Hotel & Spa`
      : "Combo Package | Laluna Hoi An Riverside Hotel & Spa",
  };
}

export default async function ComboPackageDetailPage({ params }: PageProps) {
  const { packageId } = await params;
  const comboPackage = comboPackages.find((p) => p.id === packageId);

  if (!comboPackage) {
    notFound();
  }

  return (
    <div className="mx-auto w-full max-w-2xl flex-1 px-4 py-8">
      <Link
        href="/combo-package"
        className="text-sm text-gray-500 underline decoration-1 underline-offset-2 hover:text-brand-dark"
      >
        ← Back to Combo Packages
      </Link>

      <h2 className="mt-4 mb-6 text-xl font-semibold text-brand-contrast">
        {comboPackage.name}
      </h2>

      <ComboPackageDetails comboPackage={comboPackage} />
    </div>
  );
}
