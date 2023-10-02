import nodemailer from "nodemailer";
import config from "../../../config/config.js";
import otpGenerator from "otp-generator"

const OtpSent = async (email, repository) => {
  const userExist = await repository.PatientExist(email);
  console.log(userExist, "user");
  if (!userExist) {
    return { status: false, message: "no account found please signup" };
  } else {
    function generateOTP() {

     const OTP=   otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false,lowerCaseAlphabets:false });
//     
const timestamp = Date.now();
const expirationTime = 5 * 60 * 1000;
const expiresin =  timestamp + expirationTime
console.log(expiresin);

      return ({OTP,expiresin});
    }

    const otp = generateOTP();

    console.log(otp);

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
      subject: "OTP Verification",
      text: ".",
      html: ` <h1>Centaur Verification</h1>
        <p>Thank you for choosing Centaur. To complete your login, please use the following OTP (One-Time Password):</p>
        <h2>${otp.OTP}</h2>
        <p>Do not share this OTP with anyone. It's for your account security.</p>
        
  
        `,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log("Error occurred:", error);

      } else {
        
        console.log("Email sent:", info.response);
       
        
      }
    });

    return ({otp,status:true,message:"otp sent successfully"})
  }
};
export default OtpSent;
