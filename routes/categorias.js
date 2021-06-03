const { Router } = require('express');
//import * as check from 'express-validator';
const router = Router();
const {getCategoria,setCategoria} =require('../controllers/categorias');
//const { validarJWT } = require('../middlewares/validar-jwt');


router.get('/',getCategoria);
router.post('/',setCategoria);

module.exports = router;