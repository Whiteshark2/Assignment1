const nodemailer=require('nodemailer')

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });


 module.exports.mailer= async function (name,email,token) {
    
    const info = await transporter.sendMail({
      from:process.env.EMAIL, 
      to: email, 
      subject: "Email Verification", 
      html: `<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Email Verification</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  background-color: #f4f4f4;
                  padding: 20px;
              }
      
              .card {
                  background-color: #ffffff;
                  border-radius: 10px;
                  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                  padding: 20px;
                  max-width: 400px;
                  margin: 0 auto;
              }
      
              .card p {
                  font-size: 16px;
                  color: #333;
                  margin-bottom: 20px;
              }
      
              .card a {
                  text-decoration: none;
                  color: #007bff;
              }
          </style>
      </head>
      <body>
      
      <div class="card">
          <p>Hello ${name},</p>
          <p>Click <a href="http://localhost:8000/api/verify/${token}">here</a> to verify your email.</p>
      </div>
      </body>
      </html>
      `,
    });
  
    console.log("Message sent: %s", info.messageId);
    
  }