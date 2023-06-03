import fs from "fs";
import { v2 as cloudinary } from 'cloudinary'
import bodyParser from "body-parser";
import multer from "multer";

cloudinary.config({ //esto es privado
    cloud_name: 'dge4tyjn4',
    api_key: '918428231237698',
    api_secret: 'VN0HAyWjh0kvBEsKd81ZY8ekE5M'
  });
  

// Configuración de Multer para manejar la subida de archivos
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Directorio donde se guardarán temporalmente los archivos subidos
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname); // Nombre de archivo único
    }
  });
  
const upload = multer({ storage });



export function subirFotoNube(path) {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(path, (error, result) => {
        if (error) {
          console.error(error);
          reject("11");
        }
  
        // Eliminar el archivo temporal después de subirlo a Cloudinary
        fs.unlinkSync(path);
  
        // Obtener el enlace público de la imagen subida en Cloudinary
        const imageUrl = result.secure_url;
        resolve(imageUrl);
      });
    });
  }