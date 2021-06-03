const { Router } = require('express');
//import * as check from 'express-validator';
const router = Router();
const {setColor_c} =  require('../controllers/color_c');

//const { validarJWT } = require('../middlewares/validar-jwt');

router.post('/',setColor_c);


module.exports = router;