export type ComboService = "spa" | "dining" | "tours";

export type ComboPackage = {
  id: string;
  name: string;
  includes: ComboService[];
};

export const comboPackages: ComboPackage[] = [
  { id: "spa-dining", name: "Spa + Dining", includes: ["spa", "dining"] },
  { id: "tours-dining", name: "Tours + Dining", includes: ["tours", "dining"] },
  {
    id: "spa-tours-dining",
    name: "Spa + Tours + Dining",
    includes: ["spa", "tours", "dining"],
  },
];

export const comboServiceLabels: Record<ComboService, string> = {
  spa: "Spa",
  dining: "Dining",
  tours: "Tours",
};
