import json
c = json.load(open('src/data/compounds.json'))
by_slug = {x["slug"]: x for x in c}
by_name = {}
for x in c:
    by_name.setdefault(x["name"].lower(), []).append(x["slug"])

# VialVerse slugs from the sitemap -> target VP compound slug
VV = {
 "retatrutide":"retatrutide", "mots-c":"mots-c", "nad":"nad-plus", "bpc-157":"bpc-157",
 "ghk-cu":"ghk-cu", "glow-blend":None, "tesamorelin":"tesamorelin",
 "cjc-1295-ipamorelin":"cjc-1295-ipamorelin-blend", "klow-blend":"klow-blend",
 "tb-500":"tb-500", "ipamorelin":"ipamorelin", "cjc-1295-no-dac":"cjc-1295-no-dac",
 "cjc-1295-with-dac":None, "semax":"semax", "5-amino-1mq":"5-amino-1mq",
 "adipotide":None, "melanotan-ii":"melanotan-ii", "ll-37":"ll-37",
 "slu-pp-332":"slu-pp-332", "abaloparatide":None, "teriparatide":None,
 "thymosin-alpha-1":"thymosin-alpha-1", "survodutide":"survodutide",
 "sermorelin":"sermorelin", "pt-141":"pt-141", "glutathione":"glutathione",
 "melanotan-i":"mt-1", "snap-8":None, "igf-1-lr3":"igf-1-lr3", "selank":"selank",
 "ghrp-6":"ghrp-6", "ara-290":"ara-290", "ss-31":"ss-31", "cagrilintide":"cagrilintide",
 "aicar":None, "pe-22-28":"pe-22-28", "thymulin":None,
 "tesamorelin-ipamorelin":None, "matrixyl":None, "hexarelin":"hexarelin",
 "bpc-157-tb-500":None, "ghrp-2":"ghrp-2", "dsip":"dsip", "mazdutide":"mazdutide",
 "aod-9604":"aod-9604", "adamax":None, "kisspeptin-10":"kisspeptin",
 "oxytocin":"oxytocin-acetate", "kpv":"kpv", "vip":None, "p21":"p21", "pnc-27":None,
}
print("=== VIALVERSE -> compounds.json mapping ===")
missing = []
for vs, tgt in sorted(VV.items()):
    if tgt is None:
        print(f"  -- {vs:26} NO TARGET (needs new compound? check)")
        continue
    if tgt in by_slug:
        comp = by_slug[tgt]
        print(f"  OK {vs:26} -> {tgt:26} ({comp['name']})")
    else:
        print(f"  XX {vs:26} -> {tgt:26} *** NOT FOUND ***")
        missing.append((vs, tgt))
print("\nMISSING targets:", missing)
