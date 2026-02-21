import {v2 as cloudinary} from "cloudinary"

// can't pass these values directly, need to place them in an env variable
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_secret:process.env.CLOUDINARY_API_SECRET,
    api_key:process.env.CLOUDINARY_API_KEY
});

export default cloudinary;
