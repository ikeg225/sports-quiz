import sendgrid from "@sendgrid/mail";

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

async function sendEmail(req, res) {
  try {
    await sendgrid.send({
      to: "eikeg225@gmail.com", // Your email where you'll receive emails
      from: "help@sportsquiz.org", // your website email address here
      subject: "Sports Quiz Contact",
      html: `
      <!DOCTYPE html>
      <html lang="en">
        <head>
            <meta charset="utf-8">
            <title>Sports Quiz</title>      
        </head>
        <body>
            <h3>Name: ${req.body.fullname}</h3>
            <h3>Email: ${req.body.email}</h3>
            <h3>Subject: ${req.body.subject}</h3>
            <p>Message:</p>
            <p>${req.body.message}</p>
        </body>
      </html>`,
    });
  } catch (error) {
    // console.log(error);
    return res.status(error.statusCode || 500).json({ error: error.message });
  }

  return res.status(200).json({ error: "" });
}

export default sendEmail;