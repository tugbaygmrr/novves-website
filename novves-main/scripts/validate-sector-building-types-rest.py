# -*- coding: utf-8 -*-
import json
from pathlib import Path

src = Path("scripts/sector-building-types-tr-source.json")
tgt = Path("scripts/sector-building-types-translations-rest.json")

s = json.loads(src.read_text(encoding="utf-8"))
t = json.loads(tgt.read_text(encoding="utf-8"))

required = ["az", "kk", "tg", "zh", "ur", "ro", "hu"]
print("locales_ok", sorted(t.keys()) == sorted(required))
print("locale_count", len(t))
print("solution_key_count", len(s))

shape_ok = True
for loc in required:
    if loc not in t:
        shape_ok = False
        print("missing_locale", loc)
        continue
    if set(t[loc].keys()) != set(s.keys()):
        shape_ok = False
        print("key_mismatch", loc)
    for key, rows in s.items():
        translated = t[loc][key]
        if len(translated) != len(rows):
            shape_ok = False
            print("len_mismatch", loc, key, len(translated), len(rows))
        for i, row in enumerate(translated):
            if set(row.keys()) != {"buildingType", "description", "products"}:
                shape_ok = False
                print("field_mismatch", loc, key, i, sorted(row.keys()))
                break

zh_first = t["zh"]["dumanIsiTahliye"][0]["buildingType"]
print("shape_ok", shape_ok)
print("zh_first", zh_first)
print("zh_has_cjk", any("\u4e00" <= ch <= "\u9fff" for ch in zh_first))
