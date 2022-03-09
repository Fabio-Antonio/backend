const {Schema,model} = require('mongoose');
const verificacionSchema = Schema({

token: {
type:String,
required :true
},
correo: {
    type:String,
    required :true
    },

numero_verificacion:{
    type:Number,
    required :true,
},
status:{
    type:Boolean,
    default : false
}
,
});
verificacionSchema.method('toJSON',function(){
    const {_v,_id,...object}=this.toObject();
    object.uid= _id;
    return object;
})
module.exports = model('verificacion',verificacionSchema);