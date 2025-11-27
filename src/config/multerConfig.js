// src/config/multerConfig.js
const path = require('path');

require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

console.log("--- DEBUG CLOUDINARY ---");
console.log("Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME);
console.log("API Key:", process.env.CLOUDINARY_API_KEY ? "Carregada" : "FALTANDO");
console.log("API Secret:", process.env.CLOUDINARY_API_SECRET ? "Carregada" : "FALTANDO");
console.log("------------------------");

if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    throw new Error("ERRO CRÍTICO: As chaves do Cloudinary não foram encontradas no arquivo .env!");
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'pets_patas_conscientes',
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
  },
});

const upload = multer({ storage: storage });

module.exports = upload;