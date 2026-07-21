"use client";

import { useState } from "react";

type SizeVariant = "sm" | "md" | "lg";

const SIZE_MAP: Record<SizeVariant, string> = {
  sm: "w-14 h-14",
  md: "w-36 h-28 md:w-52 md:h-32",
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
  const [src, setSrc] = useState(`/images/vendors/${slug}.png`);
  const [fallback, setFallback] = useState<"png" | "svg" | "initials">("png");
  const sizeClass = SIZE_MAP[size];

  const onImgError = () => {
    if (fallback === "png") {
      setFallback("svg");
      setSrc(`/images/vendors/${slug}.svg`);
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
      className={`${sizeClass} object-contain mx-auto`}
    />
  );
}
