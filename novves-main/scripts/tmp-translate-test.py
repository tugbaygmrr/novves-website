from deep_translator import GoogleTranslator, MyMemoryTranslator


def esc(value: str) -> str:
    return value.encode("unicode_escape").decode("ascii")


text = "Kapal? Otoparklar"
for locale in ["ru", "ar", "pl", "lt"]:
    try:
        g = GoogleTranslator(source="tr", target=locale).translate(text)
    except Exception as exc:
        g = f"ERR: {exc}"
    try:
        m = MyMemoryTranslator(source="tr-TR", target=locale).translate(text)
    except Exception as exc:
        m = f"ERR: {exc}"
    print(locale, "| Google:", esc(g), "| MyMemory:", esc(m))
