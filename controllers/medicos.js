const { response } = require('express');
const Medico = require('../models/medicos');
const getmedico = async (req,res=response) =>{
    const medicos =  await Medico.find()
    .populate('usuario','nombre') 
    .populate('hospital','nombre');

res.json({
    ok: true,
    medicos
})
}
const crearmedico = async (req,res=response) =>{


    const uid =req.uid;
    const medico = new Medico({
        usuario:uid,
        ...req.body
    });
   
    try {
        const HospitalDB = await medico.save();
        res.json({
            ok: true,
            hospital: HospitalDB
        })  
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok:"true",
            msg: "Hable con el administrador" 
        })
    }


    res.json({
        ok: true,
        msg: 'crearmedico'
    })
    }

    const actualizarmedico = (req,res=response) =>{

        res.json({
            ok: true,
            msg: 'actualizarmedico'
        })
        }

        const borrarmedico = (req,res=response) =>{

            res.json({
                ok: true,
                msg: 'borrarmedico'
            })
            }


module.exports= {
    getmedico,
    crearmedico,
    actualizarmedico,
    borrarmedico
}