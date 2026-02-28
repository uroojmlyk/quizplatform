export const getPasswordResetHTML = (name: string, resetLink: string) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          line-height: 1.5;
          margin: 0;
          padding: 0;
          background-color: #f3f4f6;
        }
        .container {
          max-width: 600px;
          margin: 20px auto;
          background-color: #ffffff;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        .header {
          background: linear-gradient(135deg, #9333ea, #2563eb);
          padding: 40px 32px;
          text-align: center;
        }
        .header h1 {
          margin: 0;
          color: white;
          font-size: 28px;
          font-weight: 700;
        }
        .content {
          padding: 40px 32px;
        }
        .greeting {
          color: #111827;
          font-size: 20px;
          font-weight: 600;
          margin: 0 0 16px 0;
        }
        .text {
          color: #4b5563;
          font-size: 16px;
          line-height: 24px;
          margin: 16px 0;
        }
        .warning-box {
          background-color: #fee2e2;
          border: 1px solid #fecaca;
          border-radius: 12px;
          padding: 20px;
          margin: 24px 0;
        }
        .warning-title {
          color: #b45309;
          font-weight: 600;
          font-size: 16px;
          margin: 0 0 8px 0;
        }
        .warning-text {
          color: #92400e;
          font-size: 14px;
          margin: 4px 0;
        }
        .button {
          display: inline-block;
          padding: 14px 32px;
          background: linear-gradient(135deg, #9333ea, #2563eb);
          color: white;
          text-decoration: none;
          border-radius: 8px;
          font-weight: 500;
          font-size: 16px;
          margin: 24px 0;
          box-shadow: 0 4px 6px -1px rgba(147, 51, 234, 0.2);
        }
        .expiry-note {
          background-color: #f3f4f6;
          border-radius: 8px;
          padding: 16px;
          margin: 24px 0;
          text-align: center;
          border: 1px solid #e5e7eb;
        }
        .expiry-text {
          color: #6b7280;
          font-size: 14px;
          margin: 0;
        }
        .footer {
          padding: 24px 32px;
          text-align: center;
          border-top: 1px solid #e5e7eb;
        }
        .footer-text {
          color: #6b7280;
          font-size: 14px;
          margin: 4px 0;
        }
        .security-note {
          color: #9ca3af;
          font-size: 12px;
          margin-top: 16px;
          text-align: center;
        }
        @media only screen and (max-width: 600px) {
          .header { padding: 32px 24px; }
          .content { padding: 32px 24px; }
          .button { display: block; text-align: center; }
        }
      </style>
    </head>
    <body style="background-color: #f3f4f6; margin: 0; padding: 20px;">
      <div class="container" style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
        
        <!-- Header -->
        <div class="header" style="background: linear-gradient(135deg, #9333ea, #2563eb); padding: 40px 32px; text-align: center;">
          <h1 style="margin: 0; color: white; font-size: 28px; font-weight: 700;">🔐 Reset Your Password</h1>
        </div>
        
        <!-- Main content -->
        <div class="content" style="padding: 40px 32px;">
          <h2 class="greeting" style="color: #111827; font-size: 20px; font-weight: 600; margin: 0 0 16px 0;">Hello ${name}!</h2>
          
          <p class="text" style="color: #4b5563; font-size: 16px; line-height: 24px; margin: 16px 0;">
            We received a request to reset your password for your QuizMaster account.
          </p>
          
          <!-- Reset Button -->
          <div style="text-align: center;">
            <a href="${resetLink}" class="button" style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #9333ea, #2563eb); color: white; text-decoration: none; border-radius: 8px; font-weight: 500; font-size: 16px; margin: 24px 0; box-shadow: 0 4px 6px -1px rgba(147, 51, 234, 0.2);">
              Reset Password
            </a>
          </div>
          
          <!-- Warning Box -->
          <div class="warning-box" style="background-color: #fee2e2; border: 1px solid #fecaca; border-radius: 12px; padding: 20px; margin: 24px 0;">
            <p class="warning-title" style="color: #b45309; font-weight: 600; font-size: 16px; margin: 0 0 8px 0;">
              ⚠️ Important Security Information
            </p>
            <p class="warning-text" style="color: #92400e; font-size: 14px; margin: 4px 0;">
              • This link will expire in 1 hour
            </p>
            <p class="warning-text" style="color: #92400e; font-size: 14px; margin: 4px 0;">
              • If you didn't request this, please ignore this email
            </p>
            <p class="warning-text" style="color: #92400e; font-size: 14px; margin: 4px 0;">
              • Never share this link with anyone
            </p>
          </div>
          
          <!-- Expiry Note -->
          <div class="expiry-note" style="background-color: #f3f4f6; border-radius: 8px; padding: 16px; margin: 24px 0; text-align: center; border: 1px solid #e5e7eb;">
            <p class="expiry-text" style="color: #6b7280; font-size: 14px; margin: 0;">
              ⏰ For security reasons, this password reset link will expire in <strong>1 hour</strong>.
            </p>
          </div>
          
          <!-- Alternative Action -->
          <p class="text" style="color: #6b7280; font-size: 15px; margin: 16px 0; text-align: center;">
            Didn't request a password reset? You can safely ignore this email. Your account remains secure.
          </p>
        </div>
        
        <!-- Footer -->
        <div class="footer" style="padding: 24px 32px; text-align: center; border-top: 1px solid #e5e7eb;">
          <p class="footer-text" style="color: #6b7280; font-size: 14px; margin: 4px 0;">© ${new Date().getFullYear()} QuizMaster. All rights reserved.</p>
          <p class="security-note" style="color: #9ca3af; font-size: 12px; margin-top: 16px;">
            This is an automated message, please do not reply to this email.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
};