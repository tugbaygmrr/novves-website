#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Catalog product images: remove studio background, emit transparent PNG.
Canvas color (--sand-200) shows through; no multiply blend needed.

  python scripts/strip-catalog-product-bg.py
  python scripts/strip-catalog-product-bg.py dragonfly-ja.png remora-sf.png
"""
from __future__ import annotations

import io
import sys
from pathlib import Path

from PIL import Image
from rembg import remove

ROOT = Path(__file__).resolve().parent.parent
PRODUCTS = ROOT / "public/images/products"

# Manually assigned model / accessory images
DEFAULT_FILES = [
    "dragonfly-tjf.png",
    "dragonfly-ja.png",
    "dragonfly-w.png",
    "dragonfly-lpf.png",
    "dragonfly-c.png",
    "marlin-b.png",
    "bear-reb-ex.png",
    "bear-rvs-ex.png",
    "bear-rhs-ex.png",
    "bear-t.png",
    "bear-c.png",
    "bear-r.png",
    "bear-w.png",
    "bear-lpf-ex.png",
    "bear-bpa-ex.png",
    "nautilus-lpf.png",
    "hummingbird-rrv-ec.png",
    "hummingbird-rrh-ec.png",
    "hummingbird-cbp-ec.png",
    "hummingbird-ns-ec.png",
    "heron-rh.png",
    "heron-rhs.png",
    "heron-rv.png",
    "heron-rvs.png",
    "heron-ah.png",
    "hound-al.png",
    "hound-msd.png",
    "hound-msfd-b.png",
    "hound-sfd-r.png",
    "hound-rsfd-drain-b.png",
    "hound-rd.png",
    "hound-mfd.png",
    "hound-gs.png",
    "hound-nrd-b.png",
    "hound-nrd-r.png",
    "remora-sf.png",
    "remora-vsf.png",
    "remora-fj.png",
    "remora-fjcf.png",
    "remora-cf.png",
    "remora-fj2f.png",
    "remora-r-fjcf.png",
    "remora-r-fj2cf.png",
    "remora-pm.png",
    "remora-ic.png",
    "remora-s.png",
    "remora-sp.png",
    "remora-rs.png",
    "remora-ss.png",
    "remora-red.png",
    "remora.png",
    "roo-t1-nip.png",
    "roo-t1-fip.png",
    "roo-t2-nim.png",
    "roo-t2-fim.png",
    "scallop-bf.png",
    "scallop-cf.png",
    "scallop-abf.png",
    "scallop-mf.png",
    "scallop-hp.png",
    "sense-dps-pipu.png",
    "sense-dps.png",
    "sense-ts.png",
    "sense-hs.png",
    "nav/remora.png",
    "owl-r.png",
    "seahorse-ap.png",
    "seahorse-aps.png",
    "seahorse-apc.png",
    "seahorse-rp-2.png",
    "koi-rb.png",
    "koi-reb.png",
    "koi-x.png",
    "koi-cp.png",
    "turtle-bpa.png",
    "turtle-b.png",
    "turtle-bp.png",
    "turtle-f.png",
    "fox-c.png",
    "fox-d.png",
]


def flatten_on_white(img: Image.Image) -> Image.Image:
    rgba = img.convert("RGBA")
    bg = Image.new("RGBA", rgba.size, (255, 255, 255, 255))
    return Image.alpha_composite(bg, rgba)


def trim_transparent(img: Image.Image, threshold: int = 8) -> Image.Image:
    rgba = img.convert("RGBA")
    alpha = rgba.split()[-1]
    bbox = alpha.point(lambda p: 255 if p > threshold else 0).getbbox()
    if not bbox:
        return rgba
    return rgba.crop(bbox)


def corner_is_transparent(img: Image.Image, min_corners: int = 3) -> bool:
    rgba = img.convert("RGBA")
    w, h = rgba.size
    pts = [(0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1)]
    transparent = sum(1 for x, y in pts if rgba.getpixel((x, y))[3] < 20)
    return transparent >= min_corners


def process_file(rel: str, force: bool = False) -> str:
    path = PRODUCTS / rel
    if not path.exists():
        return f"skip missing: {rel}"

    img = Image.open(path)
    if not force and corner_is_transparent(img):
        return f"ok (already transparent): {rel}"

    flat = flatten_on_white(img)
    buf = io.BytesIO()
    flat.save(buf, format="PNG")
    cut = Image.open(io.BytesIO(remove(buf.getvalue()))).convert("RGBA")
    cut = trim_transparent(cut)
    cut.save(path, format="PNG", optimize=True)
    return f"processed: {rel} -> {cut.size[0]}x{cut.size[1]}"


def main() -> None:
    args = sys.argv[1:]
    force = False
    files = []
    for arg in args:
        if arg == "--force":
            force = True
        else:
            files.append(arg)
    if not files:
        files = DEFAULT_FILES

    for rel in files:
        print(process_file(rel, force=force))


if __name__ == "__main__":
    main()
