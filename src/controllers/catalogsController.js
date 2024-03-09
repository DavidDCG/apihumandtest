const authMiddleware = require('../middleware/authMiddleware');
const { connectToDatabase } = require('../../config/db');
const { dataReturn } = require('../helpers/constants');

const getModules = (req = request, res = response) => {
    let dataTokenValid = authMiddleware.verifyToken(req, res);
    
    console.log(dataTokenValid);
    if (dataTokenValid.valid) {
        connectToDatabase().then((dataReturnDB) => {
            switch (dataReturnDB.valid) {
                case true:
                    const db = dataReturnDB.data.dataBase;
                    const client = dataReturnDB.data.dataClient;
                    return db.collection('Modulos').find({}).toArray();
                case false:
                    res.json(dataReturnDB);
                    break;
            }
        }).then((dataReturnResult) => {
            if (dataReturnResult.length > 0) {
                dataReturn.valid = true;
                dataReturn.type = "success";
                dataReturn.message = "consulta correcta";
                dataReturn.data = dataReturnResult;            
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
    } else {
        res.json(dataTokenValid);
    }
}

module.exports = {
    getModules
};