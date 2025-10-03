import { v2 as cloudinary } from 'cloudinary';
import { config_cloudinary_env } from '../config/config';

cloudinary.config({
  cloud_name: config_cloudinary_env.cloudinary_name,
  api_key: config_cloudinary_env.cloudinary_apikey,
  api_secret: config_cloudinary_env.cloudinary_secret_key,
});

export default cloudinary;
