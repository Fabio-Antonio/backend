const { response } = require('express');
const Hospital = require ('../models/hospital');




const getHospitales = async (req,res=response) =>{

    const hospitales =  await Hospital.find().populate('usuario','nombre'); 

res.json({
    ok: true,
    hospitales
   
})
}



const crearHospitales = async (req,res=response) =>{
    const uid =req.uid;
    const hospital = new Hospital({
        usuario:uid,
        ...req.body
    });
   
    try {
        const HospitalDB = await hospital.save();
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
    
    }

    const actualizarHospitales = async(req,res=response) =>{
        const id= req.params.id;
        const uid = req.uid;
        try {
            const hospital = await Hospital.findById(id);
            if(!hospital){
                return res.status(404).json({
                    ok:false,
                    msg: 'Hospital no encontrado',
            
                })
            }
            const cambioHospital = {
                ...req.body,
                usuario: uid
            }

            const hospitalActualizado = await Hospital.findByIdAndUpdate(id,cambioHospital,{new: true});
            res.json({
                ok: true,
                msg: 'actualizarHospitales',
                hospitalActualizado
            })     
        } catch (error) {
            res.status(500).json({
                ok:false,
                msg: "hable con el administrador"
            })
        }

       
        }

        const borrarHospitales = async (req,res=response) =>{

            const id= req.params.id;
        
        try {
            const hospital = await Hospital.findById(id);
            if(!hospital){
                return res.status(404).json({
                    ok:false,
                    msg: 'Hospital no encontrado',
            
                })
            }
            
          await Hospital.findOneAndDelete(id);

            
            res.json({
                ok: true,
                msg: 'Hospital eliminado',
                
            })     
        } catch (error) {
            res.status(500).json({
                ok:false,
                msg: "hable con el administrador"
            })
        }

            }


module.exports= {
    getHospitales,
    crearHospitales,
    actualizarHospitales,
    borrarHospitales
}