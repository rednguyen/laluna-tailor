"use client";

import Modal from "./Modal";
import ShopLogo from "./ShopLogo";
import type { Shop } from "@/lib/shops";
import { googleMapsUrl } from "@/lib/googleMaps";

type ShopInfoModalProps = {
  shop: Shop;
  onClose: () => void;
};

export default function ShopInfoModal({ shop, onClose }: ShopInfoModalProps) {
  return (
    <Modal title={shop.name} onClose={onClose}>
      <div className="flex items-center gap-4">
        <ShopLogo src={shop.logo} name={shop.name} size={56} />
        <a
          href={googleMapsUrl(shop.address)}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-gray-500 underline-offset-2 hover:text-brand-dark hover:underline"
        >
          {shop.address}
        </a>
      </div>
      <p className="mt-4 whitespace-pre-line text-gray-700">{shop.description}</p>
    </Modal>
  );
}
