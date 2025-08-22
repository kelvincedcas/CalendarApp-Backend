export const getOtpHtml = (name, otp) => {
  const logoURL = process.env.LOGO_URL || "";

  return `
  <!DOCTYPE html>
  <html lang="es">
    <head>
      <meta charset="UTF-8" />
      <title>OTP Code</title>
    </head>
    <body style="background-color:#ffffff;font-family:HelveticaNeue,Helvetica,Arial,sans-serif;">
      <div style="background-color:#ffffff;border:1px solid #eee;border-radius:5px;box-shadow:0 5px 10px rgba(20,50,70,.2);margin:20px auto;max-width:360px;padding:68px 0 130px;">
        <img src="${logoURL}" width="110" alt="CalendarApp" style="display:block;margin:0 auto;" />
        <p style="color:#6750a4;font-size:11px;font-weight:700;font-family:HelveticaNeue,Helvetica,Arial,sans-serif;height:16px;line-height:16px;margin:16px 8px 8px 8px;text-transform:uppercase;text-align:center;">
          Verify Your Identity
        </p>
        <div style="padding-left:40px;padding-right:40px;text-align:center;">
        <h1 style="color:#000;display:inline-block;font-family:HelveticaNeue-Medium,Helvetica,Arial,sans-serif;font-size:20px;font-weight:500;line-height:24px;margin:0;text-align:center;margin-bottom:5px;">Hello ${name}!</h1>
        <h2 style="color:#000;display:inline-block;font-family:HelveticaNeue-Medium,Helvetica,Arial,sans-serif;font-size:20px;font-weight:500;line-height:24px;margin:0;text-align:center;">
          Enter the following code to confirm your account in CalendarApp.
        </h2>
        </div>
        <div style="background:rgba(0,0,0,.05);border-radius:4px;margin:16px auto 14px;width:280px;">
          <p style="color:#000;font-family:HelveticaNeue-Bold;font-size:32px;font-weight:700;letter-spacing:6px;line-height:40px;padding:8px 0;margin:0 auto;text-align:center;">
            ${otp}
          </p>
        </div>
        <p style="color:#444;font-size:14px;font-family:HelveticaNeue,Helvetica,Arial,sans-serif;line-height:23px;padding:0 40px;margin:0;text-align:center;margin-bottom:8px;">
          This code expires in 15 minutes.
        </p>
        <p style="color:#444;font-size:15px;font-family:HelveticaNeue,Helvetica,Arial,sans-serif;line-height:23px;padding:0 40px;margin:0;text-align:center;">
          Ignore this message if you did not request this code.
        </p>
      </div>
      <p style="color:#000;font-size:12px;font-weight:500;line-height:23px;margin-top:20px;font-family:HelveticaNeue,Helvetica,Arial,sans-serif;text-align:center;">
        Securely powered by CalendarApp.
      </p>
    </body>
  </html>
  `;
};
