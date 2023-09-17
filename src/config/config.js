import dotenv from 'dotenv';
dotenv.config();

export default {
  port: process.env.PORT,
  mongo: {
    uri: process.env.MONGO_URL 
  },
  RefreshTokenKey:process.env.RefreshTokenKey,
  JWT_SecretKey:process.env.JWT_SecretKey,
  secret:process.env.Secretaccesskey,
  accessKey:process.env.Accesskey,
  region:process.env.BUCKET_REGION,
  Bucketname:process.env.BUCKET_NAME,
  EmailPassword:process.env.EmailPassword,
  Email:process.env.Email,
  StripeSk:process.env.StripeSecretKey,
  StripePk:process.env.StripePublicKey



};
 