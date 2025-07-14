const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    first_name:{
        type: String,
        required:true,
        trim: true
    },
    last_name:{
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
    password:{
        type:String,
        minlength:8
    },
    dob:{
        type:Date,
        required:true,

    },
    gender:{
        type:String,
        enum:["Male","Female"],
        required: true,
    },

    phone:{
        type: Number,
        required: true
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
    department:{
        type:String,
        enum:["Support Team", "Engineering", "CRM Team", "Project Management"]
    }
    
});
module.exports = mongoose.model("User",userSchema);

