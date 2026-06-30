"use client";

import { useState, useEffect } from "react";

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
  // Determine the best image URL upfront by checking which file actually exists.
  // This avoids the preload-cache bug where a 404 HTML page is served as "loaded"
  // image content, preventing onError from firing.
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function findBestImage() {
      const candidates: string[] = [];

      // 1. CDN source image (if provided)
      if (sourceImageUrl) {
        candidates.push(sourceImageUrl);
      }

      const base = `/images/products/${vendorSlug}/${compoundSlug}`;

      // 2. Local .webp
      candidates.push(`${base}.webp`);
      // 3. Local .png
      candidates.push(`${base}.png`);
      // 4. Local .jpg
      candidates.push(`${base}.jpg`);
      // 5. Vendor logo
      candidates.push(`/images/vendors/${vendorSlug}.png`);
      // 6. Compound icon (fallback)
      candidates.push(`/images/compounds/${compoundSlug}.png`);

      for (const url of candidates) {
        if (cancelled) return;
        try {
          const res = await fetch(url, { method: "HEAD" });
          if (res.ok) {
            if (!cancelled) setImageUrl(url);
            return;
          }
        } catch {
          // Network error, try next candidate
        }
      }

      // If all candidates failed (shouldn't happen — compound icon is local), use compound icon
      if (!cancelled) setImageUrl(`/images/compounds/${compoundSlug}.png`);
    }

    findBestImage();
    return () => { cancelled = true; };
  }, [vendorSlug, compoundSlug, sourceImageUrl]);

  if (!imageUrl) {
    // Show a tiny placeholder while checking
    return <div className="w-full h-full flex items-center justify-center" />;
  }

  return (
    <img
      src={imageUrl}
      alt={compoundName}
      className="w-full h-full object-contain p-1"
    />
  );
}
