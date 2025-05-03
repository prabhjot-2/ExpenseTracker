const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    icon:{type:String},
    category:{type:String,required:true},//example : Food, Transport . etc'
    amount:{type:Number,required:true},
    date:{type:Date,default:Date.now},//example : 2023-10-01
}, {timestamps:true});

module.exports = mongoose.model("Expense",ExpenseSchema);
// Compare this snippet from backend/models/Income.js:  