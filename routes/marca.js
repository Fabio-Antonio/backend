const { Router } = require('express');
//import * as check from 'express-validator';
const router = Router();
const {getMarca,setMarca} =  require('../controllers/marca');

//const { validarJWT } = require('../middlewares/validar-jwt');

router.get('/:uid',getMarca);
router.post('/',setMarca);


module.exports = router;