import json
import re
import time
from pathlib import Path

from deep_translator import GoogleTranslator


ROOT = Path(__file__).resolve().parent
TR_SOURCE_PATH = ROOT / "sector-building-types-tr-source.json"
REST_PATH = ROOT / "sector-building-types-translations-rest.json"
OUTPUT_PATH = ROOT / "sector-building-types-translations.json"

TARGET_LOCALES = [
    "en",
    "de",
    "fr",
    "es",
    "it",
    "ru",
    "ar",
    "az",
    "kk",
    "tg",
    "zh",
    "ur",
    "lt",
    "pl",
    "ro",
    "hu",
]

GENERATED_LANGS = {
    "en": "en",
    "de": "de",
    "fr": "fr",
    "es": "es",
    "it": "it",
    "ru": "ru",
    "ar": "ar",
    "lt": "lt",
    "pl": "pl",
    "ro": "ro",
    "hu": "hu",
}

FIELDS = ("buildingType", "description", "products")

# Keep technical/brand-like tokens unchanged during translation.
PROTECTED_TOKENS = [
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
    "Jet Fan",
    "AHU",
    "ATEX",
    "HEPA",
    "UV-C",
    "EC Fan",
    "CFD",
    "BMS",
    "PLC",
    "IoT",
    "CAD",
    "CO",
    "CO?",
    "F9",
]


def build_placeholders():
    return {token: f"__TERM_{i}__" for i, token in enumerate(PROTECTED_TOKENS)}


def protect_text(text: str, token_to_placeholder: dict[str, str]) -> str:
    protected = text
    for token, placeholder in token_to_placeholder.items():
        protected = protected.replace(token, placeholder)
    return protected


def unprotect_text(text: str, token_to_placeholder: dict[str, str]) -> str:
    restored = text
    for token, placeholder in token_to_placeholder.items():
        restored = restored.replace(placeholder, token)
    # Some engines occasionally insert spaces around placeholders.
    for token, placeholder in token_to_placeholder.items():
        spaced = re.sub(r"(_+)\s+", r"\1", placeholder)
        spaced = re.sub(r"\s+(_+)", r"\1", spaced)
        restored = restored.replace(spaced, token)
    return restored


def translate_unique_texts(unique_texts: list[str], target_lang: str) -> dict[str, str]:
    translator = GoogleTranslator(source="tr", target=target_lang)
    token_to_placeholder = build_placeholders()

    protected_inputs = [protect_text(text, token_to_placeholder) for text in unique_texts]
    translated_map: dict[str, str] = {}

    chunk_size = 40
    for start in range(0, len(protected_inputs), chunk_size):
        chunk = protected_inputs[start : start + chunk_size]
        originals = unique_texts[start : start + chunk_size]
        retries = 3
        while True:
            try:
                translated_chunk = translator.translate_batch(chunk)
                break
            except Exception:
                retries -= 1
                if retries == 0:
                    raise
                time.sleep(1.0)

        for original, translated in zip(originals, translated_chunk):
            final_text = unprotect_text(translated, token_to_placeholder).strip()
            translated_map[original] = final_text

    return translated_map


def main() -> None:
    with TR_SOURCE_PATH.open("r", encoding="utf-8") as f:
        tr_source = json.load(f)

    with REST_PATH.open("r", encoding="utf-8") as f:
        rest = json.load(f)

    # Collect all source texts once in stable order.
    unique_texts: list[str] = []
    seen: set[str] = set()
    for rows in tr_source.values():
        for row in rows:
            for field in FIELDS:
                value = row.get(field, "")
                if value not in seen:
                    seen.add(value)
                    unique_texts.append(value)

    generated_locales: dict[str, dict] = {}
    for locale, lang in GENERATED_LANGS.items():
        translated = translate_unique_texts(unique_texts, lang)
        locale_data = {}
        for key, rows in tr_source.items():
            locale_rows = []
            for row in rows:
                locale_rows.append(
                    {
                        "buildingType": translated[row["buildingType"]],
                        "description": translated[row["description"]],
                        "products": translated[row["products"]],
                    }
                )
            locale_data[key] = locale_rows
        generated_locales[locale] = locale_data

    merged: dict[str, dict] = {}
    for locale in TARGET_LOCALES:
        if locale in generated_locales:
            merged[locale] = generated_locales[locale]
        else:
            if locale not in rest:
                raise KeyError(f"Locale '{locale}' is missing in rest file.")
            # Use the rest locales exactly as provided.
            merged[locale] = rest[locale]

    with OUTPUT_PATH.open("w", encoding="utf-8", newline="\n") as f:
        json.dump(merged, f, ensure_ascii=False, indent=2)
        f.write("\n")

    print(f"Wrote {OUTPUT_PATH}")
    print(f"Locales: {', '.join(merged.keys())}")


if __name__ == "__main__":
    main()
