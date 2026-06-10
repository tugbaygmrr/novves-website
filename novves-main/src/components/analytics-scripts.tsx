import Script from "next/script";
import { getSiteSettings } from "@/lib/site-settings";

/** Admin Site Ayarları'ndan GA / GTM / Search Console'u public siteye enjekte eder. */
export async function AnalyticsScripts() {
  const s = await getSiteSettings();
  const ga = (s.ga_id ?? "").trim();
  const gtm = (s.gtm_id ?? "").trim();
  const sc = (s.search_console ?? "").trim();

  return (
    <>
      {sc ? <meta name="google-site-verification" content={sc} /> : null}

      {gtm ? (
        <Script id="gtm-init" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtm}');`}
        </Script>
      ) : null}

      {ga ? (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${ga}`} strategy="afterInteractive" />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${ga}');`}
          </Script>
        </>
      ) : null}
    </>
  );
}
