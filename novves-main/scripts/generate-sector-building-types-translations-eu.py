import json
import re
import time
from pathlib import Path

from deep_translator import GoogleTranslator


SOURCE_PATH = Path(__file__).with_name("sector-building-types-tr-source.json")
TARGET_PATH = Path(__file__).with_name("sector-building-types-translations-eu.json")

LOCALES = {"en": "en", "de": "de", "fr": "fr", "es": "es", "it": "it"}
FIELDS = ("buildingType", "description", "products")
CHECK_FIELDS = ("buildingType", "description")

PROTECTED_TERMS = [
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

TR_CODEPOINTS = {231, 287, 305, 246, 351, 252, 199, 286, 304, 214, 350, 220}
TR_UNIQUE_WORDS = [
    "yang\\u0131n",
    "duman",
    "havaland\\u0131rma",
    "otopark",
    "tahliye",
    "kapal\\u0131",
    "\\u00e7\\u00f6z\\u00fcm",
]


def chunked(values: list[str], size: int) -> list[list[str]]:
    return [values[i : i + size] for i in range(0, len(values), size)]


def protect_text(text: str) -> tuple[str, dict[str, str]]:
    protected = text
    mapping: dict[str, str] = {}
    for index, term in enumerate(sorted(PROTECTED_TERMS, key=len, reverse=True)):
        token = f"__TERM_{index}__"
        if term in protected:
            protected = protected.replace(term, token)
            mapping[token] = term
    return protected, mapping


def unprotect_text(text: str, mapping: dict[str, str]) -> str:
    out = text
    for token, term in mapping.items():
        out = out.replace(token, term)
    return out


def normalize_spaces(text: str) -> str:
    return re.sub(r"\\s+", " ", text).replace(" ,", ",").strip()


def build_index_plan(source: dict) -> tuple[list[tuple[str, int, str]], list[str], list[dict[str, str]]]:
    plan: list[tuple[str, int, str]] = []
    texts: list[str] = []
    maps: list[dict[str, str]] = []
    for solution_key, rows in source.items():
        for row_index, row in enumerate(rows):
            for field in FIELDS:
                protected_text, mapping = protect_text(row[field])
                plan.append((solution_key, row_index, field))
                texts.append(protected_text)
                maps.append(mapping)
    return plan, texts, maps


def translate_texts(texts: list[str], target_lang: str) -> list[str]:
    translator = GoogleTranslator(source="tr", target=target_lang)
    translated: list[str] = []
    for batch in chunked(texts, 40):
        attempt = 0
        while True:
            attempt += 1
            try:
                translated_batch = translator.translate_batch(batch)
                if not isinstance(translated_batch, list):
                    translated_batch = [translated_batch]
                if len(translated_batch) != len(batch):
                    raise RuntimeError("Batch length mismatch during translation")
                translated.extend(translated_batch)
                break
            except Exception:
                if attempt >= 4:
                    raise
                time.sleep(1.2 * attempt)
        time.sleep(0.2)
    return translated


def translate_with_fallback(text: str, target_lang: str) -> str:
    direct = GoogleTranslator(source="tr", target=target_lang).translate(text)
    direct = normalize_spaces(direct)
    if target_lang == "en":
        return direct
    if direct == text or has_turkish_residue(direct):
        via_en = GoogleTranslator(source="tr", target="en").translate(text)
        via_en = normalize_spaces(via_en)
        via_target = GoogleTranslator(source="en", target=target_lang).translate(via_en)
        return normalize_spaces(via_target)
    return direct


def has_turkish_residue(text: str) -> bool:
    lowered = text.lower()
    if any(ord(ch) in TR_CODEPOINTS for ch in text):
        return True
    for encoded in TR_UNIQUE_WORDS:
        term = bytes(encoded, "utf-8").decode("unicode_escape")
        if term in lowered:
            return True
    return False


def build_locale_payload(
    source: dict,
    plan: list[tuple[str, int, str]],
    token_maps: list[dict[str, str]],
    translated_texts: list[str],
    locale: str,
) -> dict:
    if len(plan) != len(translated_texts):
        raise RuntimeError("Plan/text length mismatch")

    payload = {solution_key: [] for solution_key in source.keys()}
    for solution_key, rows in source.items():
        for _ in rows:
            payload[solution_key].append({})

    for index, translated in enumerate(translated_texts):
        solution_key, row_index, field = plan[index]
        mapping = token_maps[index]
        payload[solution_key][row_index][field] = normalize_spaces(unprotect_text(translated, mapping))

    if locale == "en":
        payload["dumanIsiTahliye"][0]["buildingType"] = "Enclosed Car Parks"

    for solution_key, rows in source.items():
        for row_index, source_row in enumerate(rows):
            for field in CHECK_FIELDS:
                value = payload[solution_key][row_index][field]
                if value == source_row[field]:
                    raise RuntimeError(
                        f"Untranslated field detected: {locale}.{solution_key}[{row_index}].{field}"
                    )
                if has_turkish_residue(value):
                    retry = translate_with_fallback(source_row[field], locale)
                    payload[solution_key][row_index][field] = retry
                    value = retry
                    if has_turkish_residue(value):
                        raise RuntimeError(
                            f"Turkish residue detected: {locale}.{solution_key}[{row_index}].{field}"
                        )

    return payload


def validate_shape(source: dict, output: dict) -> None:
    if set(output.keys()) != set(LOCALES.keys()):
        raise RuntimeError("Locale set mismatch in output")
    source_keys = set(source.keys())
    for locale, locale_payload in output.items():
        if set(locale_payload.keys()) != source_keys:
            raise RuntimeError(f"{locale}: solution keys mismatch")
        for solution_key, source_rows in source.items():
            translated_rows = locale_payload[solution_key]
            if len(translated_rows) != len(source_rows):
                raise RuntimeError(f"{locale}.{solution_key}: row count mismatch")
            for row in translated_rows:
                if sorted(row.keys()) != sorted(FIELDS):
                    raise RuntimeError(f"{locale}.{solution_key}: invalid row fields")
    first = output["en"]["dumanIsiTahliye"][0]["buildingType"]
    if first.lower().strip() == "kapal\\u0131 otoparklar":
        raise RuntimeError("en.dumanIsiTahliye[0].buildingType is still Turkish")


def main() -> None:
    source = json.loads(SOURCE_PATH.read_text(encoding="utf-8"))
    plan, texts, token_maps = build_index_plan(source)

    output: dict = {}
    for locale, target_lang in LOCALES.items():
        translated_texts = translate_texts(texts, target_lang)
        output[locale] = build_locale_payload(source, plan, token_maps, translated_texts, locale)

    validate_shape(source, output)
    TARGET_PATH.write_text(json.dumps(output, ensure_ascii=False, indent=2) + "\\n", encoding="utf-8")
    print("Wrote:", TARGET_PATH)
    print("en.dumanIsiTahliye[0].buildingType:", output["en"]["dumanIsiTahliye"][0]["buildingType"])


if __name__ == "__main__":
    main()
