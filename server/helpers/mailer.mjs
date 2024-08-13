import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();


const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  service: 'gmail', 
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});


export const sendRegistrationEmail = (userEmail, firstName) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: 'Welcome to Our Community!',
    text: `Hi ${firstName},\n\nWelcome to our community! We're thrilled to have you with us.\n\nYour login email is: ${userEmail}\n\nCheers,\nThe Team`,
    html: `
      <html>
        <body style="font-family: Arial, sans-serif; margin: 0; padding: 0;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="background-color: #f4f4f4; padding: 20px;">
                <table width="600" cellpadding="0" cellspacing="0" align="center">
                  <tr>
                    <td style="background-color: #ffffff; padding: 20px; border-radius: 10px;">
                      <h1 style="color: #333333; text-align: center;">Welcome to Our Community, ${firstName}! 🎉</h1>
                      <p style="color: #666666; font-size: 16px;">
                        Hi ${firstName},
                      </p>
                      <p style="color: #666666; font-size: 16px;">
                        We're thrilled to have you with us! You have successfully registered to our site. Here are your details:
                      </p>
                      <p style="color: #666666; font-size: 16px;">
                        <strong>Your login email:</strong> ${userEmail}
                      </p>
                      <p style="color: #666666; font-size: 16px;">
                        We hope you enjoy your experience with us. If you have any questions, feel free to reach out!
                      </p>
                      <p style="color: #666666; font-size: 16px;">
                        Cheers,<br/>
                        <strong>The Team</strong>
                        <h4>Regards,</h4>
                        <h3>Abhishek</h3>
                      </p>
                      <hr style="border: 0; border-top: 1px solid #dddddd; margin: 20px 0;" />
                      <p style="color: #999999; font-size: 12px; text-align: center;">
                        This is an automated message, please do not reply.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email: ', error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};


export const sendForgotEmail = (email, link) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Password Reset Request',
    text: `You requested a password reset. Click the link below to reset your password.`,
    html: `
      <html>
        <body style="font-family: Arial, sans-serif; margin: 0; padding: 0;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="background-color: #f4f4f4; padding: 20px;">
                <table width="600" cellpadding="0" cellspacing="0" align="center">
                  <tr>
                    <td style="background-color: #ffffff; padding: 20px; border-radius: 10px;">
                      <h2 style="color: #333333; text-align: center;">Password Reset Request</h2>
                      <p style="color: #666666; font-size: 16px;">
                        Click the link below to reset your password:
                      </p>
                      <p style="text-align: center; margin: 20px 0;">
                        <a href="${link}" target="_blank" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #ffffff; text-decoration: none; border-radius: 5px;">Reset Password</a>
                      </p>
                      <p style="color: #666666; font-size: 16px;">
                        This link will expire in 5 minutes. If you did not request a password reset, please ignore this email.
                      </p>
                      <hr style="border: 0; border-top: 1px solid #dddddd; margin: 20px 0;" />
                      <p style="color: #999999; font-size: 12px; text-align: center;">
                        This is an automated message, please do not reply.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email: ', error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};
