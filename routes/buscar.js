const { Router } = require('express');
//import * as check from 'express-validator';
const router = Router();
const {getProductosSub} =  require('../controllers/buscar');

const { validarUrl } = require('../middlewares/validar-busqueda');

router.get('/:uid',
validarUrl,
getProductosSub);


module.exports = router;