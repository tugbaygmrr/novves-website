/** Compare form data snapshots for dirty state. */

export function snapshotData(data: unknown): string {
  try {
    return JSON.stringify(data);
  } catch {
    return "";
  }
}

export function isDirty(saved: string, current: unknown): boolean {
  if (!saved) return false;
  return saved !== snapshotData(current);
}

export function confirmIfDirty(
  dirty: boolean,
  message = "Kaydedilmemis degisiklikler var. Devam etmek istiyor musunuz?"
): boolean {
  if (!dirty) return true;
  return window.confirm(message);
}
