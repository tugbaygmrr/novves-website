"use client";

import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";

export function FormFooter({
  onCancel,
  onSave,
  saving,
  onDelete,
  deleting,
  saveLabel = "Kaydet",
}: {
  onCancel: () => void;
  onSave: () => void;
  saving?: boolean;
  onDelete?: () => void;
  deleting?: boolean;
  saveLabel?: string;
}) {
  return (
    <div className="sticky bottom-0 z-10 -mx-4 mt-6 flex items-center gap-2 border-t border-panel-border bg-panel-surface/90 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6">
      {onDelete && (
        <Button variant="danger-soft" size="sm" onClick={onDelete} loading={deleting}>
          <Trash2 className="h-4 w-4" />
          Sil
        </Button>
      )}
      <div className="ml-auto flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={onCancel}>
          Vazgeç
        </Button>
        <Button size="sm" onClick={onSave} loading={saving}>
          {saveLabel}
        </Button>
      </div>
    </div>
  );
}
