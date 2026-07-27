"use client";

import { useState } from "react";
import Modal from "./Modal";
import ComboBookingFormModal from "./ComboBookingFormModal";
import { findDiningItem, formatUsd } from "@/lib/diningMenu";
import { findSpaItem } from "@/lib/spaMenu";
import type { DiningSpaCombo } from "@/lib/diningSpaCombos";

export default function DiningSpaComboCard({ combo }: { combo: DiningSpaCombo }) {
  const [openModal, setOpenModal] = useState<"info" | "book" | null>(null);
  const diningItem = findDiningItem(combo.diningItemName);
  const spaItem = findSpaItem(combo.spaItemName);

  return (
    <div className="flex flex-col rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900">{combo.name}</h3>
      <p className="mt-1 text-sm text-gray-500">
        {combo.diningItemName} + {combo.spaItemName}
      </p>
      <p className="mt-2 text-lg font-semibold text-brand-dark">{formatUsd(combo.price)}</p>

      <div className="mt-4 flex w-full gap-2">
        <button
          type="button"
          onClick={() => setOpenModal("info")}
          className="flex-1 rounded-lg border border-brand-dark py-2 text-sm font-medium text-brand-dark transition-all duration-150 hover:bg-brand-tint/40 hover:shadow-sm active:scale-95"
        >
          More Info
        </button>
        <button
          type="button"
          onClick={() => setOpenModal("book")}
          className="flex-1 rounded-lg bg-brand py-2 text-sm font-medium text-brand-contrast transition-all duration-150 hover:bg-brand-hover hover:shadow-md active:scale-95"
        >
          Book Now
        </button>
      </div>

      {openModal === "info" && (
        <Modal title={combo.name} onClose={() => setOpenModal(null)}>
          <div className="space-y-4">
            {diningItem && (
              <div>
                <h4 className="text-sm font-semibold text-brand-dark">Dining</h4>
                <ul className="list-disc space-y-0.5 pl-5 text-sm text-gray-800">
                  <li>1 Appetizer &amp; Salad of your choice</li>
                  <li>{diningItem.name}</li>
                  <li>1 Dessert of your choice</li>
                </ul>
                <p className="text-xs italic text-gray-500">{diningItem.description_vi}</p>
              </div>
            )}
            {spaItem && (
              <div>
                <h4 className="text-sm font-semibold text-brand-dark">Spa</h4>
                <p className="text-sm text-gray-800">{spaItem.name}</p>
                <p className="text-xs text-gray-500">{spaItem.description}</p>
              </div>
            )}
            <div className="rounded-lg bg-brand-tint/40 p-4 text-center">
              <p className="text-sm text-gray-500">Combo Price</p>
              <p className="text-xl font-bold text-brand-dark">{formatUsd(combo.price)}</p>
            </div>
          </div>
        </Modal>
      )}

      {openModal === "book" && diningItem && spaItem && (
        <ComboBookingFormModal
          combo={combo}
          mainDish={diningItem.name}
          spaTreatment={spaItem.name}
          onClose={() => setOpenModal(null)}
        />
      )}
    </div>
  );
}
