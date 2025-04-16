const mongodb = require("mongoose");
const Schema = mongodb.Schema;

const citySchema = new Schema({

    name:{
        type:String,
        required:true,
        unique:true
    },
    stateId:{
        type:Schema.Types.ObjectId,
        ref:"State"
    }
},{
    timestamps:true
})
module.exports = mongodb.model("City",citySchema);