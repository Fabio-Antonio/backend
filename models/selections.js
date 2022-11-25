const {Schema,model} = require('mongoose');
const selectionsSchema = Schema({
    sizes:{
        type:Array,
        default:[]
    },
    colors:[{
        type:Array,
        default:[]
    }]
},{collection:'selections'});
selectionsSchema.method('toJSON',function(){
    const {_v,_id,...object}=this.toObject();
    object.uid= _id;
    return object;
})
module.exports = model('selections',selectionsSchema);