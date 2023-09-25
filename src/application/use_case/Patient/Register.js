import PatientEntity from "../../../entities/Patient.js";
import nodemailer from "nodemailer";
import config from "../../../config/config.js";

const register = async (
  name,
  email,
  phone,
  password,
  repositories,
  authService
) => {
  return repositories.PatientExist(email).then(async (patient) => {
    if (!patient) {
      const HashPassword = await authService.BcryptPassword(password);

      const PatientDetails = PatientEntity(name, email, phone, HashPassword);
      const newPatient = await repositories.Create(PatientDetails);
      // const {id} = newPatient
      console.log(newPatient, "newPatient");
      const accessToken = await authService.createAccessToken(newPatient._id);
      const update = await repositories.update(newPatient._id, accessToken);

      console.log(accessToken);

      console.log("true");
      const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: config.Email,
          pass: config.EmailPassword,
        },
      });
      const token = encodeURIComponent(accessToken);
      console.log(token, "token");
      const verificationLink = `http://localhost:3000/api/v1/patient/verify/${token}`;

      const mailOptions = {
        from: config.Email,
        to: newPatient.email,
        subject: "Email Verification",
        text: ".",
        html: `<h1></h1>
          <p>Thank you for registering with our platform. To complete your registration, please click the button below to verify your email address:</p>
          <p><a href=${verificationLink}   target="_blank" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px;">Verify Email</a></p>
          <p>The link <b>expires in 2 minutes</>.</p>
         
        `,
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
    } else {
      console.log("user already exist");
      return { message: "user already exist", status: false };
    }
  });
};

export default register;
