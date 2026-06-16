import "server-only";
import nodemailer, { type Transporter } from "nodemailer";

export type SendMailInput = {
  to: string;
  subject: string;
  text: string;
  html?: string;
  replyTo?: string;
};

export type SendMailResult = {
  previewUrl?: string;
  usedEthereal: boolean;
};

let etherealAccount: { user: string; pass: string } | null = null;

export function isMailConfigured(): boolean {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
}

export function isMailAvailable(): boolean {
  return isMailConfigured() || process.env.NODE_ENV === "development";
}

async function createEtherealTransporter() {
  if (!etherealAccount) {
    const account = await nodemailer.createTestAccount();
    etherealAccount = { user: account.user, pass: account.pass };
    console.warn(
      "[mail] SMTP_PASS bos; gelistirme icin Ethereal test posta kullaniliyor.",
      etherealAccount.user,
    );
  }

  return nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: etherealAccount,
  });
}

function createSmtpTransporter() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    throw new Error("SMTP not configured");
  }

  const port = Number(process.env.SMTP_PORT ?? 587);
  const secure = process.env.SMTP_SECURE === "true" || port === 465;

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });
}

async function getTransporter(): Promise<{ transporter: Transporter; usedEthereal: boolean }> {
  if (isMailConfigured()) {
    return { transporter: createSmtpTransporter(), usedEthereal: false };
  }

  if (process.env.NODE_ENV === "development") {
    return { transporter: await createEtherealTransporter(), usedEthereal: true };
  }

  throw new Error("SMTP not configured");
}

export async function sendMail(input: SendMailInput): Promise<SendMailResult> {
  const from = process.env.CONTACT_FORM_FROM ?? process.env.SMTP_USER ?? "info@novves.com";
  const { transporter, usedEthereal } = await getTransporter();

  const info = await transporter.sendMail({
    from,
    to: input.to,
    replyTo: input.replyTo,
    subject: input.subject,
    text: input.text,
    html: input.html,
  });

  const previewUrl = usedEthereal ? nodemailer.getTestMessageUrl(info) : undefined;
  if (previewUrl) {
    console.info("[mail] Onizleme:", previewUrl);
  }

  return { previewUrl: previewUrl || undefined, usedEthereal };
}
