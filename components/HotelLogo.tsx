"use client";

import { useState } from "react";
import Image from "next/image";

export default function HotelLogo() {
  const [failed, setFailed] = useState(false);

  if (failed) return null;

  return (
    <Image
      src="/logo.png"
      alt="Laluna Hoi An Riverside Hotel & Spa"
      width={160}
      height={80}
      priority
      className="mx-auto mb-3 h-16 w-auto object-contain"
      onError={() => setFailed(true)}
    />
  );
}
