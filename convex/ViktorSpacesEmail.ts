import { Email } from "@convex-dev/auth/providers/Email";

declare const process: { env: Record<string, string | undefined> };

/**
 * Custom email provider that sends verification emails via Viktor Spaces API.
 * This proxies email sending through the Viktor Spaces backend which:
 * - Rate limits per project (100 emails/hour)
 * - Sends from project-specific email addresses
 * - Keeps the Resend API key secure on the backend
 */
export const ViktorSpacesEmail = Email({
  id: "viktor-spaces-email",
  maxAge: 60 * 15, // 15 minutes

  async sendVerificationRequest({ identifier: email, token }) {
    const apiUrl = process.env.VIKTOR_SPACES_API_URL;
    const projectName = process.env.VIKTOR_SPACES_PROJECT_NAME;
    const projectSecret = process.env.VIKTOR_SPACES_PROJECT_SECRET;

    if (!apiUrl || !projectName || !projectSecret) {
      throw new Error(
        "Viktor Spaces environment variables not configured. " +
          "Required: VIKTOR_SPACES_API_URL, VIKTOR_SPACES_PROJECT_NAME, VIKTOR_SPACES_PROJECT_SECRET",
      );
    }

    const response = await fetch(`${apiUrl}/api/viktor-spaces/send-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        project_name: projectName,
        project_secret: projectSecret,
        to_email: email,
        subject: "Your verification code",
        html_content: `
          <div style="font-family: sans-serif; max-width: 400px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #333;">Verify your email</h2>
            <p style="color: #666;">Your verification code is:</p>
            <div style="background: #f5f5f5; padding: 20px; text-align: center; border-radius: 8px; margin: 20px 0;">
              <span style="font-size: 32px; font-weight: bold; letter-spacing: 4px; color: #333;">${token}</span>
            </div>
            <p style="color: #999; font-size: 12px;">This code expires in 15 minutes.</p>
          </div>
        `,
        text_content: `Your verification code is: ${token}\n\nThis code expires in 15 minutes.`,
        email_type: "otp",
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to send verification email: ${error}`);
    }

    const result = (await response.json()) as {
      success: boolean;
      error?: string;
    };
    if (!result.success) {
      throw new Error(`Email sending failed: ${result.error}`);
    }
  },
});
