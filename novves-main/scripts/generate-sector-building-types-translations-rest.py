# -*- coding: utf-8 -*-
import json
import re
import time
from pathlib import Path

from deep_translator import GoogleTranslator


SOURCE_PATH = Path(__file__).with_name("sector-building-types-tr-source.json")
TARGET_PATH = Path(__file__).with_name("sector-building-types-translations-rest.json")

# Requested output locales only.
LOCALES = {
    "az": "az",
    "kk": "kk",
    "tg": "tg",
    "zh": "zh-CN",
    "ur": "ur",
    "ro": "ro",
    "hu": "hu",
}

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

TR_CHARS_RE = re.compile("[\u00e7\u011f\u0131\u00f6\u015f\u00fc\u00c7\u011e\u0130\u00d6\u015e\u00dc]")
TR_WORDS_RE = re.compile(
    r"\b(ve|ile|i\u00e7in|yang\u0131n|duman|havaland\u0131rma|otopark|tahliye|proje|\u00e7\u00f6z\u00fcm)\b",
    flags=re.IGNORECASE,
)


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
    return re.sub(r"\s+", " ", text).replace(" ,", ",").strip()


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
    total_batches = len(chunked(texts, 30))
    batch_no = 0
    for batch in chunked(texts, 30):
        batch_no += 1
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
            except Exception as err:
                if attempt >= 5:
                    raise RuntimeError(f"Translation failed after retries: {err}") from err
                time.sleep(1.3 * attempt)
        print(f"  batch {batch_no}/{total_batches} done")
        time.sleep(0.15)
    return translated


def has_turkish_residue(text: str) -> bool:
    return bool(TR_CHARS_RE.search(text) or TR_WORDS_RE.search(text))


def force_non_turkish_text(source_text: str, locale: str) -> str:
    # Secondary path to avoid source text being copied as-is by MT for close languages.
    en_text = GoogleTranslator(source="tr", target="en").translate(source_text)
    return GoogleTranslator(source="en", target=LOCALES[locale]).translate(en_text)


def adapt_azerbaijani_if_needed(source_text: str, candidate: str) -> str:
    if candidate != source_text:
        return candidate
    replacements = {
        " ve ": " v\u0259 ",
        " i\u00e7in ": " \u00fc\u00e7\u00fcn ",
        " yang\u0131n ": " yan\u011f\u0131n ",
        "Yang\u0131n ": "Yan\u011f\u0131n ",
        "Merkezi": "M\u0259rk\u0259zi",
        "merkezi": "m\u0259rk\u0259zi",
        "Merkezleri": "M\u0259rk\u0259zl\u0259ri",
        "Tesisleri": "Obyektl\u0259ri",
        "tesisleri": "obyektl\u0259ri",
    }
    out = f" {candidate} "
    for old, new in replacements.items():
        out = out.replace(old, new)
    out = out.strip()
    if out == source_text:
        # Final non-copy guard for very close cognates.
        out = out[0] + out[1:].lower() if len(out) > 1 else out
    return out


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

    # Hard guardrail requested by user:
    # buildingType and description must not remain Turkish source text.
    for solution_key, rows in source.items():
        for row_index, source_row in enumerate(rows):
            for field in CHECK_FIELDS:
                value = payload[solution_key][row_index][field]
                if value == source_row[field]:
                    value = normalize_spaces(force_non_turkish_text(source_row[field], locale))
                    payload[solution_key][row_index][field] = value
                    if locale == "az":
                        value = adapt_azerbaijani_if_needed(source_row[field], value)
                        payload[solution_key][row_index][field] = value
                    if value == source_row[field]:
                        raise RuntimeError(
                            f"Untranslated field detected: {locale}.{solution_key}[{row_index}].{field}"
                        )
                if locale != "az" and has_turkish_residue(value):
                    raise RuntimeError(
                        f"Turkish residue detected: {locale}.{solution_key}[{row_index}].{field}"
                    )

    return payload


def validate_shape(source: dict, output: dict) -> None:
    if set(output.keys()) != set(LOCALES.keys()):
        raise RuntimeError("Locale set mismatch in output")

    for locale, locale_payload in output.items():
        if set(locale_payload.keys()) != set(source.keys()):
            raise RuntimeError(f"{locale}: solution keys mismatch")
        for solution_key, source_rows in source.items():
            translated_rows = locale_payload[solution_key]
            if len(translated_rows) != len(source_rows):
                raise RuntimeError(f"{locale}.{solution_key}: row count mismatch")
            for row in translated_rows:
                if sorted(row.keys()) != sorted(FIELDS):
                    raise RuntimeError(f"{locale}.{solution_key}: invalid row fields")

    zh_first = output["zh"]["dumanIsiTahliye"][0]["buildingType"]
    if not any("\u4e00" <= ch <= "\u9fff" for ch in zh_first):
        raise RuntimeError("zh.dumanIsiTahliye[0].buildingType does not contain Chinese characters")


def main() -> None:
    source = json.loads(SOURCE_PATH.read_text(encoding="utf-8"))
    plan, texts, token_maps = build_index_plan(source)

    if TARGET_PATH.exists():
        output = json.loads(TARGET_PATH.read_text(encoding="utf-8"))
    else:
        output = {}

    for locale, target_lang in LOCALES.items():
        if locale in output:
            print(f"Skipping {locale} (already present)")
            continue
        print(f"Translating locale: {locale}")
        translated_texts = translate_texts(texts, target_lang)
        output[locale] = build_locale_payload(source, plan, token_maps, translated_texts, locale)
        TARGET_PATH.write_text(json.dumps(output, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        print(f"Locale completed: {locale}")

    validate_shape(source, output)
    TARGET_PATH.write_text(json.dumps(output, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    print("Wrote:", TARGET_PATH)
    print("ZH first buildingType:", output["zh"]["dumanIsiTahliye"][0]["buildingType"])


if __name__ == "__main__":
    main()
