const {dataReturn} = require('../helpers/constants');
const genericFunction  = require ('../helpers/genericFunctions');

const validateUserData = async (req, res, next) => {
  const user = { userName: req.body.userName, password: req.body.password };
  console.log(user);
  if(!genericFunction.isValidValue(user.userName)){
    dataReturn.type = "error"
    dataReturn.message = "valor para usuario no definido o no válido."
    dataReturn.valid = false;
    dataReturn.data = [];
    return res.status(401).json(dataReturn);   
  }
  if(!genericFunction.isValidValue(user.password)){
    dataReturn.type = "error"
    dataReturn.message = "Valor para constraseña no definido o no válido."
    dataReturn.valid = false;
    dataReturn.data = [];
    return res.status(401).json(dataReturn);   
  }  
   next();
}
  module.exports = { 
    validateUserData
};