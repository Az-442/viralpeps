import compounds from "./compounds.json";
import vendors from "./vendors.json";

/** Master compounds (unique peptides, excluding vendor catalog entries) */
export const MASTER_COMPOUNDS = compounds.filter(
  (c) => !(c as any)?.compareSlug
);

/** Count of unique research peptides */
export const PEPTIDE_COUNT = MASTER_COMPOUNDS.length;

/** Count of unique suppliers */
export const SUPPLIER_COUNT = vendors.length;

/** All unique supplier names (from sources across all compounds) */
export const ALL_SUPPLIER_NAMES = new Set<string>();
for (const c of compounds) {
  for (const s of c.sources) {
    ALL_SUPPLIER_NAMES.add(s.vendor);
  }
}

/** Total product entries across all vendors (including catalog variants) */
export const TOTAL_PRODUCTS = compounds.length;
