import { getSiteSettings } from "@/lib/site-settings";
import { AnalyticsScriptsClient } from "@/components/analytics-scripts-client";

/** Admin Site Ayarları'ndan GA / GTM / Search Console'u public siteye enjekte eder. */
export async function AnalyticsScripts() {
  const s = await getSiteSettings();

  return (
    <AnalyticsScriptsClient
      ga={(s.ga_id ?? "").trim()}
      gtm={(s.gtm_id ?? "").trim()}
      searchConsole={(s.search_console ?? "").trim()}
    />
  );
}
