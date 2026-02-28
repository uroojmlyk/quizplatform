export const getEmailVerificationHTML = (name: string, verificationLink: string) => {
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
        .header p {
          margin: 8px 0 0;
          color: rgba(255, 255, 255, 0.9);
          font-size: 16px;
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
        .verification-box {
          background: linear-gradient(135deg, #f9fafb, #f3f4f6);
          border-radius: 16px;
          padding: 32px;
          text-align: center;
          margin: 32px 0;
          border: 1px solid #e5e7eb;
        }
        .button {
          display: inline-block;
          padding: 16px 36px;
          background: linear-gradient(135deg, #9333ea, #2563eb);
          color: white;
          text-decoration: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 16px;
          margin: 16px 0;
          box-shadow: 0 4px 6px -1px rgba(147, 51, 234, 0.2);
        }
        .benefits {
          background-color: #f9fafb;
          border-radius: 12px;
          padding: 24px;
          margin: 32px 0;
          border: 1px solid #e5e7eb;
        }
        .benefits-title {
          color: #111827;
          font-weight: 600;
          font-size: 18px;
          margin: 0 0 16px 0;
        }
        .benefits-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .benefits-list li {
          color: #4b5563;
          font-size: 15px;
          margin: 12px 0;
          display: flex;
          align-items: center;
        }
        .benefits-list li:before {
          content: "✓";
          color: #10b981;
          font-weight: bold;
          display: inline-block;
          width: 20px;
          height: 20px;
          background-color: #d1fae5;
          border-radius: 50%;
          text-align: center;
          line-height: 20px;
          margin-right: 12px;
        }
        .expiry-note {
          background-color: #fef3c7;
          border: 1px solid #fde68a;
          border-radius: 8px;
          padding: 16px;
          margin: 24px 0;
          text-align: center;
        }
        .expiry-text {
          color: #92400e;
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
          <h1 style="margin: 0; color: white; font-size: 28px; font-weight: 700;">📧 Verify Your Email</h1>
          <p style="margin: 8px 0 0; color: rgba(255, 255, 255, 0.9); font-size: 16px;">Almost there! Just one more step.</p>
        </div>
        
        <!-- Main content -->
        <div class="content" style="padding: 40px 32px;">
          <h2 class="greeting" style="color: #111827; font-size: 20px; font-weight: 600; margin: 0 0 16px 0;">Hello ${name}!</h2>
          
          <p class="text" style="color: #4b5563; font-size: 16px; line-height: 24px; margin: 16px 0;">
            Thank you for creating an account with QuizMaster! To complete your registration and activate your account, please verify your email address by clicking the button below.
          </p>
          
          <!-- Verification Box -->
          <div class="verification-box" style="background: linear-gradient(135deg, #f9fafb, #f3f4f6); border-radius: 16px; padding: 32px; text-align: center; margin: 32px 0; border: 1px solid #e5e7eb;">
            <div style="font-size: 48px; margin-bottom: 16px;">🔐</div>
            <h3 style="color: #111827; font-size: 18px; font-weight: 600; margin: 0 0 16px 0;">Email Verification</h3>
            
            <!-- Verify Button -->
            <div style="text-align: center;">
              <a href="${verificationLink}" class="button" style="display: inline-block; padding: 16px 36px; background: linear-gradient(135deg, #9333ea, #2563eb); color: white; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; margin: 16px 0; box-shadow: 0 4px 6px -1px rgba(147, 51, 234, 0.2);">
                Verify Email Address
              </a>
            </div>
          </div>
          
          <!-- Benefits -->
          <div class="benefits" style="background-color: #f9fafb; border-radius: 12px; padding: 24px; margin: 32px 0; border: 1px solid #e5e7eb;">
            <p class="benefits-title" style="color: #111827; font-weight: 600; font-size: 18px; margin: 0 0 16px 0;">
              ✨ After verification, you'll get:
            </p>
            <ul class="benefits-list" style="list-style: none; padding: 0; margin: 0;">
              <li style="color: #4b5563; font-size: 15px; margin: 12px 0; display: flex; align-items: center;">
                <span style="color: #10b981; font-weight: bold; display: inline-block; width: 20px; height: 20px; background-color: #d1fae5; border-radius: 50%; text-align: center; line-height: 20px; margin-right: 12px;">✓</span>
                Full access to all quizzes
              </li>
              <li style="color: #4b5563; font-size: 15px; margin: 12px 0; display: flex; align-items: center;">
                <span style="color: #10b981; font-weight: bold; display: inline-block; width: 20px; height: 20px; background-color: #d1fae5; border-radius: 50%; text-align: center; line-height: 20px; margin-right: 12px;">✓</span>
                Track your progress
              </li>
              <li style="color: #4b5563; font-size: 15px; margin: 12px 0; display: flex; align-items: center;">
                <span style="color: #10b981; font-weight: bold; display: inline-block; width: 20px; height: 20px; background-color: #d1fae5; border-radius: 50%; text-align: center; line-height: 20px; margin-right: 12px;">✓</span>
                Earn achievements and badges
              </li>
              <li style="color: #4b5563; font-size: 15px; margin: 12px 0; display: flex; align-items: center;">
                <span style="color: #10b981; font-weight: bold; display: inline-block; width: 20px; height: 20px; background-color: #d1fae5; border-radius: 50%; text-align: center; line-height: 20px; margin-right: 12px;">✓</span>
                Challenge friends and compete
              </li>
            </ul>
          </div>
          
          <!-- Expiry Note -->
          <div class="expiry-note" style="background-color: #fef3c7; border: 1px solid #fde68a; border-radius: 8px; padding: 16px; margin: 24px 0; text-align: center;">
            <p class="expiry-text" style="color: #92400e; font-size: 14px; margin: 0;">
              ⏰ This verification link will expire in <strong>24 hours</strong>.
            </p>
          </div>
          
          <p class="text" style="color: #6b7280; font-size: 15px; margin: 16px 0; text-align: center;">
            If you didn't create an account with QuizMaster, you can safely ignore this email.
          </p>
        </div>
        
        <!-- Footer -->
        <div class="footer" style="padding: 24px 32px; text-align: center; border-top: 1px solid #e5e7eb;">
          <p class="footer-text" style="color: #6b7280; font-size: 14px; margin: 4px 0;">© ${new Date().getFullYear()} QuizMaster. All rights reserved.</p>
          <p class="footer-text" style="color: #9ca3af; font-size: 13px; margin: 4px 0;">
            Made with <span style="color: #ef4444;">❤️</span> for learning
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
};