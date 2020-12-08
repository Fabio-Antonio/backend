const { response } = require("express");
const {v4: uuidv4}= require('uuid');
const {actualizarImagen} = require("../helpers/actualizar-imagen");
const path = require('path');
const fileupload = (req,res = response)=>{
const tipo = req.params.tipo;
const id = req.params.id;
const tiposValidos = ['hospitales','usuarios','medicos'];
if(!tiposValidos.includes(tipo)){
    return res.status(400).json({
        ok:false,
        msg:'el tipo es incorrecto'
    })
}
if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ok:false,
        msg:'No files were uploaded.'
    });
  }

  const file = req.files.imagen;
  const nombreCortado = file.name.split('.');
  const extensionArchivo = nombreCortado [nombreCortado.length - 1];

  const extensionesValida = ['png','jpg','jpeg','gif'];

  if(!extensionesValida.includes(extensionArchivo)){
    return res.status(400).json({ok:false,
        msg:'Extensión no válida'
    }); 

  }
const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;

const path = `./uploads/${tipo}/${nombreArchivo}`;

file.mv(path,(err) => {
    if (err){
      return res.status(500).json({
        ok:false,
        msg:'error al subir la imagen'
      });
    }

actualizarImagen(tipo,id,path,nombreArchivo);
    res.json({
        ok:true,
        msg:'archivo subido',
        nombreArchivo
    })
  });


}

const retornaImagen = (req,res) =>{
const tipo = req.params.tipo;
const foto = req.params.foto;
const pathImg = path.join(__dirname,`../uploads/${tipo}/${foto}`);
res.sendFile(pathImg);
}
module.exports = {
    fileupload,
    retornaImagen
}