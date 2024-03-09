const authMiddleware = require('../middleware/authMiddleware');
const { connectToDatabase } = require('../../config/db');
const { dataReturn } = require('../helpers/constants');

const generateTokenLogin = (req = request, res = response) => {
  // Lógica de autenticación y generación del token
  const user = { username: req.body.userName, password: req.body.password };
  connectToDatabase().then((dataReturnDB) => {
    switch (dataReturnDB.valid) {
      case true:
        const db = dataReturnDB.data.dataBase;
        const client = dataReturnDB.data.dataClient;
        return db.collection('Usuarios').find({ nameUser: user.username, password: user.password }).toArray();
      case false:
        res.json(dataReturnDB);
        break;
    }
  }).then((dataReturnResult) => {

    console.log(dataReturnResult);

    if (dataReturnResult.length > 0) {
      dataReturn.valid = true;
      dataReturn.type = "success";
      dataReturn.message = "consulta correcta";
      dataReturn.data = dataReturnResult;
      const token = authMiddleware.generateToken(user);
      dataReturn.data = { token: token };
    } else {
      dataReturn.valid = false;
      dataReturn.type = "error";
      dataReturn.message = "Usuario o contraseña no reconocido";
      dataReturn.data = [];
    }
    res.json(dataReturn);
  }).catch((err) => {
    dataReturn.valid = false;
    dataReturn.type = "error";
    dataReturn.message = "error interno del servidor " + err;
    dataReturn.data = err;
    res.json(dataReturn);
  });
}

module.exports = {
  generateTokenLogin
};