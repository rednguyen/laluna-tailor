import diningMenuData from "@/data/dining-menu.json";

export type DiningMenuItem = {
  name: string;
  description_vi: string;
  price_usd: number;
};

export type DiningMenuCategory = {
  category: string;
  items: DiningMenuItem[];
};

export const diningMenu: DiningMenuCategory[] = diningMenuData;

export function findDiningItem(name: string): DiningMenuItem | undefined {
  for (const category of diningMenu) {
    const item = category.items.find((i) => i.name === name);
    if (item) return item;
  }
  return undefined;
}

export function formatUsd(price: number): string {
  return `$${price.toFixed(2)}`;
}

export function getDiningItemsByCategory(category: string): DiningMenuItem[] {
  return diningMenu.find((c) => c.category === category)?.items ?? [];
}

export function getDiningCategories(categoryNames: string[]): DiningMenuCategory[] {
  return diningMenu.filter((c) => categoryNames.includes(c.category));
}
