import json
import urllib.parse
import urllib.request
from pathlib import Path


def translate(text: str, target: str) -> str:
    q = urllib.parse.quote(text, safe="")
    url = (
        "https://translate.googleapis.com/translate_a/single"
        f"?client=gtx&sl=tr&tl={target}&dt=t&q={q}"
    )
    with urllib.request.urlopen(url, timeout=20) as response:
        payload = json.loads(response.read().decode("utf-8"))
    return "".join(part[0] for part in payload[0] if part and part[0])


src_path = Path(__file__).with_name("sector-building-types-tr-source.json")
raw = src_path.read_bytes()
for enc in ["utf-8", "cp1254", "latin-1"]:
    try:
        src = json.loads(raw.decode(enc))
        sample = src["dumanIsiTahliye"][0]["buildingType"]
        print("ENC", enc, sample.encode("unicode_escape").decode("ascii"))
        for locale in ["ru", "ar", "pl", "lt"]:
            value = translate(sample, locale)
            print(locale, value.encode("unicode_escape").decode("ascii"))
        break
    except Exception as exc:
        print("FAIL", enc, str(exc)[:120])
