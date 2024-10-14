export const verifyEmailTemplate = (verificationToken: string) => `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
    <style>
      body {
        background-color: #f4f4f7;
        margin: 0;
        padding: 0;
        font-family: 'Arial', sans-serif;
      }
      .container {
        max-width: 600px;
        margin: 40px auto;
        background-color: #ffffff;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        padding: 20px;
        text-align: center;
      }
      .header {
        background-color: #007bff;
        padding: 10px;
        border-radius: 8px 8px 0 0;
      }
      .header h2 {
        color: #ffffff;
        margin: 0;
      }
      .content {
        padding: 20px;
        text-align: left;
      }
      .content p {
        color: #333333;
        line-height: 1.6;
      }
      .button-container {
        text-align: center;
        margin: 20px 0;
      }
      .button {
        background-color: #007bff;
        color: #ffffff;
        padding: 15px 25px;
        text-align: center;
        text-decoration: none;
        border-radius: 50px;
        font-size: 16px;
        font-weight: bold;
        transition: background-color 0.3s ease;
      }
      .button:hover {
        background-color: #0056b3;
      }
      .footer {
        margin-top: 30px;
        color: #999999;
        font-size: 12px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h2>Email Verification</h2>
      </div>
      <div class="content">
        <p>Welcome! Thank you for signing up. To complete your registration, please verify your email address by clicking the button below:</p>
        <div class="button-container">
          <a href="${process.env.NEXT_URL}/en/verify-email/${verificationToken}" target="_blank" class="button">Verify Email</a>
        </div>
        <p>If you did not create an account, please ignore this email.</p>
      </div>
      <div class="footer">
        <p>© ${new Date().getFullYear()} Your Company. All rights reserved.</p>
      </div>
    </div>
  </body>
  </html>
`
