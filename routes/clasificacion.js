const { Router } = require('express');
//import * as check from 'express-validator';
const router = Router();
const {getClasificacion,setClasificacion,getClasificacions} =  require('../controllers/clasificacion');
const { validarJWT } = require('../middlewares/validar-jwt');


router.get('/:uid',getClasificacion);
router.get('/',getClasificacions);
router.post('/',validarJWT,setClasificacion);
module.exports = router;