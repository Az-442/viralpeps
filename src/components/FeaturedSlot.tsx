"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

/**
 * FeaturedSlot — the approved "sponsored" block for compound-guide (silo) pages.
 * Design matches /tmp/vp-mockups/2-silo-featured.html exactly.
 *
 * Renders in the silo hero's right column:
 *   SPONSORED flag + TrustScore chip
 *   vial / vendor image, supplier + product, stars, badges
 *   was/now price + per-mg + SAVE chip
 *   amber CTA + dispatch line + disclosure
 *
 * Driven entirely by props so every silo (Reta, Tirze, and future compounds)
 * renders from one component.
 */

export interface FeaturedSlotData {
  vendorName: string;
  vendorSlug: string;
  compoundName: string;
  pack: string;
  price: number;
  perMg: number | null;
  trustScore: number | null;
  rating?: number | null;
  inStock: boolean;
  verified: boolean;
  goUrl: string;
  imageUrl?: string | null;
  vendorSlugFallback?: string;
  compoundSlugFallback?: string;
}

export default function FeaturedSlot({ data }: { data: FeaturedSlotData }) {
  const {
    vendorName,
    compoundName,
    pack,
    price,
    perMg,
    trustScore,
    rating,
    inStock,
    verified,
    goUrl,
    imageUrl,
    vendorSlugFallback,
    compoundSlugFallback,
  } = data;

  // Resolve the product image with the same fallback chain ProductImage uses,
  // so we never render a broken <img>.
  const [resolvedImg, setResolvedImg] = useState<string | null>(imageUrl || null);

  useEffect(() => {
    if (imageUrl) {
      setResolvedImg(imageUrl);
      return;
    }
    if (!vendorSlugFallback || !compoundSlugFallback) return;

    let cancelled = false;
    const base = `/images/products/${vendorSlugFallback}/${compoundSlugFallback}`;
    const candidates = [
      `${base}.webp`,
      `${base}.png`,
      `${base}.jpg`,
      `/images/vendors/${vendorSlugFallback}.png`,
      `/images/vendors/${vendorSlugFallback}.webp`,
      `/images/vendors/${vendorSlugFallback}.svg`,
      `/images/compounds/${compoundSlugFallback}.png`,
    ];

    (async () => {
      for (const url of candidates) {
        if (cancelled) return;
        try {
          const res = await fetch(url, { method: "HEAD" });
          if (res.ok) {
            if (!cancelled) setResolvedImg(url);
            return;
          }
        } catch {
          /* try next */
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [imageUrl, vendorSlugFallback, compoundSlugFallback]);

  const wasPrice = price > 0 ? price * 1.18 : null;
  const saveAmount = wasPrice !== null ? wasPrice - price : null;

  return (
    <>
      <div className="relative rounded-[14px] overflow-hidden border-2 border-amber-500 bg-[linear-gradient(165deg,#ffffff_0%,#fffbeb_58%,#fef3c7_100%)] px-[18px] pt-[18px] pb-4 shadow-[0_18px_44px_-18px_rgba(217,119,6,0.55)]">
        {/* soft glow top-right */}
        <div className="absolute -top-[40px] -right-[40px] w-[130px] h-[130px] rounded-full bg-[radial-gradient(circle,rgba(251,191,36,0.28),rgba(251,191,36,0)_70%)] pointer-events-none" />

        {/* header row */}
        <div className="relative z-[2] flex items-center justify-between gap-2 mb-[13px]">
          <span className="inline-flex items-center gap-1.5 bg-[linear-gradient(90deg,#b45309,#f59e0b)] text-white text-[9px] font-black tracking-[0.13em] uppercase px-[11px] py-[5px] rounded-full shadow-[0_3px_9px_-2px_rgba(180,83,9,0.5)]">
            <svg viewBox="0 0 24 24" className="w-2.5 h-2.5 fill-white">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            Sponsored
          </span>
          {trustScore !== null && (
            <span className="flex items-center gap-1 bg-emerald-800 text-white rounded-full px-[9px] py-1 text-[10px] font-extrabold">
              <b className="text-xs">{trustScore}</b>
              <i className="not-italic text-[8.5px] opacity-70">/100</i>
            </span>
          )}
        </div>

        {/* body: image + info */}
        <div className="relative z-[2] flex gap-[13px] items-start">
          <div className="flex-none w-[74px] h-[96px] rounded-[10px] border border-slate-200 bg-[radial-gradient(circle_at_50%_32%,#fff,#eef2ff_65%,#e2e8f0)] flex items-center justify-center overflow-hidden">
            {resolvedImg ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={resolvedImg} alt={compoundName} className="w-full h-full object-contain p-1" />
            ) : (
              <span className="text-[9px] text-slate-400 font-bold tracking-wide text-center px-1">
                {vendorName}
              </span>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-base font-extrabold text-slate-900 tracking-[-0.02em] mb-0.5 leading-tight">
              {vendorName}
            </h3>
            <p className="text-[11.5px] font-semibold text-slate-500 mb-2">
              {compoundName}
              {pack ? ` ${pack}` : ""}
            </p>

            {rating ? (
              <div className="flex items-center gap-1 mb-2">
                <svg width="58" height="11" viewBox="0 0 58 11" fill="#f59e0b">
                  <path d="M5.5 0l1.6 3.3 3.6.5-2.6 2.6.6 3.6-3.2-1.7-3.2 1.7.6-3.6L.3 3.8l3.6-.5L5.5 0zm12 0l1.6 3.3 3.6.5-2.6 2.6.6 3.6-3.2-1.7-3.2 1.7.6-3.6L12.3 3.8l3.6-.5L17.5 0zm12 0l1.6 3.3 3.6.5-2.6 2.6.6 3.6-3.2-1.7-3.2 1.7.6-3.6L24.3 3.8l3.6-.5L29.5 0zm12 0l1.6 3.3 3.6.5-2.6 2.6.6 3.6-3.2-1.7-3.2 1.7.6-3.6L36.3 3.8l3.6-.5L41.5 0zm12 0l1.6 3.3 3.6.5-2.6 2.6.6 3.6-3.2-1.7-3.2 1.7.6-3.6L48.3 3.8l3.6-.5L53.5 0z" />
                </svg>
                <span className="text-[11.5px] font-extrabold text-slate-900">{rating.toFixed(1)}</span>
              </div>
            ) : null}

            <div className="flex flex-wrap gap-1.5">
              {verified && (
                <span className="text-[9.5px] font-bold px-[7px] py-[3px] rounded-full border text-emerald-700 bg-emerald-50 border-emerald-200">
                  Lab Tested
                </span>
              )}
              {inStock && (
                <span className="text-[9.5px] font-bold px-[7px] py-[3px] rounded-full border text-emerald-700 bg-emerald-50 border-emerald-200">
                  In Stock
                </span>
              )}
              <span className="text-[9.5px] font-bold px-[7px] py-[3px] rounded-full border text-blue-700 bg-blue-50 border-blue-200">
                Free Delivery
              </span>
            </div>
          </div>
        </div>

        {/* price row */}
        <div className="relative z-[2] mt-[14px] pt-3 border-t border-dashed border-amber-300 flex items-end justify-between gap-2.5">
          <div>
            {wasPrice !== null && (
              <div className="text-[10.5px] text-slate-400 line-through mb-0.5">
                £{wasPrice.toFixed(2)}
              </div>
            )}
            <div className="text-[27px] font-black text-slate-900 tracking-[-0.035em] leading-none">
              <sup className="text-sm font-extrabold align-super mr-px">£</sup>
              {Math.floor(price)}
              <sup className="text-sm font-extrabold align-super">
                .{(price % 1).toFixed(2).slice(2)}
              </sup>
            </div>
            <div className="text-[10px] font-bold text-slate-500 mt-1">
              {perMg !== null ? `£${perMg.toFixed(2)} per mg` : "UK stock"}
              {pack ? ` · ${pack}` : ""}
            </div>
          </div>
          {saveAmount !== null && saveAmount > 0 && (
            <span className="text-[9px] font-black tracking-[0.06em] uppercase text-white bg-red-600 px-[7px] py-0.5 rounded mb-[3px]">
              Save £{saveAmount.toFixed(2)}
            </span>
          )}
        </div>

        <a
          href={goUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="relative z-[2] block w-full mt-3 text-center bg-[linear-gradient(180deg,#f59e0b,#d97706)] text-white text-[13px] font-extrabold tracking-[0.02em] px-4 py-[11px] rounded-[9px] shadow-[0_6px_16px_-6px_rgba(217,119,6,0.8)] hover:brightness-105 transition"
        >
          View Deal →
        </a>

        <div className="relative z-[2] text-[9.5px] text-slate-500 font-semibold text-center mt-[7px]">
          {inStock ? <b className="text-emerald-700">In stock</b> : <b className="text-amber-700">Check stock</b>}
          {" "}· dispatched within 24h
        </div>
        <div className="relative z-[2] text-[8.5px] text-zinc-400 text-center mt-[5px]">
          Paid placement · rankings unaffected
        </div>
      </div>

      <p className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400 text-center mt-2.5">
        <svg width="11" height="11" viewBox="0 0 24 24" fill="#94a3b8">
          <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
        </svg>
        Paid placement — clearly marked. Does not affect supplier rankings or TrustScore.
      </p>
    </>
  );
}
