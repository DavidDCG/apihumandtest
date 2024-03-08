// src/routes/apiRoutes.js
const express = require('express');
const router = express.Router();
const loginMiddleware  = require ('../middleware/loginMiddleware');
const loginController = require('../controllers/loginController');
const authMiddleware = require('../middleware/authMiddleware');
// Ruta de autenticación
router.post('/acceso', loginMiddleware.validateUserData, (req, res) => { 
  loginController.generateTokenLogin(req, res);
});
router.get('/verifyToken', (req, res) => {
 res.json(authMiddleware.verifyToken(req, res));
});
module.exports = router;