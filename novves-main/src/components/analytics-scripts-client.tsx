"use client";

import { useEffect } from "react";

type Props = {
  ga: string;
  gtm: string;
  searchConsole: string;
};

function injectInlineScript(id: string, code: string) {
  if (document.getElementById(id)) return;
  const script = document.createElement("script");
  script.id = id;
  script.text = code;
  document.body.appendChild(script);
}

function injectExternalScript(src: string) {
  if (document.querySelector(`script[src="${src}"]`)) return;
  const script = document.createElement("script");
  script.async = true;
  script.src = src;
  document.body.appendChild(script);
}

/** Admin Site Ayarlar?'ndan GA / GTM / Search Console'u public siteye enjekte eder. */
export function AnalyticsScriptsClient({ ga, gtm, searchConsole }: Props) {
  useEffect(() => {
    if (!searchConsole) return;
    let meta = document.querySelector('meta[name="google-site-verification"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "google-site-verification");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", searchConsole);
  }, [searchConsole]);

  useEffect(() => {
    if (!gtm) return;
    injectInlineScript(
      "gtm-init",
      `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtm}');`,
    );
  }, [gtm]);

  useEffect(() => {
    if (!ga) return;
    injectExternalScript(`https://www.googletagmanager.com/gtag/js?id=${ga}`);
    injectInlineScript(
      "ga-init",
      `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${ga}');`,
    );
  }, [ga]);

  return null;
}
