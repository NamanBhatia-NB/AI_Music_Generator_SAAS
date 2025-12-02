export function getResetPasswordEmailTemplate(email: string, url: string) {
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
          <h3 style="font-size: 20px; margin-top: 0;">Reset Your Password</h3>

          <p style="font-size: 15px; line-height: 1.6;">
            Hi <b>${email}</b>,
            <br><br>
            We received a request to reset the password for your AI Music Generator account.
            Click the button below to set a new password.
          </p>

          <p style="text-align: center; margin: 32px 0;">
            <a href="${url}"
              style="background: #ef4444; color: white; padding: 12px 22px; font-size: 15px; text-decoration: none; border-radius: 8px; display: inline-block;">
              Reset Password
            </a>
          </p>

          <p style="font-size: 14px; color: #555; line-height: 1.6;">
            If the button doesn't work, copy and paste this link into your browser:
            <br>
            <span style="word-break: break-all; color: #ef4444;">${url}</span>
          </p>

          <p style="font-size: 13px; color: #777; margin-top: 22px;">
            If you did not request this, you can safely ignore this email.  
            Your password will remain unchanged.
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
