import json
import re
import subprocess
import sys
from pathlib import Path


SCRIPT_DIR = Path(__file__).resolve().parent
SOURCE_PATH = SCRIPT_DIR / "sector-building-types-tr-source.json"
OUTPUT_PATH = SCRIPT_DIR / "sector-building-types-translations-eu.json"

LOCALES = ["en", "de", "fr", "es", "it"]

BRANDS = [
    "Dragonfly",
    "Marlin",
    "Hound",
    "Turtle",
    "Koi",
    "Bear",
    "Nautilus",
    "Heron",
    "Owl",
    "Tiger",
    "Scallop",
    "Chicken",
    "Hummingbird",
    "Caracal",
    "Alpaca",
    "Seahorse",
    "Butterfly",
    "Elephant",
    "REMORA",
    "Hawk",
    "FlaktEdge",
    "Lion",
]

KEEP_TERMS = BRANDS + [
    "Jet Fan",
    "AHU",
    "HEPA",
    "ATEX",
    "EC Fan",
    "PLC",
    "UV-C",
    "BIM",
    "CAD",
    "FPSO",
    "NOVVES",
]

PRODUCT_TR_TO_EN = {
    "Duman Fan\\u0131": "Smoke Fan",
    "Duman Fan": "Smoke Fan",
    "Kanal Fan\\u0131": "Duct Fan",
    "Kanal Fan": "Duct Fan",
    "Damper": "Damper",
    "Aksiyel Fan": "Axial Fan",
    "Salyangoz Fan": "Centrifugal Fan",
    "\\u00c7at\\u0131 Fan\\u0131": "Roof Fan",
    "\\u00c7at\\u0131 Fan": "Roof Fan",
    "Egzoz Fan\\u0131": "Exhaust Fan",
    "Egzoz Fan": "Exhaust Fan",
    "H\\u00fccreli Fan": "Cabinet Fan",
    "Bas\\u0131n\\u00e7land\\u0131rma Fan\\u0131": "Pressurization Fan",
    "Bas\\u0131n\\u00e7land\\u0131rma Fan": "Pressurization Fan",
    "Klima Santrali": "Air Handling Unit",
    "Menfez": "Air Grille",
    "Filtre": "Filter",
    "Anemostad": "Anemostat",
    "Is\\u0131 Geri Kazan\\u0131m": "Heat Recovery",
    "Mutfak Egzoz Fan\\u0131": "Kitchen Exhaust Fan",
    "Mutfak Fan\\u0131": "Kitchen Fan",
    "Mutfak Fan": "Kitchen Fan",
    "Ex-proof Fan": "ATEX Fan",
    "Duvar Fan\\u0131": "Wall Fan",
    "Duvar Tipi Fan": "Wall Fan",
    "Otomasyon Panosu": "Automation Panel",
    "Otomasyon Paneli": "Automation Panel",
    "Otomasyon Pano": "Automation Panel",
    "Sinyal Kablolama": "Signal Cabling",
    "Otomatik Damper": "Automatic Damper",
    "R\\u00f6le": "Relay",
    "CO Dedekt\\u00f6r": "CO Detector",
    "CO Dedekt\\u00f6rleri": "CO Detectors",
    "Mini PLC": "Mini PLC",
    "Ak\\u0131ll\\u0131 Sens\\u00f6r": "Smart Sensor",
    "Kompakt Fan": "Compact Fan",
    "HEPA Fan": "HEPA Fan",
    "F9 Sens\\u00f6r": "F9 Sensor",
    "Otomasyonlu Damper": "Automated Damper",
    "Banyo Fan\\u0131": "Bathroom Fan",
    "Yang\\u0131n Damperi": "Fire Damper",
    "Marin Fan": "Marine Fan",
    "Toz Toplama": "Dust Collection",
    "Toz Toplama Fan\\u0131": "Dust Collection Fan",
    "Siklonlu Sistem": "Cyclone System",
    "Hijyenik Klima Santrali": "Hygienic Air Handling Unit",
    "Hijyenik AHU": "Hygienic AHU",
    "Kompakt AHU": "Compact AHU",
    "Paslanmaz G\\u00f6vde": "Stainless Steel Casing",
    "Tavuk\\u00e7u Fan\\u0131": "Poultry Fan",
    "Tavuk\\u00e7u Fan": "Poultry Fan",
    "Tavuk Fan\\u0131": "Poultry Fan",
    "Tavuk Fan": "Poultry Fan",
    "Kanal Tipi Fan": "Duct-Type Fan",
    "\\u00c7ift y\\u00f6nl\\u00fc Aksiyel Fan": "Reversible Axial Fan",
    "Kompakt Ex-proof Fan": "Compact ATEX Fan",
    "Hijyenik Ex-proof Fan": "Hygienic ATEX Fan",
    "Filtreli Egzoz Fan": "Filtered Exhaust Fan",
    "Dual mod\\u00fcl": "Dual Module",
    "CFD Analizi": "CFD Analysis",
    "Jet Fan Konumland\\u0131rma": "Jet Fan Positioning",
    "Teknik Dosya": "Technical File",
    "Ak\\u0131\\u015f analizleri": "Flow Analyses",
    "Proje dosyas\\u0131 haz\\u0131rl\\u0131\\u011f\\u0131": "Project File Preparation",
    "hesap raporu": "Calculation Report",
    "Yang\\u0131n m\\u00fchendisli\\u011fi deste\\u011fi": "Fire Engineering Support",
    "senaryo dan\\u0131\\u015fmanl\\u0131\\u011f\\u0131": "Scenario Consulting",
    "CAD destekli yerle\\u015fim": "CAD-assisted Layout",
    "teknik \\u015fablon haz\\u0131rlama": "Technical Template Preparation",
}

TR_CHARS = "\\u00e7\\u011f\\u0131\\u00f6\\u015f\\u00fc\\u00c7\\u011e\\u0130\\u00d6\\u015e\\u00dc"


def u(s: str) -> str:
    return bytes(s, "utf-8").decode("unicode_escape")


def ensure_translator():
    try:
        from deep_translator import GoogleTranslator
    except Exception:
        subprocess.check_call([sys.executable, "-m", "pip", "install", "deep-translator", "-q"])
        from deep_translator import GoogleTranslator
    return GoogleTranslator


def protect(text: str, terms):
    out = text
    mapping = {}
    for i, t in enumerate(sorted(set(terms), key=len, reverse=True)):
        token = f"__KEEP_{i}__"
        if t in out:
            out = out.replace(t, token)
            mapping[token] = t
    return out, mapping


def unprotect(text: str, mapping):
    out = text
    for token, val in mapping.items():
        out = out.replace(token, val)
    return out


def translate(translator_cls, text: str, source: str, target: str) -> str:
    if not text:
        return text
    return translator_cls(source=source, target=target).translate(text)


def clean(text: str) -> str:
    return re.sub(r"\\s+", " ", text).replace(" ,", ",").strip()


def products_tr_to_en(text: str) -> str:
    escaped = text.encode("unicode_escape").decode("ascii")
    for tr_term, en_term in sorted(PRODUCT_TR_TO_EN.items(), key=lambda x: len(x[0]), reverse=True):
        escaped = escaped.replace(tr_term, en_term)
    return bytes(escaped, "utf-8").decode("unicode_escape")


def has_turkish(text: str) -> bool:
    tr_re = re.compile("[" + TR_CHARS + "]")
    return bool(tr_re.search(text))


def main():
    GoogleTranslator = ensure_translator()
    source = json.loads(SOURCE_PATH.read_text(encoding="utf-8"))
    result = {loc: {} for loc in LOCALES}

    for solution_key, rows in source.items():
        for loc in LOCALES:
            result[loc][solution_key] = []

        for idx, row in enumerate(rows):
            b_tr = row["buildingType"]
            d_tr = row["description"]
            p_tr = row["products"]

            b_pro, b_map = protect(b_tr, KEEP_TERMS)
            d_pro, d_map = protect(d_tr, KEEP_TERMS)
            p_en_base = products_tr_to_en(p_tr)
            p_pro, p_map = protect(p_en_base, KEEP_TERMS)

            en_b = unprotect(translate(GoogleTranslator, b_pro, "tr", "en"), b_map)
            en_d = unprotect(translate(GoogleTranslator, d_pro, "tr", "en"), d_map)
            en_p = unprotect(translate(GoogleTranslator, p_pro, "en", "en"), p_map)

            if solution_key == "dumanIsiTahliye" and idx == 0:
                en_b = "Enclosed Car Parks"

            result["en"][solution_key].append(
                {"buildingType": clean(en_b), "description": clean(en_d), "products": clean(en_p)}
            )

            for loc in ["de", "fr", "es", "it"]:
                l_b = unprotect(translate(GoogleTranslator, b_pro, "tr", loc), b_map)
                l_d = unprotect(translate(GoogleTranslator, d_pro, "tr", loc), d_map)
                l_p = unprotect(translate(GoogleTranslator, p_pro, "en", loc), p_map)
                result[loc][solution_key].append(
                    {"buildingType": clean(l_b), "description": clean(l_d), "products": clean(l_p)}
                )

    keys = set(source.keys())
    for loc in LOCALES:
        if set(result[loc].keys()) != keys:
            raise ValueError(f"{loc} has key mismatch")
        for key in keys:
            if len(result[loc][key]) != len(source[key]):
                raise ValueError(f"{loc}.{key} length mismatch")
            for item in result[loc][key]:
                if set(item.keys()) != {"buildingType", "description", "products"}:
                    raise ValueError(f"{loc}.{key} item shape invalid")
                if has_turkish(item["buildingType"]) or has_turkish(item["description"]):
                    raise ValueError(f"{loc}.{key} still contains Turkish chars")

    if result["en"]["dumanIsiTahliye"][0]["buildingType"] == u("Kapal\\u0131 Otoparklar"):
        raise ValueError("en.dumanIsiTahliye[0].buildingType still Turkish")

    OUTPUT_PATH.write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Wrote: {OUTPUT_PATH}")
    print("en.dumanIsiTahliye[0].buildingType =", result["en"]["dumanIsiTahliye"][0]["buildingType"])


if __name__ == "__main__":
    main()
