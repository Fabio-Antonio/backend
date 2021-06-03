const { Router } = require('express');
//import * as check from 'express-validator';
const router = Router();
const {setCaracteristica} =  require('../controllers/caracteristicas');

//const { validarJWT } = require('../middlewares/validar-jwt');

router.post('/',setCaracteristica);


module.exports = router;