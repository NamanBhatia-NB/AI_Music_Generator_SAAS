import { Resend } from "resend";
import { env } from "~/env";

const resend = new Resend(env.RESEND_API_KEY);

export async function sendEmail({
  to,
  subject,
  text,
  html,
}: {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}) {
  if (!env.RESEND_API_KEY) {
    throw new Error("Missing RESEND_API_KEY");
  }

  if (!env.EMAIL_FROM) {
    throw new Error("Missing EMAIL_FROM");
  }

  const emailPayload: {
    from: string;
    to: string;
    subject: string;
    text?: string;
    html?: string;
  } = {
    from: env.EMAIL_FROM,
    to,
    subject,
  };

  if (text) {
    emailPayload.text = text;
  }
  if (html) {
    emailPayload.html = html;
  }

  await resend.emails.send(emailPayload);
}
