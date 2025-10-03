import dotenv from 'dotenv';

dotenv.config();
// console.log('checking if its connected ');

export const config_port = process.env.PORT;
export const mongo_url = process.env.MONGO_URI as string;
export const jwt_secret = process.env.JWT_SECRET as string;
export const resend_api_key = process.env.RESEND_API_KEY as string;
export const email_from = process.env.EMAIL_FROM as string;
export const email_from_name = process.env.EMAIL_FROM_NAME as string;
