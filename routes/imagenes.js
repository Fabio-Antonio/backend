const { Router } = require('express');
//import * as check from 'express-validator';
const router = Router();
const {setImagen} =  require('../controllers/imagenes');

//const { validarJWT } = require('../middlewares/validar-jwt');

router.post('/',setImagen);


module.exports = router;