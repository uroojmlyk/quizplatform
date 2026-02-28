export const getWelcomeEmailHTML = (name: string, verificationLink: string) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        /* Email clients ke liye fallback styles */
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
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }
        .header {
          background: linear-gradient(135deg, #9333ea, #2563eb);
          padding: 48px 32px;
          text-align: center;
        }
        .header h1 {
          margin: 0;
          color: white;
          font-size: 32px;
          font-weight: 700;
          letter-spacing: -0.025em;
        }
        .content {
          padding: 48px 32px;
        }
        .greeting {
          color: #111827;
          font-size: 24px;
          font-weight: 600;
          margin: 0 0 8px 0;
        }
        .text {
          color: #4b5563;
          font-size: 16px;
          line-height: 24px;
          margin: 16px 0;
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
        .features {
          background-color: #f9fafb;
          border-radius: 12px;
          padding: 24px;
          margin: 32px 0;
          border: 1px solid #e5e7eb;
        }
        .features-title {
          color: #111827;
          font-weight: 600;
          font-size: 18px;
          margin: 0 0 16px 0;
        }
        .features-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .features-list li {
          color: #4b5563;
          font-size: 15px;
          margin: 12px 0;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .features-list li::before {
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
          margin-right: 8px;
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
        .note {
          color: #9ca3af;
          font-size: 13px;
          margin-top: 16px;
        }
        @media only screen and (max-width: 600px) {
          .header { padding: 32px 24px; }
          .header h1 { font-size: 24px; }
          .content { padding: 32px 24px; }
          .button { display: block; text-align: center; }
        }
      </style>
    </head>
    <body style="background-color: #f3f4f6; margin: 0; padding: 20px;">
      <div class="container" style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
        
        <!-- Header with gradient -->
        <div class="header" style="background: linear-gradient(135deg, #9333ea, #2563eb); padding: 48px 32px; text-align: center;">
          <h1 style="margin: 0; color: white; font-size: 32px; font-weight: 700;">🎉 Welcome to QuizMaster!</h1>
        </div>
        
        <!-- Main content -->
        <div class="content" style="padding: 48px 32px;">
          <h2 class="greeting" style="color: #111827; font-size: 24px; font-weight: 600; margin: 0 0 8px 0;">Hello ${name}!</h2>
          
          <p class="text" style="color: #4b5563; font-size: 16px; line-height: 24px; margin: 16px 0;">
            Thank you for joining QuizMaster! We're excited to have you on board.
          </p>
          
          <!-- Verification button -->
          <div style="text-align: center;">
            <a href="${verificationLink}" class="button" style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #9333ea, #2563eb); color: white; text-decoration: none; border-radius: 8px; font-weight: 500; font-size: 16px; margin: 24px 0; box-shadow: 0 4px 6px -1px rgba(147, 51, 234, 0.2);">
              Verify Email Address
            </a>
          </div>
          
          <!-- Features section -->
          <div class="features" style="background-color: #f9fafb; border-radius: 12px; padding: 24px; margin: 32px 0; border: 1px solid #e5e7eb;">
            <p class="features-title" style="color: #111827; font-weight: 600; font-size: 18px; margin: 0 0 16px 0;">
              With QuizMaster you can:
            </p>
            <ul class="features-list" style="list-style: none; padding: 0; margin: 0;">
              <li style="color: #4b5563; font-size: 15px; margin: 12px 0; display: flex; align-items: center;">
                <span style="color: #10b981; font-weight: bold; display: inline-block; width: 20px; height: 20px; background-color: #d1fae5; border-radius: 50%; text-align: center; line-height: 20px; margin-right: 8px;">✓</span>
                Create and take quizzes
              </li>
              <li style="color: #4b5563; font-size: 15px; margin: 12px 0; display: flex; align-items: center;">
                <span style="color: #10b981; font-weight: bold; display: inline-block; width: 20px; height: 20px; background-color: #d1fae5; border-radius: 50%; text-align: center; line-height: 20px; margin-right: 8px;">✓</span>
                Track your progress with detailed analytics
              </li>
              <li style="color: #4b5563; font-size: 15px; margin: 12px 0; display: flex; align-items: center;">
                <span style="color: #10b981; font-weight: bold; display: inline-block; width: 20px; height: 20px; background-color: #d1fae5; border-radius: 50%; text-align: center; line-height: 20px; margin-right: 8px;">✓</span>
                Earn achievements and badges
              </li>
              <li style="color: #4b5563; font-size: 15px; margin: 12px 0; display: flex; align-items: center;">
                <span style="color: #10b981; font-weight: bold; display: inline-block; width: 20px; height: 20px; background-color: #d1fae5; border-radius: 50%; text-align: center; line-height: 20px; margin-right: 8px;">✓</span>
                Challenge friends and compete
              </li>
            </ul>
          </div>
          
          <p class="text" style="color: #6b7280; font-size: 15px; margin: 16px 0;">
            If you didn't create an account, please ignore this email.
          </p>
          
          <div class="note" style="color: #9ca3af; font-size: 13px; margin-top: 16px; padding-top: 16px; border-top: 1px solid #e5e7eb;">
            <p style="margin: 0;">⏰ This verification link will expire in 24 hours.</p>
          </div>
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