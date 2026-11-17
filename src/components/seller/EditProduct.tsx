"use client";

import { useState } from "react";
import Link from "next/link";
import SellerSidebar from "./SellerSidebar";

export default function EditProduct(props: {
  slug: string;
  name: string;
  compoundName: string;
  dosage: string;
  url: string;
  price: string;
  inStock: boolean;
  coa: boolean;
}) {
  const [productUrl, setProductUrl] = useState(props.url);
  const [stock, setStock] = useState(props.inStock ? "In Stock" : "Out of Stock");
  const [format, setFormat] = useState("Vial");
  const [active, setActive] = useState(true);
  const [labTested, setLabTested] = useState(props.coa);
  const [reportMode, setReportMode] = useState<"link" | "upload">("link");
  const [provider, setProvider] = useState("");
  const [resultsUrl, setResultsUrl] = useState("");

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <SellerSidebar name={props.name} slug={props.slug} active="products" />
      <div className="ml-64 p-6">
        <div className="max-w-5xl">
          <div className="mb-6">
        <Link href={`/sellers/${props.slug}`} className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 mb-2">
          <span aria-hidden>←</span> Back
        </Link>
        <h1 className="text-xl font-bold">Edit Product</h1>
        <p className="text-sm text-gray-700 mt-0.5">Update your product details and pricing.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Product Details */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <h2 className="font-semibold mb-4">Product Details</h2>
          <label className="block text-sm text-gray-700 mb-1">Peptide</label>
          <select className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 mb-4 text-gray-900" defaultValue={props.compoundName}>
            <option value={props.compoundName}>{props.compoundName}</option>
          </select>

          <label className="block text-sm text-gray-700 mb-1">Dosage</label>
          <select className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 mb-4 text-gray-900" defaultValue={props.dosage}>
            <option value={props.dosage}>{props.dosage}</option>
          </select>

          <label className="block text-sm text-gray-700 mb-1">Product URL</label>
          <input
            type="text"
            value={productUrl}
            onChange={(e) => setProductUrl(e.target.value)}
            className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 text-gray-900"
          />
          <p className="text-xs text-gray-600 mt-1.5">
            The direct URL to this product on your website. We read your price and product image straight from this page, so make sure it is publicly reachable.
          </p>
        </div>

        {/* Availability */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <h2 className="font-semibold mb-4">Availability</h2>
          <label className="block text-sm text-gray-700 mb-1">Stock Status</label>
          <select value={stock} onChange={(e) => setStock(e.target.value)} className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 mb-4 text-gray-900">
            <option>In Stock</option>
            <option>Low Stock</option>
            <option>Out of Stock</option>
          </select>

          <label className="block text-sm text-gray-700 mb-1">Format</label>
          <select value={format} onChange={(e) => setFormat(e.target.value)} className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 mb-4 text-gray-900">
            <option>Vial</option>
            <option>Pen</option>
            <option>Blend</option>
          </select>

          <label className="flex items-start gap-2.5 cursor-pointer">
            <input type="checkbox" checked={active} onChange={(e) => setActive(e.target.checked)} className="mt-0.5 h-4 w-4 text-gray-900" />
            <span className="text-sm text-gray-900 font-medium">Active</span>
          </label>
          <p className="text-xs text-gray-600 mt-1.5 ml-6.5">Uncheck to hide this product from the comparison site.</p>
        </div>

        {/* Pricing */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <h2 className="font-semibold mb-4">Pricing</h2>
          <div className="flex items-start gap-2 bg-gray-50 border border-gray-200 rounded-lg p-3 mb-4">
            <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-gray-300 text-white text-[10px] font-bold shrink-0 mt-0.5">i</span>
            <p className="text-xs text-gray-700">
              Prices are fetched automatically from your product URL, so they can&apos;t be edited here. Change the URL above and we&apos;ll re-read the price and product image from the new page as soon as you save.
            </p>
          </div>
          <label className="block text-sm text-gray-700 mb-1">Current Price</label>
          <input type="text" value={props.price} readOnly className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 mb-4 text-gray-900 bg-gray-50" />
          <label className="block text-sm text-gray-700 mb-1">Original Price</label>
          <input type="text" value="—" readOnly className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 text-gray-900 bg-gray-50" />
        </div>

        {/* Lab Testing */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <h2 className="font-semibold mb-4">Lab Testing</h2>
          <label className="flex items-center gap-2.5 cursor-pointer">
            <input type="checkbox" checked={labTested} onChange={(e) => setLabTested(e.target.checked)} className="h-4 w-4 text-gray-900" />
            <span className="text-sm text-gray-900 font-medium">Lab Tested</span>
          </label>
          <p className="text-xs text-gray-600 mt-1">Tick if this product has been third-party lab tested.</p>

          <div className="mt-4">
            <p className="text-sm text-gray-700 mb-1.5">How would you like to provide the test results?</p>
            <p className="text-xs text-gray-600 mb-2">Optional, but a linked or uploaded report is what turns your Lab tested badge into proof buyers can check.</p>
            <div className="inline-flex rounded-lg border border-gray-200 overflow-hidden">
              <button onClick={() => setReportMode("link")} className={`px-3 py-2 text-sm font-medium ${reportMode === "link" ? "bg-white text-gray-900" : "bg-gray-100 text-gray-600"}`}>Link to online results</button>
              <button onClick={() => setReportMode("upload")} className={`px-3 py-2 text-sm font-medium ${reportMode === "upload" ? "bg-white text-gray-900" : "bg-gray-100 text-gray-600"}`}>Upload a certificate</button>
            </div>
          </div>

          <label className="block text-sm text-gray-700 mb-1 mt-4">Testing Provider <span className="text-gray-500 font-normal">(Optional)</span></label>
          <select value={provider} onChange={(e) => setProvider(e.target.value)} className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 mb-4 text-gray-900">
            <option value="">Select a provider...</option>
            <option>Janoshik</option>
            <option>MZ Biolabs</option>
            <option>Other</option>
          </select>

          <label className="block text-sm text-gray-700 mb-1">Results URL <span className="text-gray-500 font-normal">(Optional)</span></label>
          <input type="text" value={resultsUrl} onChange={(e) => setResultsUrl(e.target.value)} placeholder="https://..." className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 text-gray-900" />
        </div>
      </div>
        </div>
      </div>
    </div>
  );
}
