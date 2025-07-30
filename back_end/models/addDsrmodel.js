const mongoose = require("mongoose");

const dsrSchema = new mongoose.Schema({
 email: {
  type: String,
  required: true,
  },
  date:  {
  type : Date,
  required: true,
  },
attachment:{
  type: String,
  required : true,
  },
  projectName:
  { 
    type: String,
    required: true,
  },
  
  projectDescription:
  {
  type :  String,
  required: true,
},
  todoTasks: 
  {
  type: String,
  required: true,
  }
}, { timestamps: true });

module.exports = mongoose.model("AddDsr", dsrSchema);

