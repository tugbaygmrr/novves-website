#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Build sector-building-types-translations.json for all locales."""

import json
import re
import sys
import time
from pathlib import Path

from deep_translator import GoogleTranslator
from deep_translator.exceptions import TranslationNotFound

ROOT = Path(__file__).resolve().parent
TR_SOURCE = ROOT / "sector-building-types-tr-source.json"
REST_FILE = ROOT / "sector-building-types-translations-rest.json"
OUT_FILE = ROOT / "sector-building-types-translations.json"
PARTIAL_FILE = ROOT / "sector-building-types-translations.partial.json"

REUSE_LOCALES = {"az", "kk", "tg", "zh", "ur"}
GENERATE_LOCALES = ["en", "de", "fr", "es", "it", "ru", "ar", "pl", "lt", "ro", "hu"]

LOCALE_TARGETS = {
    "en": "en",
    "de": "de",
    "fr": "fr",
    "es": "es",
    "it": "it",
    "ru": "ru",
    "ar": "ar",
    "pl": "pl",
    "lt": "lt",
    "ro": "ro",
    "hu": "hu",
}

PROTECTED = re.compile(
    r"\b(?:Dragonfly|Marlin|Hound|Turtle|Koi|Bear|Nautilus|Heron|Owl|Tiger|Scallop|"
    r"Chicken|Hummingbird|Caracal|Alpaca|Seahorse|Butterfly|Elephant|REMORA|Hawk|"
    r"FlaktEdge|Lion|Jet Fan|AHU|HEPA|ATEX Fan|ATEX|EC Fan|PLC|UV-C|BIM|CAD|FPSO|"
    r"Ex-proof|CO|NOx|NOVVES|GMP|SOLAS|DNV-GL|SS316|IP56|IoT|BMS|OG|AG|UPS|ESS|CFD|"
    r"F300|F400|F9|RFA|Revit)\b",
    re.I,
)


def protect(text: str) -> tuple[str, dict[str, str]]:
    tokens: dict[str, str] = {}

    def repl(match: re.Match[str]) -> str:
        key = f"ZZZ{len(tokens)}ZZZ"
        tokens[key] = match.group(0)
        return key

    return PROTECTED.sub(repl, text), tokens


def restore(text: str, tokens: dict[str, str]) -> str:
    for key, value in tokens.items():
        text = text.replace(key, value)
    return text


def collect_unique_strings(tr_data: dict) -> list[str]:
    unique: set[str] = set()
    for rows in tr_data.values():
        for row in rows:
            for field in ("buildingType", "description", "products"):
                unique.add(row[field])
    return sorted(unique)


def translate_one(text: str, target: str) -> str:
    protected, tokens = protect(text)
    translator = GoogleTranslator(source="tr", target=target)
    try:
        translated = translator.translate(protected)
    except TranslationNotFound:
        translated = protected
    return restore(translated, tokens)


def translate_batch(strings: list[str], target: str) -> list[str]:
    protected_strings: list[str] = []
    token_maps: list[dict[str, str]] = []
    for text in strings:
        protected, tokens = protect(text)
        protected_strings.append(protected)
        token_maps.append(tokens)

    translator = GoogleTranslator(source="tr", target=target)
    results: list[str] = []
    try:
        translated = translator.translate_batch(protected_strings)
        for i, item in enumerate(translated):
            results.append(restore(item, token_maps[i]))
        return results
    except TranslationNotFound:
        for text in strings:
            results.append(translate_one(text, target))
            time.sleep(0.1)
        return results


def build_locale_map(unique_strings: list[str], locale: str) -> dict[str, str]:
    target = LOCALE_TARGETS[locale]
    mapping: dict[str, str] = {}
    batch_size = 30
    total = len(unique_strings)

    for start in range(0, total, batch_size):
        chunk = unique_strings[start : start + batch_size]
        translated = translate_batch(chunk, target)
        for src, dst in zip(chunk, translated):
            mapping[src] = dst
        print(f"  {locale}: {min(start + batch_size, total)}/{total}", flush=True)
        time.sleep(0.2)

    return mapping


def apply_map(tr_data: dict, mapping: dict[str, str]) -> dict:
    out: dict[str, list] = {}
    for key, rows in tr_data.items():
        out[key] = [
            {
                "buildingType": mapping[row["buildingType"]],
                "description": mapping[row["description"]],
                "products": mapping[row["products"]],
            }
            for row in rows
        ]
    return out


def save_partial(merged: dict) -> None:
    PARTIAL_FILE.write_text(json.dumps(merged, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def main() -> None:
    tr_data = json.loads(TR_SOURCE.read_text(encoding="utf-8"))
    rest_data = json.loads(REST_FILE.read_text(encoding="utf-8"))
    unique_strings = collect_unique_strings(tr_data)
    print(f"unique strings: {len(unique_strings)}", flush=True)

    merged: dict[str, dict] = {}
    if PARTIAL_FILE.exists():
        merged = json.loads(PARTIAL_FILE.read_text(encoding="utf-8"))
        print(f"loaded partial: {sorted(merged.keys())}", flush=True)

    for locale in REUSE_LOCALES:
        if locale not in merged:
            merged[locale] = rest_data[locale]
            print(f"reused {locale}", flush=True)
            save_partial(merged)

    for locale in GENERATE_LOCALES:
        if locale in merged:
            print(f"skip existing {locale}", flush=True)
            continue
        print(f"generating {locale}...", flush=True)
        mapping = build_locale_map(unique_strings, locale)
        merged[locale] = apply_map(tr_data, mapping)
        save_partial(merged)

    OUT_FILE.write_text(json.dumps(merged, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"wrote {OUT_FILE} ({len(merged)} locales)", flush=True)


if __name__ == "__main__":
    try:
        main()
    except Exception as exc:
        print(f"ERROR: {exc}", file=sys.stderr, flush=True)
        raise
