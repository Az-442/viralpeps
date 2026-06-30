"use client";

import { useState } from "react";

interface ProductImageProps {
  vendorSlug: string;
  compoundSlug: string;
  compoundName: string;
  /** Optional direct image URL from the source data (e.g. supplier CDN) — used first if provided */
  sourceImageUrl?: string;
}

export default function ProductImage({
  vendorSlug,
  compoundSlug,
  compoundName,
  sourceImageUrl,
}: ProductImageProps) {
  const [fallbackStep, setFallbackStep] = useState(0);

  const currentSrc = (() => {
    const step = fallbackStep;
    if (step === 0 && sourceImageUrl) return sourceImageUrl;
    if (step === 0) return `/images/products/${vendorSlug}/${compoundSlug}.webp`;
    if (step === 1) return `/images/products/${vendorSlug}/${compoundSlug}.png`;
    if (step === 2) return `/images/products/${vendorSlug}/${compoundSlug}.jpg`;
    if (step === 3) return `/images/vendors/${vendorSlug}.png`;
    return `/images/compounds/${compoundSlug}.png`;
  })();

  const handleError = () => {
    if (fallbackStep >= 5) return; // give up
    setFallbackStep((n: number) => n + 1);
  };

  const imgClassName =
    fallbackStep >= 4
      ? "w-10 h-10 object-contain"
      : "w-full h-full object-contain p-1";

  return (
    <img
      src={currentSrc}
      alt={compoundName}
      className={imgClassName}
      onError={handleError}
    />
  );
}
