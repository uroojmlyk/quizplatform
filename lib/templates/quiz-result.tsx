export const getQuizResultHTML = (
  name: string,
  quizTitle: string,
  score: number,
  totalMarks: number,
  percentage: number,
  resultLink: string
) => {
  const isPassed = percentage >= 60;
  const gradeColor = isPassed ? '#059669' : '#b45309';
  const bgColor = isPassed ? '#d1fae5' : '#fee2e2';
  
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
        .quiz-title {
          color: #4b5563;
          font-size: 18px;
          margin: 0 0 24px 0;
          padding-bottom: 16px;
          border-bottom: 1px solid #e5e7eb;
        }
        .score-card {
          background: linear-gradient(135deg, #f9fafb, #f3f4f6);
          border-radius: 16px;
          padding: 32px;
          text-align: center;
          margin: 24px 0;
          border: 1px solid #e5e7eb;
        }
        .score-label {
          color: #6b7280;
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 8px;
        }
        .score-number {
          font-size: 48px;
          font-weight: 700;
          color: #111827;
          line-height: 1.2;
          margin-bottom: 8px;
        }
        .percentage-badge {
          display: inline-block;
          padding: 8px 24px;
          background-color: ${bgColor};
          color: ${gradeColor};
          font-size: 24px;
          font-weight: 700;
          border-radius: 9999px;
          margin-top: 16px;
        }
        .message {
          text-align: center;
          font-size: 18px;
          color: ${gradeColor};
          font-weight: 500;
          margin: 24px 0;
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
        .stats {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin: 32px 0;
        }
        .stat-item {
          background-color: #f9fafb;
          padding: 16px;
          border-radius: 12px;
          text-align: center;
          border: 1px solid #e5e7eb;
        }
        .stat-label {
          color: #6b7280;
          font-size: 12px;
          text-transform: uppercase;
          margin-bottom: 4px;
        }
        .stat-value {
          color: #111827;
          font-size: 20px;
          font-weight: 600;
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
          .score-number { font-size: 36px; }
          .button { display: block; text-align: center; }
        }
      </style>
    </head>
    <body style="background-color: #f3f4f6; margin: 0; padding: 20px;">
      <div class="container" style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
        
        <!-- Header -->
        <div class="header" style="background: linear-gradient(135deg, #9333ea, #2563eb); padding: 40px 32px; text-align: center;">
          <h1 style="margin: 0; color: white; font-size: 28px; font-weight: 700;">${isPassed ? '🎉 Congratulations!' : '📝 Quiz Completed'}</h1>
          <p style="margin: 8px 0 0; color: rgba(255, 255, 255, 0.9); font-size: 16px;">Your results are ready</p>
        </div>
        
        <!-- Main content -->
        <div class="content" style="padding: 40px 32px;">
          <h2 class="greeting" style="color: #111827; font-size: 20px; font-weight: 600; margin: 0 0 16px 0;">Hello ${name}!</h2>
          
          <div class="quiz-title" style="color: #4b5563; font-size: 18px; margin: 0 0 24px 0; padding-bottom: 16px; border-bottom: 1px solid #e5e7eb;">
            You have completed: <strong>${quizTitle}</strong>
          </div>
          
          <!-- Score Card -->
          <div class="score-card" style="background: linear-gradient(135deg, #f9fafb, #f3f4f6); border-radius: 16px; padding: 32px; text-align: center; margin: 24px 0; border: 1px solid #e5e7eb;">
            <div class="score-label" style="color: #6b7280; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;">Your Score</div>
            <div class="score-number" style="font-size: 48px; font-weight: 700; color: #111827; line-height: 1.2; margin-bottom: 8px;">
              ${score}/${totalMarks}
            </div>
            <div class="percentage-badge" style="display: inline-block; padding: 8px 24px; background-color: ${bgColor}; color: ${gradeColor}; font-size: 24px; font-weight: 700; border-radius: 9999px; margin-top: 16px;">
              ${percentage}%
            </div>
          </div>
          
          <!-- Stats Grid -->
          <div class="stats" style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin: 32px 0;">
            <div class="stat-item" style="background-color: #f9fafb; padding: 16px; border-radius: 12px; text-align: center; border: 1px solid #e5e7eb;">
              <div class="stat-label" style="color: #6b7280; font-size: 12px; text-transform: uppercase;">Correct</div>
              <div class="stat-value" style="color: #111827; font-size: 20px; font-weight: 600;">${score}</div>
            </div>
            <div class="stat-item" style="background-color: #f9fafb; padding: 16px; border-radius: 12px; text-align: center; border: 1px solid #e5e7eb;">
              <div class="stat-label" style="color: #6b7280; font-size: 12px; text-transform: uppercase;">Incorrect</div>
              <div class="stat-value" style="color: #111827; font-size: 20px; font-weight: 600;">${totalMarks - score}</div>
            </div>
          </div>
          
          <!-- Message -->
          <div class="message" style="text-align: center; font-size: 18px; color: ${gradeColor}; font-weight: 500; margin: 24px 0;">
            ${isPassed ? 'Great job! Keep up the good work! 🎯' : 'Better luck next time! Keep practicing! 💪'}
          </div>
          
          <!-- View Details Button -->
          <div style="text-align: center;">
            <a href="${resultLink}" class="button" style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #9333ea, #2563eb); color: white; text-decoration: none; border-radius: 8px; font-weight: 500; font-size: 16px; margin: 24px 0; box-shadow: 0 4px 6px -1px rgba(147, 51, 234, 0.2);">
              View Detailed Results
            </a>
          </div>
        </div>
        
        <!-- Footer -->
        <div class="footer" style="padding: 24px 32px; text-align: center; border-top: 1px solid #e5e7eb;">
          <p class="footer-text" style="color: #6b7280; font-size: 14px; margin: 4px 0;">© ${new Date().getFullYear()} QuizMaster. All rights reserved.</p>
          <p class="footer-text" style="color: #9ca3af; font-size: 13px; margin: 4px 0;">Keep learning! 📚</p>
        </div>
      </div>
    </body>
    </html>
  `;
};