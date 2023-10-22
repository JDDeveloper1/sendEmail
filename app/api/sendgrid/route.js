import mail from "@sendgrid/mail";
import { NextResponse } from "next/server";

export async function POST(request) {
  let response = {};
  const body = await request.json();
  // Check that the expected properties are present in the body object
  if (!body.fullName || !body.email || !body.subject || !body.message) {
    response = {
      status: "error",
      message: "Missing required fields",
    };
    return NextResponse.json(response);
  }

  mail.setApiKey(process.env.SENDGRID_API_KEY);
  const message = `
        FullName: ${body.fullName}
        Email: ${body.email}
        Subject: ${body.subject}
        Message: ${body.message}
     `;
  const data = {
    to: "jose.david.soto92@gmail.com",
    from: "jodasos03@gmail.com",
    subject: `[Lead from website] : ${body.subject}`,
    text: message,
    html: `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html lang="en">
        <head>
          <meta charset="utf-8">
          <title>The HTML5 Herald</title>
          <meta name="description" content="The HTML5 Herald">
          <meta name="author" content="SitePoint">
          <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
          <link rel="stylesheet" href="css/styles.css?v=1.0">
        </head>
      <body> 
      <div class="img-container" style="display: flex;justify-content: center;align-items: center;border-radius: 5px;overflow: hidden; font-family: 'helvetica', 'ui-sans';">
      </div>
      <div class="container" style="margin-left: 20px;margin-right: 20px;">
        <h3>You've got a new mail from ${body.fullName}, their email is: ✉️${body.email} </h3>
        <div style="font-size: 16px;">
          <p>Message:</p>
          <p>${body.message}</p>
          <br>
        </div>
        <img src="https://img.freepik.com/vector-gratis/logotipo-codigo-degradado-creativo_23-2148820572.jpg?size=338&ext=jpg&ga=GA1.1.1016474677.1696377600&semt=ais" class="logo-image" style="height: 50px;width: 50px;border-radius: 5px;overflow: hidden;">
        <p class="footer" style="font-size: 16px;padding-bottom: 20px;border-bottom: 1px solid #000;">Regards<br>David Soto<br>Software Developer<br>+34 666 367 664</p>
        <div class="footer-links" style="display: flex;justify-content: center;align-items: center;">
          <a href="https://Jddeveloper1.com" style="text-decoration: none;margin: 10px;color: #000;background: #547761;pading: 4px">Website</a>
        </div>
      </div>
      </body>
      </html>
    `,
  };
  try {
    await mail.send(data);
    response = {
      status: "success",
      message: "Your message was sent. I'll be in contact shortly.",
    };
  } catch (error) {
    console.error(error);
    response = {
      status: "error",
      message: `Message failed to send with error, ${error.message}`,
    };
  }
  return NextResponse.json(response);
}
