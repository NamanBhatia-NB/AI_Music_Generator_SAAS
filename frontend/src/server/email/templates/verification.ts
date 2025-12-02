export function getVerificationEmailTemplate(email: string, url: string) {
  return `
  <body style="font-family: Arial, sans-serif; background: #f5f5f7; padding: 40px; color: #333;">
    <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 520px; margin: auto; background: #ffffff; border-radius: 12px; overflow: hidden;">
      
      <!-- Header -->
      <tr>
        <td style="background: #111827; padding: 20px; text-align: center;">
          <h2 style="color: white; margin: 0; font-size: 22px;">AI Music Generator</h2>
        </td>
      </tr>

      <!-- Body -->
      <tr>
        <td style="padding: 32px;">
          <h3 style="font-size: 20px; margin-top: 0;">Verify Your Email</h3>

          <p style="font-size: 15px; line-height: 1.6;">
            Hi <b>${email}</b>,
            <br><br>
            Thank you for signing up! Please verify your email address to activate your account.
          </p>

          <p style="text-align: center; margin: 32px 0;">
            <a href="${url}"
              style="background: #4f46e5; color: white; padding: 12px 22px; font-size: 15px; text-decoration: none; border-radius: 8px; display: inline-block;">
              Verify Email
            </a>
          </p>

          <p style="font-size: 14px; color: #555; line-height: 1.6;">
            Or if the button doesn’t work, copy and paste this link:
            <br>
            <span style="word-break: break-all; color: #4f46e5;">${url}</span>
          </p>

        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td style="background: #f3f4f6; padding: 18px; text-align: center; font-size: 12px; color: #777;">
          © ${new Date().getFullYear()} AI Music Generator. All rights reserved.
        </td>
      </tr>

    </table>
  </body>

  `;
}
