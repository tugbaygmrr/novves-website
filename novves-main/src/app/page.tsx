import { redirect } from "next/navigation";
import { defaultLocale } from "@/i18n/config";

/** `/` — middleware başarısız olsa bile varsayılan dile yönlendir */
export default function RootRedirectPage() {
  redirect(`/${defaultLocale}`);
}
