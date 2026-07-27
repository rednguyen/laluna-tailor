import { comboServiceLabels, type ComboPackage } from "@/lib/comboPackages";
import { diningMenu } from "@/lib/diningMenu";

function formatPrice(price: number): string {
  return `$${price.toFixed(2)}`;
}

export default function ComboPackageDetails({ comboPackage }: { comboPackage: ComboPackage }) {
  return (
    <div className="space-y-6">
      {comboPackage.includes.map((service) => (
        <div key={service}>
          <h3 className="text-base font-semibold text-brand-dark">
            {comboServiceLabels[service]}
          </h3>

          {service === "dining" ? (
            <div className="mt-2 space-y-4">
              {diningMenu.map((category) => (
                <div key={category.category}>
                  <h4 className="text-sm font-semibold text-gray-900">{category.category}</h4>
                  <ul className="mt-1 space-y-2">
                    {category.items.map((item) => (
                      <li key={item.name} className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-sm text-gray-800">{item.name}</p>
                          <p className="text-xs italic text-gray-500">{item.description_vi}</p>
                        </div>
                        <p className="shrink-0 text-sm font-medium text-brand-dark">
                          {formatPrice(item.price_usd)}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-1 text-sm text-gray-500">Details coming soon.</p>
          )}
        </div>
      ))}
    </div>
  );
}
