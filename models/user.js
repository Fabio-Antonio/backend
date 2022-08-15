const {Schema,model} = require('mongoose');
const userSchema = Schema({

name: {
type:String,
required :true
},
email: {
    type:String,
    required :true
    },

photoURL:{
    type:String,
    required :true,
},
phoneNumber:{
    type:String,
    default : true
},
rol:{
    type:String,
    default : true
}
,
});
userSchema.method('toJSON',function(){
    const {_v,_id,...object}=this.toObject();
    object.uid= _id;
    return object;
})
module.exports = model('user',userSchema);