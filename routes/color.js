const { Router } = require('express');
//import * as check from 'express-validator';
const router = Router();
const {setColor,getColor} =  require('../controllers/color');

//const { validarJWT } = require('../middlewares/validar-jwt');

router.post('/',setColor);
router.get('/',getColor)


module.exports = router;