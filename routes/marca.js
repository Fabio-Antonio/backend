const { Router } = require('express');
//import * as check from 'express-validator';
const router = Router();
const {getMarca,setMarca,getMarcas} =  require('../controllers/marca');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarUrl } = require('../middlewares/validar-busqueda');

router.get('/:uid',
validarUrl,
getMarca);
router.get('/',getMarcas)
router.post('/',validarJWT,setMarca);


module.exports = router;