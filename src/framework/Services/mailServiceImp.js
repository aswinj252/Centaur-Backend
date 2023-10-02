import nodemailer from "nodemailer";
import config from "../../config/config.js";


export default function mailServiceImp() {
  const sentMail = (name, email) => {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: config.Email,
        pass: config.EmailPassword,
      },
    });

    const mailOptions = {
      from: config.Email,
      to: email,
      subject: "Approval ",
      text: "Your application has been Approved.",
      html: `<h1>Hello Dr ${name} </h1><p>This is a <strong>Approval Email </strong> of your application .</p> <br><p>  From now onwards you can login with your credentials and can schedule appointments<p/>`,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log("Error occurred:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });
  };

  const rejectApplication = (name, email) => {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: config.Email,
        pass: config.EmailPassword,
      },
    });

    const mailOptions = {
      from: config.Email,
      to: email,
      subject: "Rejection Mail ",
      text: "Your application has been Rejected.",
      html: `<h1>Hello Dr ${name} </h1><p>This is an email to inform you that your applicaiton has been rejected  .</p> <br><p>Reason:We are looking for more experience Doctor <p/>`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log("Error occurred:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });
  };
  const SentVerification = (token,email) =>{
    const verifyToken = encodeURIComponent(token);
    const verificationLink = `http://localhost:3000/api/v1/patient/verify/${verifyToken}`;

    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: config.Email,
          pass: config.EmailPassword,
        },
      });

    const mailOptions = {
        from: config.Email,
        to: email,
        subject: "Email Verification",
        text: ".",
        html: `<h1></h1>
          <p>Thank you for registering with our platform. To complete your registration, please click the button below to verify your email address:</p>
          <p><a href=${verificationLink}   target="_blank" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px;">Verify Email</a></p>
          <p>The link <b>expires in 2 minutes</>.</p>`,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log("Error occurred:", error);
        } else {
          console.log("Email sent:", info.response);
        }

      });
      return {
        status: true,
        message:
          "A verification email has been sent to your email .Please verify your email to login to your account",
      };


  }

  return { sentMail, rejectApplication,SentVerification };
}
