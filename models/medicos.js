const {Schema,model} = require('mongoose');
const medicoSchema = Schema({
nombre: {
type:String,
required :true
},
img:{
    type:String,

},
usuario : {
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
},
hospital : {
    type: Schema.Types.ObjectId,
    ref: 'Hospital',
    required : true
}
},{collection:'Medico'});
medicoSchema.method('toJSON',function(){
    const {_v,...object}=this.toObject();
    return object;
})
module.exports = model('Medico',medicoSchema);