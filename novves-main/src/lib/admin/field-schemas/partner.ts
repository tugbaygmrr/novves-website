import type { SectionSchema } from "./types";

export const PARTNER_SCHEMA: SectionSchema = {
  file: "partner-records",
  section: "records",
  title: "Partner Listesi",
  description: "İletişim sayfasındaki partner kartları",
  rootIsArray: true,
  fields: [
    {
      path: "",
      label: "Partnerler",
      type: "list",
      listLabel: "Partner",
      itemFields: [
        { path: "name", label: "Firma adı", type: "text" },
        { path: "subtitle", label: "Alt başlık", type: "text" },
        { path: "country", label: "Ülke", type: "text" },
        { path: "email", label: "E-posta", type: "text" },
        { path: "phone", label: "Telefon", type: "text" },
        { path: "phone2", label: "Telefon 2", type: "text" },
        { path: "websiteLabel", label: "Web sitesi yazısı", type: "text" },
        { path: "websiteUrl", label: "Web sitesi adresi", type: "link" },
        { path: "logoSrc", label: "Logo görseli", type: "image" },
        { path: "logoInitials", label: "Logo harfleri", type: "text" },
        { path: "id", label: "Teknik kimlik", type: "text", advancedOnly: true },
        { path: "logoClassName", label: "Logo stili", type: "text", advancedOnly: true },
        { path: "countryCode", label: "Ülke kodu", type: "text", advancedOnly: true },
        { path: "category", label: "Kategori", type: "text", advancedOnly: true },
      ],
    },
  ],
};
