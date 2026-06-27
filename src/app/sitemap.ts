import { MetadataRoute } from "next";
import compounds from "@/data/compounds.json";
import vendors from "@/data/vendors.json";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.viralpeps.co.uk";

  const staticPages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "daily" as const, priority: 1.0 },
    { url: `${baseUrl}/compounds`, lastModified: new Date(), changeFrequency: "daily" as const, priority: 0.9 },
    { url: `${baseUrl}/vendors`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${baseUrl}/tools`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${baseUrl}/research`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.7 },
    { url: `${baseUrl}/vendors/register`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.4 },
  ];

  const compoundPages = compounds.map((c) => ({
    url: `${baseUrl}/compounds/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const vendorPages = vendors.map((v) => ({
    url: `${baseUrl}/vendors/${v.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...compoundPages, ...vendorPages];
}
