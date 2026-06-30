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
      // Try vendor generic fallback
      img.src = `/images/vendors/${vendorSlug}.webp`;
    } else if (currentSrc.includes("vendors/") && currentSrc.endsWith(".webp")) {
      // Try compound image
      img.src = `/images/compounds/${compoundSlug}.png`;
      img.className = "w-10 h-10 object-contain";
      img.onerror = null;
    } else if (currentSrc.includes("/images/compounds/")) {
      // Compound image failed — clear handler, show nothing
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
