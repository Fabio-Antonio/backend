const { Router } = require('express');
//import * as check from 'express-validator';
const router = Router();
const {getProductosSub} =  require('../controllers/buscar');

//const { validarJWT } = require('../middlewares/validar-jwt');

router.get('/:uid',getProductosSub);


module.exports = router;