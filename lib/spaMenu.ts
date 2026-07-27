import spaMenuData from "@/data/spa-menu.json";

export type SpaMenuItem = {
  name: string;
  description: string;
  price: number;
};

export type SpaMenuCategory = {
  category: string;
  items: SpaMenuItem[];
};

export const spaMenu: SpaMenuCategory[] = spaMenuData;

export function findSpaItem(name: string): SpaMenuItem | undefined {
  for (const category of spaMenu) {
    const item = category.items.find((i) => i.name === name);
    if (item) return item;
  }
  return undefined;
}
