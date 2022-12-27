export const  verifyTokenMiddleware = (req,res, next) =>{
    const token = req.header('x-token');
    
    if(!token){
        return res.status(422).json({
            ok:false,
            msg: 'no hay token en la petición'
        })
    }
    
    try {
        // const {uid} = jwt.verify(token,process.env.JWT_SECRET);
        // const usuarioDB = Promise.all([User.findById(uid)]);
       /* if(!usuarioDB){
            return res.status(401).json({
                ok:false,
                msg: 'token incorrecto'
            })
        }*/
    
        next();
    } catch (error) {
        return res.status(422).json({
            ok:false,
            msg: 'token incorrecto'
        })
    }
    
    
    }