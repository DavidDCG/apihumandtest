// src/controllers/authController.js
const jwt = require('jsonwebtoken');
const { dataReturn } = require('../helpers/constants');
require('dotenv').config();

const secretKey = process.env.SECRET_KEY; // Cambia esto con una clave segura
// Función para generar un token JWT
function generateToken(user) {
  return jwt.sign({ user }, secretKey, { expiresIn: '1h' });
}
function verifyToken(req, res, next) {
  // Obtener el token del encabezado "Authorization"
  const authHeader = req.headers['authorization'];
  // Verificar si el encabezado está presente
  if (!authHeader) {
    dataReturn.message = "Token no proporcionado"
    dataReturn.valid = false;
    dataReturn.data = [{ bearer_Token: authHeader, status: 403 }];
    dataReturn.type = "verify"
    //  return res.status(403).json(dataReturn);
  } else {
    // Verificar si el encabezado comienza con "Bearer "
    const tokenParts = authHeader.split(' ');
    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
      dataReturn.message = "Formato de token no válido"
      dataReturn.valid = false;
      dataReturn.data = [{ bearer_Token: authHeader, status: 401 }];
      dataReturn.type = "verify";
      //return res.status(401).json({ message: 'Formato de token no válido' });
    }
    // Obtener el token desde la segunda parte del encabezado
    const token = tokenParts[1];
    // Verificar el token utilizando la clave secreta
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        dataReturn.message = "Token no válido";
        dataReturn.valid = false;
        dataReturn.data = [{ bearer_Token: authHeader, status: 401 }];
        dataReturn.type = "verify"
        //return res.status(401).json({ message: 'Token no válido' });
      } else {
        dataReturn.message = "Token válido";
        dataReturn.valid = true;
        dataReturn.data = [{ bearer_Token: authHeader, status: 202 }];
        dataReturn.type = "verify"
      }
      // Adjuntar la información del usuario decodificada al objeto de solicitud
      // req.user = decoded.user;
      // Continuar con el siguiente middleware o ruta
      //next();
      console.log(dataReturn);
    });
  }
  return dataReturn;
}

module.exports = { generateToken, verifyToken };
