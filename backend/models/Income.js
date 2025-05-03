const mongoose = require('mongoose');

const IncomeSchema = new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    icon:{type:String},
    source:{type:String,required:true},//example : Salary, freelance . etc'
    amount:{type:Number,required:true},
    date:{type:Date,default:Date.now},//example : 2023-10-01
},{timestamps:true});

module.exports = mongoose.model("Income",IncomeSchema);
