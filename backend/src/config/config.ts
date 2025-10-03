import dotenv from 'dotenv';

dotenv.config();
// console.log('checking if its connected ');

export const config_port = process.env.PORT;
export const mongo_url = process.env.MONGO_URI as string;
export const jwt_secret = process.env.JWT_SECRET as string;
