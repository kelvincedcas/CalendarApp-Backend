
import nodemailer from 'nodemailer';
import { getOtpHtml } from './getOtpHtml.js';

export const sendOTPEmail = async(name, email, otp) => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: true,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });
    try {

      const emailHtml = getOtpHtml(name, otp);

      await transporter.sendMail({
        from: 'CalendarApp',
        to: email,
        subject: 'OTP code - Confirm your account',
        html: emailHtml,
      });
    } catch (error) {
      console.log(error);
    }
}