"use client";

import { useState } from "react";
import Image from "next/image";

type ShopLogoProps = {
  src: string;
  name: string;
  size?: number;
};

export default function ShopLogo({ src, name, size = 64 }: ShopLogoProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    const initials = name
      .split(" ")
      .map((word) => word[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();

    return (
      <div
        style={{ width: size, height: size }}
        className="flex shrink-0 items-center justify-center rounded-full bg-brand-tint text-lg font-semibold text-brand-contrast"
      >
        {initials}
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={`${name} logo`}
      width={size}
      height={size}
      className="shrink-0 rounded-full object-cover"
      onError={() => setFailed(true)}
    />
  );
}
