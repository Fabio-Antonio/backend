const {Router} = require('express');
const router = Router();
const {fileupload,retornaImagen} = require('../controllers/upload')
const { validarJWT } = require('../middlewares/validar-jwt');
const expressfileupload = require('express-fileupload')
router.use(expressfileupload());
router.put('/:tipo/:id',validarJWT,fileupload);
router.get('/:tipo/:foto',validarJWT,retornaImagen);


module.exports = router;