import json, urllib.request

pmids = {
 "18061177":"PepT1-mediated tripeptide KPV uptake reduces intestinal inflammation",
 "18092346":"Melanocortin-derived tripeptide KPV anti-inflammatory murine IBD",
 "28143741":"Orally Targeted Delivery of Tripeptide KPV ... Ulcerative Colitis",
 "15102092":"alpha-MSH, MSH 11-13 KPV and ACTH signalling human keratinocyte",
 "16965771":"alpha-MSH(11-13) corneal epithelial wound healing nitric oxide",
 "35245681":"KPV-binding double-network hydrogel gut mucosal barrier",
 "12851308":"alpha-MSH and related peptides in the immune system",
 "11673763":"Increase of fat oxidation and weight loss in obese mice ... modified C-terminal fragment",
 "11713213":"effects of human GH and its lipolytic fragment (AOD9604) on lipid metabolism",
 "15134286":"AOD-9604 Metabolic",
 "25738459":"MOTS-c promotes metabolic homeostasis reduces obesity insulin resistance",
 "25738453":"A mitochondrially encoded hormone ameliorates obesity and insulin resistance",
 "33722744":"MOTS-c interacts synergistically with exercise ... PGC-1a",
 "36233287":"MOTS-c ... in Human Aging and Age-Related Diseases",
 "36761202":"MOTS-c: A promising mitochondrial-derived peptide for therapeutic exploitation",
 "42611943":"MOTS-c is a mitochondrial-encoded interferon-linked host defense peptide",
 "21548867":"Stable gastric pentadecapeptide BPC 157 ... gastrointestinal tract",
 "22074294":"Thymosin beta4: a multi-functional regenerative peptide",
 "26236730":"GHK Peptide as a Natural Modulator of Multiple Cellular Pathways in Skin Regeneration",
 "24487520":"Collagen-based matrices with different copper contents for wound-healing",
 "10469335":"Thymosin beta4 accelerates wound healing",
}
url = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&retmode=json&id=" + ",".join(pmids)
with urllib.request.urlopen(url, timeout=60) as r:
    res = json.load(r)["result"]
for k, expect in pmids.items():
    v = res.get(k, {})
    print("PMID", k, "|", v.get("sortfirstauthor","?"), "|", v.get("source","?"), v.get("pubdate","?"), "|", v.get("title","MISSING")[:120])
