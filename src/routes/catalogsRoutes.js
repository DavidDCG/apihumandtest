const express = require('express');
const router = express.Router();
const catalogsController = require('../controllers/catalogsController');
router.get('/modules', (req, res) => {
    // Lógica para obtener datos protegidos
   catalogsController.getModules(req, res)
   //loginController.TokenValid(req, res);
  });
  module.exports = router;