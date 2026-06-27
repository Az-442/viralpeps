"use client";

import { useState } from "react";

interface ProductImageProps {
  vendorSlug: string;
  compoundSlug: string;
  compoundName: string;
}

export default function ProductImage({ vendorSlug, compoundSlug, compoundName }: ProductImageProps) {
  const [imgSrc, setImgSrc] = useState(`/images/products/${vendorSlug}/${compoundSlug}.webp`);
  const [imgClass, setImgClass] = useState("w-full h-full object-cover");
  const [fallbackLevel, setFallbackLevel] = useState(0);

  const handleError = () => {
    if (fallbackLevel === 0) {
      setFallbackLevel(1);
      setImgSrc(`/images/products/${vendorSlug}/${compoundSlug}.png`);
    } else if (fallbackLevel === 1) {
      setFallbackLevel(2);
      setImgSrc(`/images/products/${vendorSlug}/ukp-generic.webp`);
    } else if (fallbackLevel === 2) {
      setFallbackLevel(3);
      setImgSrc(`/images/compounds/${compoundSlug}.svg`);
      setImgClass("w-7 h-7 object-contain");
    }
  };

  return (
    <img
      src={imgSrc}
      alt={compoundName}
      className={imgClass}
      onError={handleError}
    />
  );
}
