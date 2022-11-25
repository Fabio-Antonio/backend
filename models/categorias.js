const {Schema,model} = require('mongoose');

const CategoriasSchema = Schema({
categoria: {
type:String,
required :true
},

descripcion:{
    type:String,
     required:true
},

});
CategoriasSchema.method('toJSON',function(){
    const {_v,_id,...object}=this.toObject();
    object.uid= _id;
    return object;
})
module.exports = model('Categorias',CategoriasSchema);