"use client";

import { useState } from "react";

type SizeVariant = "sm" | "md" | "lg";

const SIZE_MAP: Record<SizeVariant, string> = {
  sm: "w-14 h-14",
  md: "w-28 h-20 md:w-40 md:h-24",
  lg: "w-[72px] h-[72px]",
};

export default function VendorLogo({
  slug,
  name,
  size = "md",
}: {
  slug: string;
  name: string;
  size?: SizeVariant;
}) {
  const [src, setSrc] = useState(`/images/vendors/${slug}.svg`);
  const [fallback, setFallback] = useState<"svg" | "png" | "initials">("svg");
  const sizeClass = SIZE_MAP[size];

  const onImgError = () => {
    if (fallback === "svg") {
      setFallback("png");
      setSrc(`/images/vendors/${slug}.png`);
    } else {
      setFallback("initials");
    }
  };

  if (fallback === "initials") {
    const initials = name
      .split(" ")
      .map((w: string) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
    return (
      <div
        className={`${sizeClass} flex items-center justify-center text-gray-400 font-bold text-lg`}
      >
        {initials}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={name}
      onError={onImgError}
      className={`${sizeClass} object-contain`}
    />
  );
}
