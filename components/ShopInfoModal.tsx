"use client";

import Modal from "./Modal";
import ShopLogo from "./ShopLogo";
import type { Shop } from "@/lib/shops";

type ShopInfoModalProps = {
  shop: Shop;
  onClose: () => void;
};

export default function ShopInfoModal({ shop, onClose }: ShopInfoModalProps) {
  return (
    <Modal title={shop.name} onClose={onClose}>
      <div className="flex items-center gap-4">
        <ShopLogo src={shop.logo} name={shop.name} size={56} />
        <p className="text-sm text-gray-500">{shop.address}</p>
      </div>
      <p className="mt-4 whitespace-pre-line text-gray-700">{shop.description}</p>
    </Modal>
  );
}
