import * as cloudinary from "cloudinary";
require("dotenv").config;

cloudinary.v2.config({
  cloud_name: "dgticmyel",
  api_key: "445223139187666",
  api_secret: "AiM_nliWWs3DhqOYk19nDNSPOh8",
});

export const uploadPicture = async (profilePic: string) => {
  try {
    const response = await cloudinary.v2.uploader.upload(profilePic);
  } catch (error) {
    console.error(error);
  }
};
