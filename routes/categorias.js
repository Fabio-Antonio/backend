const { Router } = require('express');
//import * as check from 'express-validator';
const router = Router();
const {getCategoria,setCategoria,deleteCategoria} =require('../controllers/categorias');
const { validarJWT } = require('../middlewares/validar-jwt');


router.get('/',getCategoria);
router.post('/',validarJWT,setCategoria);
router.delete('/:uid',validarJWT,deleteCategoria);

module.exports = router;