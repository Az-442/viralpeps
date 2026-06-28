"use client";

interface ProductImageProps {
  vendorSlug: string;
  compoundSlug: string;
  compoundName: string;
}

export default function ProductImage({ vendorSlug, compoundSlug, compoundName }: ProductImageProps) {
  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    const currentSrc = img.src;
    
    if (currentSrc.endsWith(".webp")) {
      // Try .png next
      img.src = `/images/products/${vendorSlug}/${compoundSlug}.png`;
    } else if (currentSrc.endsWith(".png")) {
      // Try .jpg next
      img.src = `/images/products/${vendorSlug}/${compoundSlug}.jpg`;
    } else if (currentSrc.endsWith(".jpg")) {
      // Try generic vendor image
      img.src = `/images/products/${vendorSlug}/ukp-generic.webp`;
    } else if (currentSrc.includes("ukp-generic")) {
      // Fall back to compound SVG
      img.src = `/images/compounds/${compoundSlug}.svg`;
      img.className = "w-7 h-7 object-contain";
      img.onerror = null; // stop further fallback
    } else if (currentSrc.includes("/images/compounds/")) {
      // SVG also failed - clear handler
      img.onerror = null;
    }
  };

  return (
    <img
      src={`/images/products/${vendorSlug}/${compoundSlug}.webp`}
      alt={compoundName}
      className="w-full h-full object-contain p-1"
      onError={handleError}
    />
  );
}
