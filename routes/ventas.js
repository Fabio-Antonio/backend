const { Router } = require('express');
//import * as check from 'express-validator';
const router = Router();
const {crearVenta} =  require('../controllers/ventas');

//const { validarJWT } = require('../middlewares/validar-jwt');

router.post('/',crearVenta);



module.exports = router;