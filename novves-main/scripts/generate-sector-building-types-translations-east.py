import json
import time
import urllib.parse
import urllib.request
from pathlib import Path


SOURCE_PATH = Path(__file__).with_name("sector-building-types-tr-source.json")
TARGET_PATH = Path(__file__).with_name("sector-building-types-translations-east.json")

LOCALES = {
    "ru": "ru",
    "ar": "ar",
    "pl": "pl",
    "lt": "lt",
}

FIELDS = ("buildingType", "description", "products")

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
    "NOVVES",
]


def protect(text: str, terms: list[str]) -> tuple[str, dict[str, str]]:
    out = text
    mapping: dict[str, str] = {}
    for idx, term in enumerate(sorted(set(terms), key=len, reverse=True)):
        token = f"__KEEP_{idx}__"
        if term in out:
            out = out.replace(term, token)
            mapping[token] = term
    return out, mapping


def unprotect(text: str, mapping: dict[str, str]) -> str:
    out = text
    for token, val in mapping.items():
        out = out.replace(token, val)
    return out


def build_index_plan(source: dict) -> tuple[list[tuple[str, int, str]], list[str]]:
    index_plan: list[tuple[str, int, str]] = []
    texts: list[str] = []
    for solution_key, rows in source.items():
        for row_index, row in enumerate(rows):
            for field in FIELDS:
                index_plan.append((solution_key, row_index, field))
                texts.append(row[field])
    return index_plan, texts


def translate_one(text: str, target_lang: str, retries: int = 5) -> str:
    if not text:
        return text
    encoded = urllib.parse.quote(text, safe="")
    url = (
        "https://translate.googleapis.com/translate_a/single"
        f"?client=gtx&sl=tr&tl={target_lang}&dt=t&q={encoded}"
    )
    for attempt in range(1, retries + 1):
        try:
            with urllib.request.urlopen(url, timeout=20) as response:
                payload = json.loads(response.read().decode("utf-8"))
            return "".join(part[0] for part in payload[0] if part and part[0])
        except Exception:
            if attempt == retries:
                raise
            time.sleep(1.1 * attempt)
    raise RuntimeError("Unreachable translation state")


def translate_texts(texts: list[str], target_lang: str) -> list[str]:
    translated: list[str] = []
    total = len(texts)
    for index, item in enumerate(texts, start=1):
        translated.append(translate_one(item, target_lang))
        if index % 25 == 0 or index == total:
            print(f"  {target_lang}: {index}/{total}")
        time.sleep(0.05)
    return translated


def build_locale_payload(
    source: dict,
    index_plan: list[tuple[str, int, str]],
    translated_texts: list[str],
) -> dict:
    if len(index_plan) != len(translated_texts):
        raise RuntimeError("Plan/text length mismatch")

    payload = {solution_key: [] for solution_key in source.keys()}
    for solution_key, rows in source.items():
        for _ in rows:
            payload[solution_key].append({})

    for index, translated in enumerate(translated_texts):
        solution_key, row_index, field = index_plan[index]
        payload[solution_key][row_index][field] = translated

    for solution_key, rows in source.items():
        for row_index, source_row in enumerate(rows):
            for field in ("buildingType", "description"):
                if payload[solution_key][row_index][field] == source_row[field]:
                    raise RuntimeError(
                        f"Untranslated field detected: {solution_key}[{row_index}].{field}"
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

    ru_first = output["ru"]["dumanIsiTahliye"][0]["buildingType"]
    if ru_first == "Kapal? Otoparklar":
        raise RuntimeError("ru.dumanIsiTahliye[0].buildingType is still Turkish")


def main() -> None:
    source = json.loads(SOURCE_PATH.read_text(encoding="utf-8"))
    index_plan, texts = build_index_plan(source)

    output: dict = {}
    for locale, target_lang in LOCALES.items():
        print(f"Translating {locale}...")
        protected_texts: list[str] = []
        maps: list[dict[str, str]] = []
        for index, raw_text in enumerate(texts):
            _, _, field = index_plan[index]
            terms = BRANDS if field == "products" else []
            protected, mapping = protect(raw_text, terms)
            protected_texts.append(protected)
            maps.append(mapping)

        translated_texts = translate_texts(protected_texts, target_lang)
        translated_texts = [
            unprotect(translated_texts[i], maps[i]) for i in range(len(translated_texts))
        ]
        output[locale] = build_locale_payload(source, index_plan, translated_texts)

    validate_shape(source, output)
    TARGET_PATH.write_text(json.dumps(output, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    print("Wrote:", TARGET_PATH)
    print("RU first buildingType:", output["ru"]["dumanIsiTahliye"][0]["buildingType"])


if __name__ == "__main__":
    main()
