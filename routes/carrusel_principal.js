const { Router } = require('express');
//import * as check from 'express-validator';
const router = Router();
const {getProductos,getProductosMarca} =  require('../controllers/carrusel_principal');

//const { validarJWT } = require('../middlewares/validar-jwt');


router.get('/',getProductos);
router.get('/:uid',getProductosMarca);


module.exports = router;