import { config } from "dotenv";

config();

const Env = {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  bcrypt_salt_round: process.env.BCRYPT_SALT_ROUNDS,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
  payment_url: process.env.PAYMENT_URL,
  store_id: process.env.STORE_ID,
  signature_key: process.env.SIGNATURE_KEY,
  payment_verification_url: process.env.PAYMENT_VERIFICATION_URL,
  imagekit_urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
  imagekit_privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  imagekit_publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  imagekit_folderId: process.env.IMAGEKIT_FOLDER_ID,
  base_url: process.env.BASE_URL,
  cancel_url: process.env.CANCEL_URL
};

export default Env;
