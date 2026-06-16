export function formatModelNumber(index: number): string {
  return String(index + 1).padStart(2, "0");
}

export function productImageShadowClass(image: string): string {
  if (/\.(jpe?g)(\?|#|$)/i.test(image)) return "";
  if (/\/remora(-[a-z0-9-]+)?\.png$/i.test(image.split(/[?#]/)[0])) return "";
  if (/\/otomasyon-|\/frekans-inventoru\.png$/i.test(image.split(/[?#]/)[0])) return "";
  return "drop-shadow-[0_18px_30px_rgba(0,0,0,0.16)]";
}

export function resolveDefaultModelImage(image: string): string {
  if (!image || image.endsWith("/free.jpg")) {
    return "/images/products/heron-ah.jpg";
  }
  return image;
}
