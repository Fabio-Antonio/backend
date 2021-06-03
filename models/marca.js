const {Schema,model} = require('mongoose');
const marcaSchema = Schema({
marca: {
type:String,
required :true
}
},{collection:'marca'});
marcaSchema.method('toJSON',function(){
    const {_v,_id,...object}=this.toObject();
    object.uid= _id;
    return object;
})
module.exports = model('marca',marcaSchema);