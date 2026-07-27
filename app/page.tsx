import Link from "next/link";

export default function Home() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center gap-8 px-4 py-16 text-center">
      <div>
        <h2 className="text-xl font-semibold text-brand-contrast">Welcome, valued guest</h2>
        <p className="mt-1 text-sm text-gray-600">
          Choose a service to explore exclusive offers curated for you.
        </p>
      </div>

      <div className="grid w-full gap-4 sm:grid-cols-2">
        <Link
          href="/tailor"
          className="group rounded-2xl border border-gray-200 bg-white p-8 text-left shadow-sm transition-all duration-150 hover:-translate-y-0.5 hover:shadow-md active:scale-95"
        >
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-brand-dark">
            Tailor Services
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            Exclusive discount coupons from our partner tailor shops in Hoi An.
          </p>
        </Link>

        <Link
          href="/combo-package"
          className="group rounded-2xl border border-gray-200 bg-white p-8 text-left shadow-sm transition-all duration-150 hover:-translate-y-0.5 hover:shadow-md active:scale-95"
        >
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-brand-dark">
            Combo Package
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            Dining, spa, and tour packages exclusively for our guests.
          </p>
        </Link>
      </div>
    </div>
  );
}
