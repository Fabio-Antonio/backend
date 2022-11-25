const {Schema,model} = require('mongoose');
const imagenesSchema = Schema({

producto : {
    type: Schema.Types.ObjectId,
    ref: 'productos',
    required: true
},
url_imagen : {
    type: String,    
    required : true
}
},{collection:'imagenes'});
imagenesSchema.method('toJSON',function(){
    const {_v,...object}=this.toObject();
    return object;
})
module.exports = model('imagenes',imagenesSchema);