import "server-only";
import type { ContactSubmissionInput } from "@/lib/admin/schemas/contact-submission";
import { isMailAvailable, sendMail } from "@/lib/mail/send-mail";

type ContactEmailInput = ContactSubmissionInput & {
  ip?: string;
};

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function buildInternalText(data: ContactEmailInput): string {
  return [
    "Yeni ileti\u015fim formu ba\u015fvurusu",
    "",
    `Ad Soyad: ${data.name}`,
    data.company ? `Firma: ${data.company}` : null,
    `E-posta: ${data.email}`,
    data.phone ? `Telefon: ${data.phone}` : null,
    data.department ? `Departman: ${data.department}` : null,
    data.subject ? `Konu: ${data.subject}` : null,
    data.ip ? `IP: ${data.ip}` : null,
    "",
    "Mesaj:",
    data.message,
  ]
    .filter((line): line is string => Boolean(line))
    .join("\n");
}

function buildInternalHtml(data: ContactEmailInput): string {
  const rows = [
    ["Ad Soyad", data.name],
    data.company ? ["Firma", data.company] : null,
    ["E-posta", data.email],
    data.phone ? ["Telefon", data.phone] : null,
    data.department ? ["Departman", data.department] : null,
    data.subject ? ["Konu", data.subject] : null,
    data.ip ? ["IP", data.ip] : null,
  ].filter((row): row is [string, string] => Boolean(row));

  const tableRows = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 12px;font-weight:600;vertical-align:top;">${escapeHtml(label)}</td><td style="padding:8px 12px;">${escapeHtml(value)}</td></tr>`,
    )
    .join("");

  return `
    <div style="font-family:Arial,sans-serif;color:#111827;line-height:1.5;">
      <h2 style="margin:0 0 16px;font-size:20px;">Yeni ileti\u015fim formu ba\u015fvurusu</h2>
      <table style="border-collapse:collapse;width:100%;max-width:640px;">${tableRows}</table>
      <h3 style="margin:24px 0 8px;font-size:16px;">Mesaj</h3>
      <pre style="white-space:pre-wrap;background:#f5f5f0;padding:16px;border-radius:12px;">${escapeHtml(data.message)}</pre>
    </div>
  `;
}

function buildAutoReplyText(data: ContactEmailInput): string {
  return [
    `Say\u0131n ${data.name},`,
    "",
    "NOVVES ileti\u015fim formu \u00fczerinden g\u00f6nderdi\u011finiz talebi ald\u0131k.",
    "Teknik ekibimiz en k\u0131sa s\u00fcrede sizinle ileti\u015fime ge\u00e7ecektir.",
    "",
    "G\u00f6nderdi\u011finiz mesaj:",
    data.message,
    "",
    "NOVVES Elektrik Motor A.\u015e.",
    "info@novves.com",
    "+90 216 467 47 52",
  ].join("\n");
}

function buildAutoReplyHtml(data: ContactEmailInput): string {
  return `
    <div style="font-family:Arial,sans-serif;color:#111827;line-height:1.6;">
      <p>Say\u0131n ${escapeHtml(data.name)},</p>
      <p>NOVVES ileti\u015fim formu \u00fczerinden g\u00f6nderdi\u011finiz talebi ald\u0131k. Teknik ekibimiz en k\u0131sa s\u00fcrede sizinle ileti\u015fime ge\u00e7ecektir.</p>
      <h3 style="margin:24px 0 8px;font-size:16px;">G\u00f6nderdi\u011finiz mesaj</h3>
      <pre style="white-space:pre-wrap;background:#f5f5f0;padding:16px;border-radius:12px;">${escapeHtml(data.message)}</pre>
      <p style="margin-top:24px;color:#4b5563;">
        NOVVES Elektrik Motor A.\u015e.<br />
        <a href="mailto:info@novves.com">info@novves.com</a><br />
        +90 216 467 47 52
      </p>
    </div>
  `;
}

export async function sendContactSubmissionEmails(
  data: ContactEmailInput,
): Promise<{ sent: boolean; reason?: string; previewUrls?: string[] }> {
  if (!isMailAvailable()) {
    console.warn("[contact-email] SMTP ayarlari eksik; e-posta gonderilmedi.");
    return { sent: false, reason: "not_configured" };
  }

  const internalTo = process.env.CONTACT_FORM_TO ?? "info@novves.com";
  const previewUrls: string[] = [];

  try {
    const internalMail = await sendMail({
      to: internalTo,
      replyTo: data.email,
      subject: `Yeni ileti\u015fim formu: ${data.name}`,
      text: buildInternalText(data),
      html: buildInternalHtml(data),
    });
    if (internalMail.previewUrl) previewUrls.push(internalMail.previewUrl);

    const autoReply = await sendMail({
      to: data.email,
      subject: "NOVVES - Talebiniz al\u0131nd\u0131",
      text: buildAutoReplyText(data),
      html: buildAutoReplyHtml(data),
    });
    if (autoReply.previewUrl) previewUrls.push(autoReply.previewUrl);

    return { sent: true, previewUrls: previewUrls.length ? previewUrls : undefined };
  } catch (error) {
    console.error("[contact-email]", error);
    return { sent: false, reason: "send_failed" };
  }
}
