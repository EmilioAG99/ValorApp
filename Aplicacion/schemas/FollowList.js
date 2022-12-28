const {Schema,model}=require('mongoose');
const followSchema= new Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    followedTeams:{
        type: [String],
        default: undefined
    }
});

module.exports=model('followList',followSchema);