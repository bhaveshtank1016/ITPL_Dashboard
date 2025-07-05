const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true,
        trim: true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true
    },
    position:{
        type:String,
        required : true
    },
    role:{
        type:String,
        required:true
    },
    complete:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        enum:["Active","Inactive"],
        required:true
    },
    date:{
        type:Date,
        required:true
    }
    
});
module.exports = mongoose.model("User",userSchema);

